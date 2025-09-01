import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mammoth from 'mammoth/mammoth.browser';

const App = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPrompt, setExpandedPrompt] = useState(null);
  const [stageFilter, setStageFilter] = useState('All');

  // Prefilled fallback content - used exactly as specified
  const fallbackContent = {
    part1: {
      narrative: "Bottleneck Diagnosis Using Prompted AI Dialogue",
      prompts: [
        {
          category: "Mindset",
          subcategory: "Founder's Mental Model",
          issue: "reluctance to delegate",
          prompt: "Diagnose this founder's reluctance to delegate. Determine if it is fear of loss of control, distrust of team capabilities, or unproven assumption that 'only I can do it right.' Provide customized decision-rights structures to test and not generic advice.",
          cialdini: "Consistency",
          negative: "Avoid assumptions not grounded in transcript; do not invent personal backstory.",
          layer: "Personal"
        },
        {
          category: "Systemic",
          subcategory: "Talent/Process Capability",
          issue: "rapid hiring w/out systems",
          prompt: "Determine if the breakdowns in delivery were due to weak hire fit, fuzzy roles, or non-scalable processes. Prescribe lightweight rituals (e.g., weekly OKR reviews, role charters) to restore quality without heavy bureaucracy.",
          cialdini: "Authority",
          negative: "Do not recommend tools beyond revenue delivery or talent alignment.",
          layer: "Systemic"
        },
        {
          category: "Market",
          subcategory: "Customer Strategy/Positioning",
          issue: "unclear pricing segment",
          prompt: "Evaluate the pricing issue: Are we misaligned on segment, underselling value, or missing data? Suggest 2–3 pricing experiments (segment surveys, tiered proposals) to prove willingness-to-pay.",
          cialdini: "Social Proof",
          negative: "Do not suggest blanket price cuts or unsubstantiated competitor claims.",
          layer: "Strategic"
        }
      ]
    },
    part2: {
      title: "Growth Readiness Scorecard",
      rows: [
        {
          category: "Leadership & Decision Velocity",
          bottleneck: "Founder bottlenecking all decisions; managers lack autonomy",
          experiment: "Decision Rights Matrix + Weekly Delegation Review — founder approves only high-impact calls, managers handle execution",
          aiPrompt: "Model a delegation scorecard where 80% of hiring/pricing/vendor approvals shift to managers. Simulate outcomes on delivery speed and founder time freed.",
          stage: "Talent Mismatch"
        },
        {
          category: "Delivery Engine & Process Discipline",
          bottleneck: "Rapid hiring without systems → quality slipped; CRM delayed",
          experiment: "Install lightweight CRM + weekly quality huddle — track lead follow-ups and delivery KPIs",
          aiPrompt: "Prototype a CRM workflow capturing leads, deadlines, and client feedback. Show how missed follow-ups drop by 50% in 3 months.",
          stage: "Delivery Engine Breakdown"
        },
        {
          category: "Market Fit & Pricing Clarity",
          bottleneck: "Pricing pressure from competitors; unclear value segment",
          experiment: "Customer Value Mapping Sprint — survey top clients, test 3 pricing tiers",
          aiPrompt: "Generate customer persona profiles ranking willingness-to-pay and key value drivers to validate a premium pricing tier.",
          stage: "Problem-Market Fit"
        }
      ]
    },
    part3: {
      title: "Strategic Summary",
      summary: "Prompting forced me to slow down and structure the founder's chaos into clear layers — personal, systemic, and strategic. By using AI to simulate decisions (delegation frameworks, CRM workflows, pricing experiments), I could see not just what's wrong but what would happen if we fixed it. The first essential principle is 'separate symptoms from root causes through structured inquiry.' Growth bottlenecks are rarely a singular incident — they tangle founder mindset, process gaps, and market clarity. A Growth Consultant must act as Coach (challenge fears), Analyst (bring clarity with data), and Operator (prototype real solutions). This layered approach transforms AI into a true co-pilot."
    }
  };

  // Document fetching and parsing logic
  const fetchAndParseDocument = async () => {
    setLoading(true);
    setError(null);

    try {
      // First attempt: Fetch DOCX file and parse with mammoth
      const docxUrl = 'https://raw.githubusercontent.com/<USER>/<REPO>/<BRANCH>/Growth_Diagnosis_Assignment.docx';
      
      try {
        const docxResponse = await fetch(docxUrl);
        if (docxResponse.ok) {
          const arrayBuffer = await docxResponse.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          const parsedContent = parseDocumentContent(result.value);
          if (parsedContent) {
            setContent(parsedContent);
            setLoading(false);
            return;
          }
        }
      } catch (docxError) {
        console.log('DOCX parsing failed, trying Markdown fallback...');
      }

      // Second attempt: Fetch Markdown version
      const mdUrl = 'https://raw.githubusercontent.com/<USER>/<REPO>/<BRANCH>/Growth_Diagnosis_Assignment.md';
      
      try {
        const mdResponse = await fetch(mdUrl);
        if (mdResponse.ok) {
          const mdText = await mdResponse.text();
          const parsedContent = parseMarkdownContent(mdText);
          if (parsedContent) {
            setContent(parsedContent);
            setLoading(false);
            return;
          }
        }
      } catch (mdError) {
        console.log('Markdown parsing failed, using fallback content...');
      }

      // Fallback: Use prefilled content
      setContent(fallbackContent);
      setLoading(false);

    } catch (err) {
      console.error('Document fetch error:', err);
      setError('Failed to load document. Using fallback content.');
      setContent(fallbackContent);
      setLoading(false);
    }
  };

  // Parse document content into structured format
  const parseDocumentContent = (text) => {
    try {
      // Basic parsing logic - in a real implementation, this would be more sophisticated
      // For now, return null to trigger fallback content usage
      return null;
    } catch (err) {
      console.error('Parse error:', err);
      return null;
    }
  };

  // Parse Markdown content into structured format
  const parseMarkdownContent = (text) => {
    try {
      // Basic parsing logic - in a real implementation, this would be more sophisticated
      // For now, return null to trigger fallback content usage
      return null;
    } catch (err) {
      console.error('Markdown parse error:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchAndParseDocument();
  }, []);

  const filteredRows = content?.part2?.rows?.filter(row => 
    stageFilter === 'All' || row.stage === stageFilter
  ) || [];

  const stages = ['All', 'Talent Mismatch', 'Delivery Engine Breakdown', 'Problem-Market Fit'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Growth Diagnosis Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Growth Diagnosis Dashboard</h1>
            <button
              onClick={fetchAndParseDocument}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
            >
              Reload from GitHub
            </button>
          </div>
          {error && (
            <div className="mt-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
              {error}
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['part1', 'part2', 'part3'].map((section, index) => (
              <a
                key={section}
                href={`#${section}`}
                className="py-4 px-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Part {index + 1}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Part 1: Diagnostic Prompts */}
        <motion.section
          id="part1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Part 1: Bottleneck Diagnosis Using Prompted AI Dialogue</h2>
            <p className="text-gray-600">Structured prompts to uncover growth bottlenecks across three critical layers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {content?.part1?.prompts?.map((prompt, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{prompt.category}</h3>
                    <p className="text-sm text-gray-500">{prompt.subcategory}</p>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                    {prompt.layer}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Issue:</span> {prompt.issue}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Cialdini Principle:</span> {prompt.cialdini}
                  </p>
                </div>

                <button
                  onClick={() => setExpandedPrompt(expandedPrompt === index ? null : index)}
                  className="w-full text-left text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  {expandedPrompt === index ? 'Hide Prompt' : 'Show AI Prompt'}
                </button>

                <AnimatePresence>
                  {expandedPrompt === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-gray-50 rounded-lg border"
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">AI Prompt:</h4>
                          <p className="text-sm text-gray-700 italic">"{prompt.prompt}"</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Negative Prompt:</h4>
                          <p className="text-sm text-red-600">"{prompt.negative}"</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Part 2: Growth Readiness Scorecard */}
        <motion.section
          id="part2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Part 2: Growth Readiness Scorecard</h2>
            <p className="text-gray-600">Mini assessment of key growth bottlenecks and experimental solutions</p>
          </div>

          {/* Stage Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  stageFilter === stage
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bottleneck</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiment/Ritual</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Prompt</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth OS Stage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRows.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{row.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-xs">{row.bottleneck}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-xs">{row.experiment}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-xs italic">"{row.aiPrompt}"</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          row.stage === 'Talent Mismatch' ? 'bg-red-100 text-red-800' :
                          row.stage === 'Delivery Engine Breakdown' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {row.stage}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Part 3: Strategic Summary */}
        <motion.section
          id="part3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Part 3: Strategic Summary</h2>
            <p className="text-gray-600">Key insights and principles from the growth diagnosis process</p>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white"
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">Strategic Insights</h3>
              <p className="text-lg leading-relaxed italic text-center">
                {content?.part3?.summary}
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-gray-500 text-sm">
            Growth Diagnosis Dashboard • Powered by AI-driven analysis
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;