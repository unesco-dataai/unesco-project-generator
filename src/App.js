import React, { useState, useEffect } from 'react';

const UNESCOProjectGenerator = () => {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    projectName: '',
    sector: 'Education',
    serviceType: '',
    targetCompletion: '',
    description: '',
    riskAssumptions: '',
    transactionId: '',
    contactName: '',
    contactEmail: '',
    buildingCosts: '',
    buildRegularSupport: '1500',
    runningCosts: '',
    runRegularSupport: '1500'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderFormattedText = (text) => {
    if (!text) return '';

    // Replace markdown-style formatting with HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/__(.*?)__/g, '<u>$1</u>'); // Underline
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
              <p className="text-xs text-gray-500 mt-1">Use **text** for bold, *text* for italic, __text__ for underline</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Risks & Assumptions (Optional)</label>
              <textarea
                rows={4}
                value={formData.riskAssumptions}
                onChange={(e) => handleInputChange('riskAssumptions', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Example:&#10;&#10;Risks:&#10;• Technical dependencies on third-party APIs&#10;• Potential data migration challenges&#10;&#10;Assumptions:&#10;• Sector will provide timely feedback during development&#10;• Required data sources are accessible"
              />
              <p className="text-xs text-gray-500 mt-1">Use **text** for bold, *text* for italic, __text__ for underline. If left empty, this section won't appear in the final document</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID *</label>
              <input
                type="text"
                value={formData.transactionId}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers and limit to 3 digits
                  if (value === '' || (/^\d{1,3}$/.test(value))) {
                    handleInputChange('transactionId', value);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 001"
                maxLength="3"
              />
              <p className="text-xs text-gray-500 mt-1">Must be a 3-digit number (e.g., 001, 042, 123)</p>
              {formData.transactionId && formData.transactionId.length !== 3 && (
                <p className="text-xs text-red-600 mt-1">Transaction ID must be exactly 3 digits</p>
              )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Build Regular Support (USD)</label>
                <input
                  type="number"
                  value={formData.buildRegularSupport}
                  onChange={(e) => handleInputChange('buildRegularSupport', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1500"
                />
                <p className="text-xs text-gray-500 mt-1">Covered by DBS</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Run Regular Support (USD)</label>
                <input
                  type="number"
                  value={formData.runRegularSupport}
                  onChange={(e) => handleInputChange('runRegularSupport', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1500"
                />
                <p className="text-xs text-gray-500 mt-1">Covered by DBS</p>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={generateProposal}
              disabled={!formData.projectName || !formData.serviceType || !formData.transactionId || formData.transactionId.length !== 3 || !formData.contactName || !formData.contactEmail || !formData.buildingCosts || !formData.runningCosts}
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
          <p className="text-blue-100">Project Agreement</p>
        </div>
      </div>

      {/* Project ID */}
      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm font-mono">DBS/DAI/{new Date().getFullYear()}/{formData.transactionId}</p>
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg">
        <h2 className="text-base font-semibold text-blue-800 mb-2">About This Agreement</h2>
        <p className="text-xs text-gray-700 mb-2">
          UNESCO's DBS provides regular IT support through our standard budget to help sectors with their daily activities.
          This includes basic infrastructure, maintenance, and standard tools.
        </p>
        <p className="text-xs text-gray-700">
          However, <strong>innovative projects and advanced developments</strong> require additional funding beyond our regular budget.
          This simple agreement helps us work together to make your project happen!
        </p>
      </div>

      {/* Section 1: Project Information */}
      <div className="mb-4">
        <div className="bg-blue-600 text-white p-2 font-semibold text-xs mb-3 rounded">
          📋 Project Details
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="font-semibold text-blue-700 text-xs mb-1">Project Name:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-xs">{formData.projectName}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 text-xs mb-1">Sector:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-xs">{formData.sector}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="font-semibold text-blue-700 text-xs mb-1">What we're building:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-xs">{formData.serviceType}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 text-xs mb-1">Target completion:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-xs">
              {formData.targetCompletion ? new Date(formData.targetCompletion).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : ''}
            </div>
          </div>
        </div>
        
        <div>
          <div className="font-semibold text-blue-700 text-xs mb-1">Project description:</div>
          <div
            className="border border-gray-300 p-2 min-h-12 text-xs rounded whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: renderFormattedText(formData.description) }}
          />
        </div>
      </div>

      {/* Section 1b: Risks & Assumptions (conditional) */}
      {formData.riskAssumptions && (
        <div className="mb-4">
          <div className="text-white p-2 font-semibold text-xs mb-3 rounded" style={{ backgroundColor: '#F5AD18' }}>
            ⚠️ Risks & Assumptions
          </div>

          <div
            className="border border-gray-300 p-2 min-h-12 text-xs rounded whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: renderFormattedText(formData.riskAssumptions) }}
          />
        </div>
      )}

      {/* Section 2: Contact Information */}
      <div className="mb-4">
        <div className="bg-blue-600 text-white p-2 font-semibold text-xs mb-3 rounded">
          👤 Project Contact
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-blue-700 text-xs mb-1">Contact person:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-xs">{formData.contactName}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 text-xs mb-1">Email:</div>
            <div className="border-b border-gray-300 pb-1 min-h-5 text-xs">{formData.contactEmail}</div>
          </div>
        </div>
      </div>

      {/* Section 3: Budget */}
      <div className="mb-4">
        <div className="bg-blue-600 text-white p-2 font-semibold text-xs mb-3 rounded">
          💰 Project Investment
        </div>

        {/* Build Table */}
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Build Cost</h4>
          <table className="w-full border-collapse mb-3 rounded overflow-hidden shadow-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-blue-100 font-semibold text-blue-700 text-left text-xs"></th>
                <th className="border border-gray-300 p-2 bg-blue-100 font-semibold text-blue-700 text-right text-xs">Cost (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-xs">Building the solution</td>
                <td className="border border-gray-300 p-2 text-right font-semibold text-xs">${(parseFloat(formData.buildingCosts) || 0).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-xs">Amount covered by DBS</td>
                <td className="border border-gray-300 p-2 text-right font-semibold text-green-600 text-xs">-${(parseFloat(formData.buildRegularSupport) || 0).toLocaleString()}</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 p-2 font-bold text-xs">Total Building Cost</td>
                <td className="border border-gray-300 p-2 text-right font-bold text-sm">${((parseFloat(formData.buildingCosts) || 0) - (parseFloat(formData.buildRegularSupport) || 0)).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Run Table - Only show if running costs > 0 */}
        {(parseFloat(formData.runningCosts) || 0) > 0 && (
          <>
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">
                Annual Running Cost starting in January {formData.targetCompletion ? new Date(formData.targetCompletion).getFullYear() + 1 : new Date().getFullYear() + 1}
              </h4>
              <table className="w-full border-collapse mb-3 rounded overflow-hidden shadow-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 bg-blue-100 font-semibold text-blue-700 text-left text-xs"></th>
                    <th className="border border-gray-300 p-2 bg-blue-100 font-semibold text-blue-700 text-right text-xs">Cost (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-xs">Annual running costs</td>
                    <td className="border border-gray-300 p-2 text-right font-semibold text-xs">${(parseFloat(formData.runningCosts) || 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-xs">Amount covered by DBS</td>
                    <td className="border border-gray-300 p-2 text-right font-semibold text-green-600 text-xs">-${(parseFloat(formData.runRegularSupport) || 0).toLocaleString()}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-2 font-bold text-xs">Total Annual Running Cost</td>
                    <td className="border border-gray-300 p-2 text-right font-bold text-sm">${((parseFloat(formData.runningCosts) || 0) - (parseFloat(formData.runRegularSupport) || 0)).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border border-gray-300 p-3 text-xs rounded bg-gray-50">
              <p className="text-gray-700">As of the 1st of January of the year following project delivery, DBS will continue to provide basic IT support and maintenance, which will be funded through the running costs. Please note that running costs are subject to change due to licensing and hosting price fluctuations.</p>
            </div>
          </>
        )}
      </div>

      {/* Section 4: Next Steps */}
      <div className="mb-4">
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
          <h3 className="text-blue-800 font-bold text-sm mb-2">Ready to start? Here's what happens next:</h3>

          <div className="space-y-2 text-xs">
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
                <div className="font-semibold">Complete the reinvoicing</div>
                <div className="text-gray-600">Complete the reinvoicing and fill in the Reinvoicing Number</div>
              </div>
            </div>

            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
              <div>
                <div className="font-semibold">We start building!</div>
                <div className="text-gray-600">Project begins within 1 week of receiving your reinvoicing number</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-2 mt-3 rounded">
            <div className="flex items-center">
              <span className="text-blue-600 mr-2 text-xs">📝</span>
              <div className="text-blue-800 font-semibold text-xs">Timeline Information:</div>
            </div>
            <div className="text-blue-700 text-xs mt-1">
              For smooth project delivery, please complete the reinvoicing at least <strong>1 week before</strong> your desired project start date to meet the {formData.targetCompletion ? new Date(formData.targetCompletion).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : ''} deadline.
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Agreement */}
      <div className="mb-4">
        <div className="bg-blue-600 text-white p-2 font-semibold text-xs mb-3 rounded">
          📝 Approval
        </div>

        <div className="border-2 border-blue-400 p-3 mb-4 rounded-lg">
          <p className="mb-4 text-xs">By signing below, we agree to work together on this project with the budget and timeline outlined above.</p>
          
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
              <div className="text-xs text-gray-600 mb-4">DBS Representative</div>
              <div className="text-xs space-y-2">
                <div><span className="font-semibold">Name:</span> ________________________________</div>
                <div><span className="font-semibold">Date:</span> ________________________________</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-2 border-blue-500 p-3 rounded-lg bg-blue-50 mb-4">
          <h3 className="text-blue-800 font-bold mb-3 flex items-center text-xs">
            <span className="mr-2">💼</span>
            {(parseFloat(formData.buildingCosts) || 0) === 0 ? 'Reinvoicing' : 'Building Reinvoicing'}
          </h3>

          <div className="bg-white border-2 border-blue-600 p-3 rounded">
            <p className="text-xs text-gray-700 mb-2">
              The reinvoicing must be performed under the category <strong>Data and AI Services (EUR & USD)</strong> with fund reservation under GL account <strong className="text-blue-700">6034036</strong>.
            </p>
            <p className="text-xs text-gray-700 mb-3">
              Please enter <strong className="text-blue-700">DBS/DAI/{new Date().getFullYear()}/{formData.transactionId}</strong> as the Assignment.
            </p>

            <div className="border-t-2 border-blue-200 pt-3 mt-3">
              <p className="text-xs text-gray-700 mb-2 font-semibold">
                Once the reinvoicing is complete, please provide the Reinvoicing Number:
              </p>
              <div className="bg-gray-50 border-2 border-blue-600 p-2 min-h-10 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 text-white text-center p-4 -mx-8 text-xs">
        UNESCO Data & AI Services - DBS
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