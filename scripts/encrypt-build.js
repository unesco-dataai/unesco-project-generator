// Password-protects the production build for GitHub Pages.
//
// 1. Inlines the CRA JS/CSS bundles into build/index.html and deletes them,
//    so no application code is served unencrypted.
// 2. Encrypts build/index.html in place with StatiCrypt (AES, decrypted in
//    the browser once the password is entered).
//
// Password comes from STATICRYPT_PASSWORD (environment or .env file).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const MIN_PASSWORD_LENGTH = 14;

const root = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');
const staticDir = path.join(buildDir, 'static');
const indexPath = path.join(buildDir, 'index.html');

const fail = (message) => {
  console.error(`encrypt-build: ${message}`);
  process.exit(1);
};

require('dotenv').config({ path: path.join(root, '.env'), quiet: true });
const password = process.env.STATICRYPT_PASSWORD;
if (!password) {
  fail('STATICRYPT_PASSWORD is not set (environment or .env). Refusing to deploy an unprotected build.');
}
if (password.length < MIN_PASSWORD_LENGTH) {
  fail(`STATICRYPT_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters.`);
}

let html = fs.readFileSync(indexPath, 'utf8');
const publicPath = new URL(require('../package.json').homepage).pathname.replace(/\/$/, '');
const localFile = (href) => path.join(buildDir, href.replace(publicPath, ''));
const inlined = [];

// Function replacements throughout: the bundles contain `$$`, `$&`... which a
// string replacement would interpret as special patterns and corrupt.

// Inline stylesheets
html = html.replace(/<link href="([^"]+\.css)" rel="stylesheet">/g, (_, href) => {
  inlined.push(localFile(href));
  return `<style>${fs.readFileSync(localFile(href), 'utf8')}</style>`;
});

// Inline scripts at the end of <body> (they were `defer`, so they need #root to exist)
const scripts = [];
html = html.replace(/<script defer="defer" src="([^"]+\.js)"><\/script>/g, (_, src) => {
  inlined.push(localFile(src));
  scripts.push(fs.readFileSync(localFile(src), 'utf8').replace(/<\/script/gi, () => '<\\/script'));
  return '';
});
if (scripts.length === 0) {
  fail('No bundle found in build/index.html — build output format changed?');
}
const scriptTags = scripts.map((js) => `<script>${js}</script>`).join('');
html = html.replace('</body>', () => `${scriptTags}</body>`);

// Anything left in static/ (lazy chunks, media, unmatched CSS) would be either
// broken once deleted or served unencrypted — stop rather than guess.
const leftovers = fs.readdirSync(staticDir, { recursive: true })
  .map((file) => path.join(staticDir, file))
  .filter((file) => fs.statSync(file).isFile() && !inlined.includes(file) && !file.endsWith('.LICENSE.txt'));
if (leftovers.length > 0) {
  fail(`Build assets were not inlined:\n  ${leftovers.map((f) => path.relative(root, f)).join('\n  ')}`);
}

fs.writeFileSync(indexPath, html);

// Remove the inlined bundles and the manifest that lists them. Third-party
// license notices (*.LICENSE.txt) stay published.
inlined.forEach((file) => fs.rmSync(file));
fs.rmSync(path.join(buildDir, 'asset-manifest.json'), { force: true });

execFileSync(
  path.join(root, 'node_modules', '.bin', 'staticrypt'),
  [
    indexPath,
    '-d', buildDir,
    '--short', // length is enforced above; avoids StatiCrypt's prompt, which exits 0 on "no"
    '--remember', '30',
    '--template-title', 'UNESCO Project Agreement',
    '--template-instructions', 'This tool is restricted. Contact data-ai@unesco.org for access.',
    '--template-button', 'Enter',
    '--template-color-primary', '#0077d4',
    '--template-color-secondary', '#f3f4f6',
  ],
  { stdio: 'inherit', cwd: root, env: process.env }
);

if (!fs.readFileSync(indexPath, 'utf8').includes('staticrypt-decrypt-button')) {
  fs.rmSync(indexPath);
  fail('build/index.html is not encrypted — deleted it so the unprotected build cannot be deployed.');
}

console.log('Build encrypted: build/index.html is password-protected.');
