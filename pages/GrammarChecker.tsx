import React, { useState } from 'react';
import { analyzeGrammar } from '../services/geminiService';
import { GrammarAnalysis } from '../types';
import Button from '../components/Button';
import { ArrowRight, Check, AlertTriangle } from 'lucide-react';

const GrammarChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<GrammarAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeGrammar(text);
      setAnalysis(result);
    } catch (e) {
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Grammar Lab</h2>
        <p className="text-gray-500 mt-2">Paste your text and get instant AI correction and feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste English text here..."
              className="w-full h-64 p-4 border border-gray-100 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
            />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">{text.length} characters</span>
              <Button onClick={handleAnalyze} isLoading={loading} disabled={!text.trim()}>
                Analyze Text
              </Button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
           {analysis ? (
             <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 h-full">
                <div className="flex items-center mb-4 text-green-700">
                   <Check className="w-5 h-5 mr-2" />
                   <h3 className="font-bold">Corrected Version</h3>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-gray-800 leading-relaxed border border-green-100">
                  {analysis.correctedText}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Analysis & Feedback</h4>
                  {analysis.errors.length === 0 ? (
                    <p className="text-gray-500 italic">Perfect! No errors found.</p>
                  ) : (
                    <ul className="space-y-3">
                      {analysis.errors.map((err, i) => (
                        <li key={i} className="text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                          <div className="flex items-center text-red-700 font-medium mb-1">
                             <AlertTriangle className="w-4 h-4 mr-2" />
                             <span>{err.rule}</span>
                          </div>
                          <div className="flex items-center space-x-2 ml-6 text-gray-600">
                             <span className="line-through decoration-red-400">{err.original}</span>
                             <ArrowRight className="w-3 h-3" />
                             <span className="text-green-600 font-medium">{err.correction}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                   <p className="text-sm text-gray-600 italic">
                     <span className="font-semibold text-blue-600 not-italic">AI Tutor:</span> "{analysis.feedback}"
                   </p>
                </div>
             </div>
           ) : (
             <div className="h-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <p>Analysis results will appear here</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default GrammarChecker;