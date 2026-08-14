# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based web application that generates professional project agreements between UNESCO sectors and the Data & AI Services (DBS) team. The tool helps sectors create formal proposals for innovative AI and data projects that require funding beyond UNESCO's regular IT budget.

**Live URL**: https://unesco-dataai.github.io/unesco-project-generator

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests in watch mode
npm test

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### Single-Component Application

This is a deliberately simple, single-page application with all logic contained in [src/App.js](src/App.js). The application has **no routing** and operates as a two-state form:

1. **Form State** (`showForm: true`): Interactive form for collecting project details
2. **Generated Proposal State** (`showForm: false`): Read-only formatted document ready for print/PDF

The entire application state is managed via a single `formData` object using React's `useState` hook.

### Styling Architecture

- **Tailwind CSS**: Loaded via CDN in [public/index.html](public/index.html:28)
- **Inline Styling**: All Tailwind classes are applied directly in JSX (no separate CSS files for components)
- **Print Styles**: Custom print CSS in [public/index.html](public/index.html:29-43) with `.no-print` class to hide UI elements when printing/saving as PDF

### Key Features

**Dynamic Document Title**: The app uses `useEffect` to update `document.title` based on project name, which determines the default filename when users save the proposal as PDF (format: "ProjectName - UNESCO Data AI Project Agreement").

**Budget Calculator**: Costs are computed **per section**, inline in the proposal tables — there is no global total. Building: `buildingCosts - buildRegularSupport`. Running: `runningCosts - runRegularSupport`. Both regular-support fields default to `'1500'`. There is deliberately no aggregate `totalCost` — an old one existed and referenced a `formData.regularSupport` field that no longer exists; don't reintroduce it.

**Form Validation**: The "Generate Project Proposal" button is disabled until all required fields are filled ([src/App.js](src/App.js:285)). Note `transactionId` must be **exactly 3 characters**.

## Important Business Logic

### Budget Structure

The application distinguishes between three types of costs:
1. **Building Costs**: One-time development costs
2. **Running Costs**: Annual operational costs
3. **Regular Support**: Standard DBS support (default: $1,500), entered **separately** for building and running - covered by DBS regular budget

Sectors fund each line net of its own regular support.

### Timeline Requirements

The generated proposal includes a prominent reminder that sectors must provide budget codes **at least 1 week before** the desired project start date to meet delivery deadlines.

### PDF Generation

Users generate PDFs using the browser's native print dialog (Ctrl+P / Cmd+P). The `.no-print` class hides the "Edit Information" button and print instructions when printing.

### Sector Options

Hardcoded as `<option>` elements in [src/App.js](src/App.js:114-122) (9 sectors, default `Education`). Edit there.

## Deployment

The application is deployed to GitHub Pages automatically. The `homepage` field in [package.json](package.json:5) is set to `https://unesco-dataai.github.io/unesco-project-generator`.

**Manual deployment**: `npm run deploy` (runs predeploy build script then deploys to gh-pages branch)

## Testing

React Testing Library + Jest, config in [src/setupTests.js](src/setupTests.js).

[src/App.test.js](src/App.test.js) covers form render, the Generate-button enable/disable rule, the 3-character `transactionId` rule, and the per-section regular-support subtraction. Labels are **not** associated with inputs (no `htmlFor`/`id`), so query by placeholder text, not `getByLabelText`.

Run once (non-watch): `CI=true npm test`

## Contact Information

**Team**: UNESCO Data & AI Services Team (DBS)
**Email**: data-ai@unesco.org
