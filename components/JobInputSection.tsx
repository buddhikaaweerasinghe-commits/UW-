
import React from 'react';

interface JobInputSectionProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  isLoading: boolean;
}

const JobInputSection: React.FC<JobInputSectionProps> = ({ jobDescription, setJobDescription, isLoading }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Add Job Description</h2>
      <p className="text-gray-500 mb-4 text-sm">Paste the full job description you want to apply for.</p>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        disabled={isLoading}
        className="w-full h-60 bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder-gray-400 disabled:bg-gray-200"
      />
    </div>
  );
};

export default JobInputSection;
