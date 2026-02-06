
import React from 'react';

interface JobInputSectionProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  isLoading: boolean;
}

const JobInputSection: React.FC<JobInputSectionProps> = ({ jobDescription, setJobDescription, isLoading }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">1. Add Job Description</h2>
      <p className="text-slate-400 mb-4 text-sm">Paste the full job description you want to apply for.</p>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        disabled={isLoading}
        className="w-full h-60 bg-slate-900/70 border border-slate-700 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder-slate-500 disabled:bg-slate-700"
      />
    </div>
  );
};

export default JobInputSection;
