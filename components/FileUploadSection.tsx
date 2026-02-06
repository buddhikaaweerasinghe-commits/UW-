
import React, { useCallback, useRef, useState } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface UploadedFile {
  name: string;
  content: string;
}

interface FileUploadSectionProps {
  onFilesChange: (files: UploadedFile[]) => void;
  uploadedFiles: UploadedFile[];
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({ onFilesChange, uploadedFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pastedText, setPastedText] = useState('');
  const pastedProposalCounter = useRef(1);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // FIX: Explicitly type `file` as `File` to resolve type inference issues.
    const fileReadPromises = Array.from(files).map((file: File) => {
      return new Promise<UploadedFile>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          if (typeof content === 'string') {
            resolve({ name: file.name, content });
          } else {
            reject(new Error(`Failed to read file: ${file.name}`));
          }
        };
        reader.onerror = () => reject(reader.error || new Error(`Error reading file: ${file.name}`));
        reader.readAsText(file);
      });
    });

    try {
      const newFiles = await Promise.all(fileReadPromises);
      onFilesChange([...uploadedFiles, ...newFiles]);
    } catch (error) {
      console.error("Error reading files:", error);
    }
  }, [onFilesChange, uploadedFiles]);

  const handleRemoveFile = (fileName: string) => {
    onFilesChange(uploadedFiles.filter(file => file.name !== fileName));
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddPastedProposal = () => {
    if (!pastedText.trim()) return;

    const newFile: UploadedFile = {
      name: `Pasted Proposal ${pastedProposalCounter.current}`,
      content: pastedText.trim(),
    };

    onFilesChange([...uploadedFiles, newFile]);
    pastedProposalCounter.current += 1;
    setPastedText(''); // Clear the textarea
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">1. Learn From Your Proposals</h2>
      <p className="text-slate-400 mb-4 text-sm">
        Upload successful proposals (.txt files) or paste them directly to teach the AI your style.
      </p>

      <div className="space-y-4">
        <div>
          <input
            type="file"
            multiple
            accept=".txt,.md"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={handleUploadButtonClick}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 text-cyan-300 font-semibold py-3 px-4 rounded-md hover:bg-slate-600 transition-colors"
          >
            <UploadIcon />
            Upload from Files
          </button>
        </div>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-slate-600"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-sm">OR</span>
          <div className="flex-grow border-t border-slate-600"></div>
        </div>

        <div>
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste a successful proposal here..."
            className="w-full h-40 bg-slate-900/70 border border-slate-700 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder-slate-500"
            aria-label="Paste proposal text"
          />
          <button
            onClick={handleAddPastedProposal}
            disabled={!pastedText.trim()}
            className="mt-2 w-full bg-slate-700 text-cyan-300 font-semibold py-3 px-4 rounded-md hover:bg-slate-600 transition-colors disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            Add Pasted Proposal
          </button>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-700">
          <h3 className="text-slate-300 font-medium mb-2">Learning Materials ({uploadedFiles.length}):</h3>
          <ul className="max-h-40 overflow-y-auto pr-2 space-y-2">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-md text-sm">
                <span className="text-slate-300 truncate" title={file.name}>{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(file.name)}
                  className="text-red-400 hover:text-red-300 font-bold ml-2 text-lg flex-shrink-0"
                  aria-label={`Remove ${file.name}`}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;