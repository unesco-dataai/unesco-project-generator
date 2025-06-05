import React, { useState, useEffect } from 'react';

const UNESCOProjectGenerator = () => {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    projectName: '',
    sector: 'Education',
    serviceType: '',
    targetCompletion: '',
    description: '',
    contactName: '',
    contactEmail: '',
    buildingCosts: '',
    runningCosts: '',
    regularSupport: '1500'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateProposal = () => {
    setShowForm(false);
  };

  const editForm = () => {
    setShowForm(true);
  };

  const totalCost = (parseFloat(formData.buildingCosts) || 0) + (parseFloat(formData.runningCosts) || 0);
  const sectorFunding = totalCost - (parseFloat(formData.regularSupport) || 0);

  // Function to sanitize project name for filename
  const sanitizeFileName = (name) => {
    return name
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim() // Remove leading/trailing spaces
      .substring(0, 50); // Limit length
  };

  // Update document title for PDF naming
  useEffect(() => {
    if (!showForm && formData.projectName) {
      const sanitizedName = sanitizeFileName(formData.projectName);
      document.title = `${sanitizedName} - UNESCO Data AI Project Agreement`;
    } else {
      document.title = 'UNESCO Project Proposal Generator';
    }
    
    // Cleanup: reset title when component unmounts
    return () => {
      document.title = 'UNESCO Project Proposal Generator';
    };
  }, [showForm, formData.projectName]);

  if (showForm) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 font-sans">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 -mx-8 -mt-8 mb-8 rounded-b-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">UNESCO - Project Proposal Generator</h1>
            <p className="text-blue-100">Create your project agreement in minutes</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <h2 className="font-semibold text-blue-800 mb-2">Quick Setup</h2>
            <p className="text-sm text-gray-700">Fill out the form below to generate your project proposal document.</p>
          </div>

          {/* Project Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Project Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Her Atlas AI Chat"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sector *</label>
                <select
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Education">Education</option>
                  <option value="Culture">Culture</option>
                  <option value="Science">Science</option>
                  <option value="Social & Human Sciences">Social & Human Sciences</option>
                  <option value="Communication and Information">Communication and Information</option>
                  <option value="Secretariat of the Governing Bodies">Secretariat of the Governing Bodies</option>
                  <option value="Administration and Management">Administration and Management</option>
                  <option value="Priority Africa and External Relations">Priority Africa and External Relations</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                <input
                  type="text"
                  value={formData.serviceType}
                  onChange={(e) => handleInputChange('serviceType', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., AI Chat Solutions"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Completion *</label>
                <input
                  type="date"
                  value={formData.targetCompletion}
                  onChange={(e) => handleInputChange('targetCompletion', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Description *</label>
              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Example:&#10;&#10;The Global Skills Academy (GSA) dashboard will monitor youth empowerment initiatives.&#10;&#10;Key Features:&#10;- Data visualization and analytics&#10;- Integration with existing UNESCO systems&#10;- Real-time monitoring capabilities&#10;&#10;This project supports SDG 4 and UNESCO's commitment to youth empowerment."
              />
              <p className="text-xs text-gray-500 mt-1">Use Enter to create line breaks and organize your description into paragraphs</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Aguiar, Nina"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., n.aguiar@unesco.org"
                />
              </div>
            </div>
          </div>

          {/* Budget Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 Budget Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Building Costs (USD) *</label>
                <input
                  type="number"
                  value={formData.buildingCosts}
                  onChange={(e) => handleInputChange('buildingCosts', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="8500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Running Costs (USD) *</label>
                <input
                  type="number"
                  value={formData.runningCosts}
                  onChange={(e) => handleInputChange('runningCosts', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regular Support (USD)</label>
                <input
                  type="number"
                  value={formData.regularSupport}
                  onChange={(e) => handleInputChange('regularSupport', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1500"
                />
                <p className="text-xs text-gray-500 mt-1">Covered by Central Services</p>
              </div>
            </div>

            {totalCost > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>Building + Running costs:</span>
                    <span className="font-semibold">${totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Regular support (covered):</span>
                    <span className="text-green-600">-${(parseFloat(formData.regularSupport) || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Sector needs to fund:</span>
                    <span className="text-blue-700">${sectorFunding.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={generateProposal}
              disabled={!formData.projectName || !formData.serviceType || !formData.contactName || !formData.contactEmail || !formData.buildingCosts || !formData.runningCosts}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Generate Project Proposal
            </button>
            <p className="text-xs text-gray-500 mt-2">All required fields (*) must be filled</p>
          </div>
        </div>
      </div>
    );
  }

  // Generated Proposal View
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-sans text-gray-800">
      {/* Edit Button */}
      <div className="text-right mb-4 no-print">
        <button
          onClick={editForm}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm"
        >
          ← Edit Information
        </button>
      </div>

      {/* Header */}
      <div className="bg-blue-600 text-white p-6 -mx-8 -mt-8 mb-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">UNESCO - Data & AI Services</h1>
          <p className="text-blue-100">Simple Project Agreement</p>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
        <h2 className="text-lg font-semibold text-blue-800 mb-3">About This Agreement</h2>
        <p className="text-sm text-gray-700 mb-3">
          UNESCO's Central Services provides regular IT support through our standard budget to help sectors with their daily activities. 
          This includes basic infrastructure, maintenance, and standard tools.
        </p>
        <p className="text-sm text-gray-700">
          However, <strong>innovative projects and advanced developments</strong> require additional funding beyond our regular budget. 
          This simple agreement helps us work together to make your project happen!
        </p>
      </div>

      {/* Document Title */}
      <div className="text-center text-blue-700 text-xl font-bold mb-8">
        Project Agreement
      </div>

      {/* Section 1: Project Information */}
      <div className="mb-6">
        <div className="bg-blue-600 text-white p-3 font-semibold text-sm mb-4 rounded">
          📋 Project Details
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <div className="font-semibold text-blue-700 text-sm mb-1">Project Name:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-sm">{formData.projectName}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 text-sm mb-1">Sector:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-sm">{formData.sector}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <div className="font-semibold text-blue-700 text-sm mb-1">What we're building:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-sm">{formData.serviceType}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 text-sm mb-1">Target completion:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-sm">
              {formData.targetCompletion ? new Date(formData.targetCompletion).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : ''}
            </div>
          </div>
        </div>
        
        <div>
          <div className="font-semibold text-blue-700 text-sm mb-1">Project description:</div>
          <div className="border border-gray-300 p-3 min-h-16 text-sm rounded whitespace-pre-wrap">
            {formData.description}
          </div>
        </div>
      </div>

      {/* Section 2: Contact Information */}
      <div className="mb-6">
        <div className="bg-blue-600 text-white p-3 font-semibold text-sm mb-4 rounded">
          👤 Project Contact
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-blue-700 text-sm mb-1">Contact person:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-sm">{formData.contactName}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 text-sm mb-1">Email:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-sm">{formData.contactEmail}</div>
          </div>
        </div>
      </div>

      {/* Section 3: Budget */}
      <div className="mb-6">
        <div className="bg-blue-600 text-white p-3 font-semibold text-sm mb-4 rounded">
          💰 Project Investment
        </div>
        
        <table className="w-full border-collapse mb-4 rounded overflow-hidden shadow-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 p-3 bg-blue-100 font-semibold text-blue-700 text-left">What's included</th>
              <th className="border border-gray-300 p-3 bg-blue-100 font-semibold text-blue-700 text-right">Cost (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-3">Building the solution (one-time)</td>
              <td className="border border-gray-300 p-3 text-right font-semibold">${(parseFloat(formData.buildingCosts) || 0).toLocaleString()}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">Running costs per year</td>
              <td className="border border-gray-300 p-3 text-right font-semibold">${(parseFloat(formData.runningCosts) || 0).toLocaleString()}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-3 font-semibold">Total project cost</td>
              <td className="border border-gray-300 p-3 text-right font-semibold">${totalCost.toLocaleString()}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">Amount covered by Central Services</td>
              <td className="border border-gray-300 p-3 text-right font-semibold text-green-600">-${(parseFloat(formData.regularSupport) || 0).toLocaleString()}</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="border border-gray-300 p-3 font-bold">Your sector needs to fund</td>
              <td className="border border-gray-300 p-3 text-right font-bold text-lg">${sectorFunding.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        
        <div className="bg-green-50 border-l-4 border-green-500 p-4 text-sm rounded-r">
          <div className="font-semibold text-green-800">Good news!</div>
          <div className="text-green-700">After year 1, ongoing costs are just ${(parseFloat(formData.runningCosts) || 0).toLocaleString()}/year. Central Services continues to cover basic IT support.</div>
        </div>
      </div>

      {/* Section 4: Next Steps - Budget Code */}
      <div className="mb-6">
        <div className="bg-blue-600 text-white p-3 font-semibold text-sm mb-4 rounded">
          🚀 Important: Budget Code Required
        </div>
        
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="text-blue-800 font-bold text-lg mb-3">Ready to start? Here's what happens next:</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
              <div>
                <div className="font-semibold">Sign this agreement</div>
                <div className="text-gray-600">Both you and our team sign below</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
              <div>
                <div className="font-semibold">Provide your budget code</div>
                <div className="text-gray-600">Fill in the budget code section below</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
              <div>
                <div className="font-semibold">We start building!</div>
                <div className="text-gray-600">Project begins within 1 week of receiving your budget code</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-4 mt-4 rounded">
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">📝</span>
              <div className="text-blue-800 font-semibold">Timeline Information:</div>
            </div>
            <div className="text-blue-700 text-sm mt-1">
              For smooth project delivery, please provide the budget code at least <strong>1 week before</strong> your desired project start date to meet the {formData.targetCompletion ? new Date(formData.targetCompletion).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : ''} deadline.
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Agreement */}
      <div className="mb-6">
        <div className="bg-blue-600 text-white p-3 font-semibold text-sm mb-4 rounded">
          📝 Let's make it official
        </div>
        
        <div className="border-2 border-blue-400 p-5 mb-6 rounded-lg">
          <p className="mb-6 text-sm">By signing below, we agree to work together on this project with the budget and timeline outlined above.</p>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="border-b-2 border-gray-400 mb-2 h-1"></div>
              <div className="text-xs text-gray-600 mb-4">Sector Representative</div>
              <div className="text-xs space-y-2">
                <div><span className="font-semibold">Name:</span> ________________________________</div>
                <div><span className="font-semibold">Date:</span> ________________________________</div>
              </div>
            </div>
            
            <div>
              <div className="border-b-2 border-gray-400 mb-2 h-1"></div>
              <div className="text-xs text-gray-600 mb-4">Central Services Representative</div>
              <div className="text-xs space-y-2">
                <div><span className="font-semibold">Name:</span> ________________________________</div>
                <div><span className="font-semibold">Date:</span> ________________________________</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-2 border-green-500 p-5 rounded-lg bg-green-50">
          <h3 className="text-green-800 font-bold mb-4 flex items-center">
            <span className="mr-2">💳</span>
            Budget Code Information
          </h3>
          
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="font-semibold text-green-800 text-sm mb-1">Budget Code:</div>
              <div className="border-2 border-green-600 p-3 min-h-8 bg-white rounded"></div>
            </div>
            <div>
              <div className="font-semibold text-green-800 text-sm mb-1">Approval Date:</div>
              <div className="border-2 border-green-600 p-3 min-h-8 bg-white rounded"></div>
            </div>
          </div>
          
          <div className="bg-white border border-green-300 p-4 text-sm rounded">
            <div className="font-semibold text-green-800">Remember:</div>
            <div className="text-green-700">
              Once you provide the budget code, we'll start the project within one week. 
              Make sure your funding is approved and ready!
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 text-white text-center p-4 -mx-8 text-xs">
        UNESCO Data & AI Services - Central Services<br />
        Building the future of education, science, and culture through technology
      </div>

      {/* Print/Download Instruction */}
      <div className="text-center mt-8 p-4 bg-gray-100 rounded no-print">
        <p className="text-gray-600 text-sm">
          📄 <strong>Ready to finalize?</strong> Use Ctrl+P (Cmd+P on Mac) to print or save as PDF
        </p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UNESCOProjectGenerator />
    </div>
  );
}

export default App;