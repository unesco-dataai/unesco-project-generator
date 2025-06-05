# UNESCO Project Proposal Generator

A simple, user-friendly tool for creating project agreements between UNESCO sectors and Central Services (Data & AI Services team).

## 🎯 Purpose

This tool streamlines the process of creating project proposals for innovative AI and data projects that require funding beyond UNESCO's regular IT budget. It helps sectors:

- Generate professional project agreements quickly
- Understand budget requirements clearly
- Follow the proper approval workflow
- Ensure all necessary information is captured

## 🚀 Live Demo

**Access the tool:** [https://unesco-dataai.github.io/unesco-project-generator](https://unesco-dataai.github.io/unesco-project-generator)

## 📋 Features

### Interactive Form
- **Project Details**: Name, sector, service type, timeline
- **Contact Information**: Project lead details
- **Budget Calculator**: Automatic cost calculations
- **Real-time Validation**: Ensures all required fields are filled

### Generated Proposal
- **Professional Layout**: Clean, UNESCO-branded design
- **Budget Breakdown**: Clear cost separation (building vs. running vs. regular support)
- **Signature Sections**: Ready for both parties to sign
- **Budget Code Section**: Prominent area for post-approval funding details
- **Timeline Alerts**: Clear deadlines and expectations

### Key Benefits
- **KISS Principle**: Simple, straightforward process
- **Budget Transparency**: Clear distinction between sector funding and Central Services support
- **Process Clarity**: Step-by-step workflow with timeline requirements
- **PDF Ready**: Professional output ready for printing/saving

## 🛠️ Technology Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **Build Tool**: Create React App

## 🏗️ Local Development

### Prerequisites
- Node.js (>= 16.0.0)
- npm (>= 8.0.0)

### Setup
```bash
# Clone the repository
git clone https://github.com/unesco-dataai/unesco-project-generator.git
cd unesco-project-generator

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run tests
npm run deploy     # Deploy to GitHub Pages
```

## 📦 Deployment

### Automatic Deployment
The project automatically deploys to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment
```bash
npm run deploy
```

## 📖 How to Use

### For DBS Team (Creating Proposals)
1. **Fill the Form**: Enter project details, contact info, and budget estimates
2. **Review Calculations**: Check the automatic budget breakdown
3. **Generate Proposal**: Click to create the professional document
4. **Share with Sector**: Send the PDF/printed version for signatures

### For Sectors (Approving Projects)
1. **Review Proposal**: Check all project details and budget requirements
2. **Sign Agreement**: Both sector representative and DBS team sign
3. **Provide Budget Code**: Fill in the budget code section after internal approval
4. **Submit**: Return signed document with budget code to start the project

## 💰 Budget Structure

The tool helps clarify UNESCO's funding model:

- **Regular IT Support**: Covered by Central Services regular budget
  - Basic infrastructure
  - Standard maintenance
  - Daily operational support

- **Innovation Projects**: Require additional sector funding
  - Advanced AI/data solutions
  - Custom development
  - Specialized integrations

## ⚠️ Important Timeline

**Budget Code Requirement**: Sectors must provide budget codes at least **1 week before** desired project start date to meet delivery deadlines.

## 🤝 Contributing

### For UNESCO Team Members
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

### Code Style
- Use Prettier for formatting
- Follow React best practices
- Keep components simple and focused
- Comment complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**UNESCO Data & AI Services Team**
- Digital Business Solutions (DBS)
- Central Services

## 📞 Support

For questions or support:
- Create an issue in this repository
- Contact the Data & AI Services team
- Email: [data-ai@unesco.org](mailto:data-ai@unesco.org)

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Interactive form with validation
- Professional proposal generation
- Budget calculator
- GitHub Pages deployment
- Mobile-responsive design

---

**Built with ❤️ for UNESCO by the Data & AI Services Team**