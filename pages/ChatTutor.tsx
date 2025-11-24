import React, { useState, useRef, useEffect } from 'react';
import { chatWithAi, analyzeGrammar } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, SpellCheck, AlertTriangle, Check, ArrowRight, CornerDownLeft, Flag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatTutor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Hello! I am SAS, your AI English tutor. I can chat with you or check your grammar.', timestamp: Date.now() }
  ]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Thinking...');
  const [reportedMessages, setReportedMessages] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    // Small timeout to ensure DOM is rendered
    setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setLoadingText('Thinking...');

    // Format history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await chatWithAi(userMsg.text, history);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'model', text: "I'm having trouble connecting right now. Please try again.", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
      // Focus input again
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleGrammarCheck = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setLoadingText('Analyzing grammar...');

    try {
      const analysis = await analyzeGrammar(userMsg.text);
      const aiMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: "Here is the grammar analysis of your text:", 
        timestamp: Date.now(),
        grammarAnalysis: analysis
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
        setMessages(prev => [...prev, { id: 'err', role: 'model', text: "Sorry, I couldn't analyze the grammar right now.", timestamp: Date.now() }]);
    } finally {
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleApplyCorrection = (text: string) => {
    setInput(prev => {
        const separator = prev.length > 0 && !prev.endsWith(' ') ? ' ' : '';
        return prev + separator + text;
    });
    inputRef.current?.focus();
  };

  const handleReportIssue = (id: string) => {
    setReportedMessages(prev => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
    });
    // In a real app, this would trigger an API call to log the feedback
    console.log(`Reported issue for message ${id}`);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 flex items-center shadow-sm z-10 sticky top-0">
         <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white mr-3 shadow-md">
           <Bot size={24} />
         </div>
         <div>
           <h2 className="font-bold text-gray-900">SAS AI Tutor</h2>
           <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit mt-0.5">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></div>
             Online
           </div>
         </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
               
               <div className={`flex ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600 ml-2' : 'bg-blue-100 mr-2 text-blue-600'}`}>
                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative group transition-all duration-200 hover:shadow-md ${
                        msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}>
                        {msg.role === 'user' ? (
                            <div className="whitespace-pre-wrap">{msg.text}</div>
                        ) : (
                            <div className="markdown-content space-y-2">
                                <ReactMarkdown
                                    components={{
                                        p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />,
                                        ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                                        ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                        h1: ({node, ...props}) => <h1 className="text-lg font-bold mt-2 mb-1" {...props} />,
                                        h2: ({node, ...props}) => <h2 className="text-base font-bold mt-2 mb-1" {...props} />,
                                        h3: ({node, ...props}) => <h3 className="text-sm font-bold mt-1" {...props} />,
                                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-200 pl-3 italic text-gray-500 my-2" {...props} />,
                                        code: ({node, inline, className, children, ...props}: any) => {
                                            return inline ? 
                                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-pink-600 border border-gray-200" {...props}>{children}</code> :
                                                <code className="block bg-gray-800 text-white p-3 rounded-lg text-xs font-mono overflow-x-auto my-2" {...props}>{children}</code>
                                        },
                                        a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            </div>
                        )}

                        {/* Grammar Analysis Report Render */}
                        {msg.grammarAnalysis && (
                        <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm relative">
                                <div className="flex items-center text-emerald-700 font-bold text-xs mb-2 uppercase tracking-wider">
                                    <Check size={14} className="mr-1.5" /> Corrected Version
                                </div>
                                <div className="text-gray-900 font-medium pr-8">
                                    {msg.grammarAnalysis.correctedText}
                                </div>
                                <button
                                    onClick={() => setInput(msg.grammarAnalysis!.correctedText)}
                                    className="absolute top-2 right-2 p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                    title="Replace input with corrected version"
                                >
                                    <CornerDownLeft size={16} />
                                </button>
                            </div>
                            
                            {msg.grammarAnalysis.errors.length > 0 && (
                                <div className="space-y-2 mt-2">
                                    {msg.grammarAnalysis.errors.map((err, i) => (
                                    <div key={i} className="bg-white p-3 rounded-lg border border-red-100 shadow-sm border-l-4 border-l-red-400 flex justify-between items-center gap-2">
                                        <div>
                                            <div className="font-semibold text-red-700 text-xs mb-1 flex items-center uppercase tracking-wide">
                                                <AlertTriangle size={12} className="mr-1.5" /> {err.rule}
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm mt-1">
                                                <span className="line-through text-red-400 decoration-red-400/50 bg-red-50 px-1 rounded">{err.original}</span>
                                                <ArrowRight size={14} className="text-gray-400 hidden sm:block" />
                                                <span className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded">{err.correction}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleApplyCorrection(err.correction)}
                                            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex-shrink-0 border border-blue-100"
                                            title="Apply this correction to input"
                                        >
                                            <CornerDownLeft size={16} />
                                        </button>
                                    </div>
                                    ))}
                                </div>
                            )}

                            <div className="text-sm text-gray-600 italic border-t border-gray-200 pt-3 mt-1 bg-white p-3 rounded-lg border border-gray-100">
                                <span className="font-semibold text-blue-600 not-italic mr-1">Feedback:</span>
                                {msg.grammarAnalysis.feedback}
                            </div>

                            <div className="flex justify-end pt-1">
                                <button 
                                    onClick={() => handleReportIssue(msg.id)}
                                    disabled={reportedMessages.has(msg.id)}
                                    className={`text-[10px] flex items-center transition-colors px-2 py-1 rounded-full ${
                                        reportedMessages.has(msg.id) 
                                        ? 'text-emerald-600 bg-emerald-50 cursor-default' 
                                        : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                                    }`}
                                    title="Report inaccurate analysis"
                                >
                                    {reportedMessages.has(msg.id) ? (
                                        <>Feedback Sent <Check size={10} className="ml-1" /></>
                                    ) : (
                                        <><Flag size={10} className="mr-1" /> Report Issue</>
                                    )}
                                </button>
                            </div>
                        </div>
                        )}
                        
                        <div className={`text-[10px] mt-2 text-right opacity-70 flex items-center justify-end ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                             {formatTime(msg.timestamp)}
                        </div>
                    </div>
               </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm ml-10 flex items-center space-x-2">
                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 <span className="text-xs text-gray-400 font-medium ml-2">{loadingText}</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center space-x-2">
          
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              disabled={loading}
              placeholder="Type your message or text to analyze..."
              className="w-full p-3 pl-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <button 
              onClick={handleGrammarCheck} 
              disabled={!input.trim() || loading} 
              className={`p-3 md:px-4 md:py-3 rounded-xl transition-all duration-200 flex items-center justify-center border font-medium
                  ${!input.trim() || loading 
                    ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed' 
                    : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 shadow-sm active:scale-95'
                  }
              `}
              title="Check Grammar"
          >
              <SpellCheck size={20} className="md:mr-2" />
              <span className="hidden md:inline">Check Grammar</span>
          </button>

          <button 
              onClick={handleSend} 
              disabled={!input.trim() || loading} 
              className={`p-3 md:px-4 md:py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-md border border-transparent font-medium
                  ${!input.trim() || loading 
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 hover:shadow-lg'
                  }
              `}
              title="Send Message"
          >
              <Send size={20} className="md:mr-2" />
              <span className="hidden md:inline">Send</span>
          </button>
        </div>
        
        <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400">AI can make mistakes. Please review critical information.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatTutor;