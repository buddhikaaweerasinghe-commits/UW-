
import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ProposalOutputSectionProps {
  proposal: string;
  isLoading: boolean;
  error: string | null;
}

const ProposalOutputSection: React.FC<ProposalOutputSectionProps> = ({ proposal, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (proposal) {
      navigator.clipboard.writeText(proposal);
      setCopied(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500 mb-4"></div>
          <p className="text-lg font-semibold">Generating proposal...</p>
          <p className="text-sm">The AI is crafting your application.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
          <p className="font-bold mb-2">Generation Failed</p>
          <p className="text-sm text-center">{error}</p>
        </div>
      );
    }

    if (!proposal) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          <p className="text-lg font-semibold">Your proposal will appear here</p>
          <p className="text-sm text-center mt-1">Upload your work, add a job description, and click generate.</p>
        </div>
      );
    }

    return (
      <div className="relative p-1">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-slate-700/80 p-2 rounded-md text-slate-300 hover:bg-slate-600 hover:text-cyan-300 transition-all text-sm"
        >
          {copied ? 'Copied!' : <><ClipboardIcon /> Copy</>}
        </button>
        <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 whitespace-pre-wrap p-4 bg-slate-900/70 rounded-md">
            {proposal}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-md min-h-[360px]">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">3. Generated Proposal</h2>
      <div className="bg-slate-900 rounded-md border border-slate-700 min-h-[280px] p-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProposalOutputSection;
