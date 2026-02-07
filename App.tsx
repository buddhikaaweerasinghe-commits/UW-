
import React, { useState, useCallback, useEffect } from 'react';
import { generateWithGemini, generateWithGroq } from './services/apiService';
import JobInputSection from './components/JobInputSection';
import ProposalOutputSection from './components/ProposalOutputSection';
import { CheckCircleIcon } from './components/icons/CheckCircleIcon';
import { WarningIcon } from './components/icons/WarningIcon';

interface UploadedFile {
  name: string;
  content: string;
}

const initialProposal: UploadedFile = {
    name: 'Initial Example Proposal.txt',
    content: `★★★ START NOW . DELIVER IN 36 hrs . FREE UNLIMITED REVISIONS ★★★
------------------------------------------------------------------------------------------------

Hello !!

I have gone through the project description and assure you of my capability to handle this project in a very professional and timely manner.
As a CERTIFIED , TOP RATED PRO PRESENTATION Designer i can do this in 24/36hrs .

Please visit my portfolio at,
2026 Portfolio: https://www.dropbox.com/scl/fi/h2j4nnvjszuy9to7yrdka/2026.pdf?rlkey=h5bmzi358apoqfw8gu20pcvkw&st=jgrfet1r&dl=0
Or Google Slides: https://docs.google.com/presentation/d/1lANo2GNe6mshunISkMghQVPqOaS6XEK04uJLn4nNbIA/edit?usp=sharing
Animation Example: https://www.dropbox.com/scl/fi/96ng7sepi6jbp4ykxo9hf/animation-example.mp4?rlkey=sdgsv59kamapsq23tvf4nunvj&st=w32c7iru&dl=0

Here is my service description for your project.
✅ Price - 69$ for 6-10 slides
⏰ First rough draft in 12 hrs. Deliver in 1 days
✅ Use FREE Stock Images for your work
✅ FREE UNLIMITED REVISIONS until you satisfy

I'm very confident in my work and I'm sure I can exceed your expectations!
Thank you for your time.

Kalaa`
};

const secondInitialProposal: UploadedFile = {
    name: 'Second Example Proposal.txt',
    content: `★★★ START NOW . DELIVER IN 36 hrs . FREE UNLIMITED REVISIONS ★★★
-------------------------------------------------------------------------------

Hi,

Let's do it NOW !
Yes, I'm ready to convert and do the full formatting cleanup of your keynote files.

You will get,
🔺 FREE unlimited revisions until you get best
🎨 I’ll enhance layouts, custom graphics, and data visualization.
🔄 Consistency is Key ; Strict adherence to your brand colors ( if available ), fonts, and style for a cohesive look.
⚡ Quick Turnaround ; in 1-2 days . with all revisions to meet your deadlines.

My Process:

✅ Audit & Strategy – Review your current PPT decks and Conversation and formatting cleanups
✅ Visual Upgrade if Required
✅ Final Polish – Ensure every slide is pixel-perfect and presentation-ready.

🔺 Portfolio

Please visit my portfolio at,
2026 Portfolio: https://www.dropbox.com/scl/fi/h2j4nnvjszuy9to7yrdka/2026.pdf?rlkey=h5bmzi358apoqfw8gu20pcvkw&st=jgrfet1r&dl=0
Or Google Slides: https://docs.google.com/presentation/d/1lANo2GNe6mshunISkMghQVPqOaS6XEK04uJLn4nNbIA/edit?usp=sharing
Animation Example: https://www.dropbox.com/scl/fi/96ng7sepi6jbp4ykxo9hf/animation-example.mp4?rlkey=sdgsv59kamapsq23tvf4nunvj&st=w32c7iru&dl=0

Ready to make your slides stand out with clearing of formatting errors ?

Best Regards,

Kalaa`
};

const thirdInitialProposal: UploadedFile = {
    name: 'Third Example Proposal.txt',
    content: `#1.  Experience and Trust   

From fortune 500 companies to small local businesses, over the past 12 years I have helped more than 500+ clients with presentation graphic design work ! A handful listed below:

🔺 Johnson & Johnson
🔺 Hewlett Packard
🔺 PWC
🔺 Unilever
🔺 Patagonia
🔺 GMAC Insurance
🔺 UpWork
🔺 3M
🔺 Slack


#2. My Qualifications and Expertise.  

✅   TOP RATED at UpWork 
✅   Among TOP 10% for PowerPoint Talent 
✅   600+ Jobs completed at UpWork as a individual another 300+ as a company
✅   115+ Five star PROJECT feedbacks from last 120
✅   True Expert in Adobe PS. Powerpoint, Keynote etc

🔺 My Portfolio
2026 Portfolio: https://www.dropbox.com/scl/fi/h2j4nnvjszuy9to7yrdka/2026.pdf?rlkey=h5bmzi358apoqfw8gu20pcvkw&st=jgrfet1r&dl=0
Google Slides: https://docs.google.com/presentation/d/1lANo2GNe6mshunISkMghQVPqOaS6XEK04uJLn4nNbIA/edit?usp=sharing
Animation Example: https://www.dropbox.com/scl/fi/96ng7sepi6jbp4ykxo9hf/animation-example.mp4?rlkey=sdgsv59kamapsq23tvf4nunvj&st=w32c7iru&dl=0

🔺 Typical Process

- Delivering First sample of few slides in slides master
- Getting approval to proceed to first draft
- Delivering first draft and making revisions
- Delivering Final and making revisions if required 

🔺 Design Inspirations 

Styles - Duarte , Zen 
Brands - Apple , HP, Microsoft , Unilever , Toyota , 
TV - NHK, Nat Geo , STAR SPORTS INDIA`
};

const fourthInitialProposal: UploadedFile = {
    name: 'Fourth Example Proposal.txt',
    content: `★★★ START NOW . DELIVER IN 12 hrs . $189 .FREE UNLIMITED REVISIONS ★★★
———————————————————————————————————————

Dear

Thanks for your time for evaluation this proposal.

My wife ‘Kalaa’ and I run “slidegigs” , a boutique presentation agency in here.
We have completed 600+ projects in here over the 14 years in UpWork.

From fortune 500 companies to small local businesses, over the past 10 years I have helped more than 500+ clients with presentation graphic design work ! A handful listed below:

🔺 Johnson & Johnson
🔺 Hewlett Packard
🔺 PricewaterhouseCoopers
🔺 Unilever
🔺 Patagonia
🔺 GMAC Insurance
🔺 Criterion Industries

Here is my service description for your project.

🔺   FREE UNLIMITED REVISIONS until you satisfy
✅	Price - Negotiable
⏰	First rough draft in 12 hrs. Deliver in 24hrs
✅	Use FREE Stock  Images for your work

:::::::::::  Here is My Portfolio  :::::::::::::::::::
2026 Portfolio: https://www.dropbox.com/scl/fi/h2j4nnvjszuy9to7yrdka/2026.pdf?rlkey=h5bmzi358apoqfw8gu20pcvkw&st=jgrfet1r&dl=0
Or Google Slides: https://docs.google.com/presentation/d/1lANo2GNe6mshunISkMghQVPqOaS6XEK04uJLn4nNbIA/edit?usp=sharing
Animation Example: https://www.dropbox.com/scl/fi/96ng7sepi6jbp4ykxo9hf/animation-example.mp4?rlkey=sdgsv59kamapsq23tvf4nunvj&st=w32c7iru&dl=0

I'm sure I can exceed your expectations!

Kalaa`
};

const fifthInitialProposal: UploadedFile = {
    name: 'Fifth Example Proposal.txt',
    content: `★★★ START NOW . DELIVER IN 20 hrs . FREE UNLIMITED REVISIONS  ★★★
------------------------------------------------------------------------------------------------

Hello !!

Thanks for your time for evaluation this proposal.

My wife ‘Kalaa’ and I run “slideGigs” , a boutique presentation agency in here. We have completed 600+ projects in here over the 14 years in UpWork.
You have option to select me or my partner for this project.

I have gone through the project description and assure you of my capability to handle this  40 slides presentation upgrading project in timely manner.

Here is my main portfolio:
2026 Portfolio: https://www.dropbox.com/scl/fi/h2j4nnvjszuy9to7yrdka/2026.pdf?rlkey=h5bmzi358apoqfw8gu20pcvkw&st=jgrfet1r&dl=0
Or Google Slides: https://docs.google.com/presentation/d/1lANo2GNe6mshunISkMghQVPqOaS6XEK04uJLn4nNbIA/edit?usp=sharing
Animation Example: https://www.dropbox.com/scl/fi/96ng7sepi6jbp4ykxo9hf/animation-example.mp4?rlkey=sdgsv59kamapsq23tvf4nunvj&st=w32c7iru&dl=0

Here is service description for your project.
✅ Price - 289$ for 40 slides ; negotiable
⏰ First rough draft in 12 hrs. Deliver in 1  day
✅ Use FREE Stock Images for your work
✅ FREE UNLIMITED REVISIONS until you satisfy

I'm very confident in my work and I'm sure I can exceed your expectations!
Thank you for your time.

Buddhika A.`
};

const sixthInitialProposal: UploadedFile = {
    name: 'Sixth Example Proposal.txt',
    content: `★★★ START NOW ON . DELIVER IN 24 hrs . 189$ ★★★
--------------------------------------------------------

Let’s do it . :D
I know you looking for Unique, Elegant & Clean presentations that branded for you.
( That means I'll provide full support in Microsite design, hosting, copy and image support and technical follow up support moving forward AS REQUESTED )

Because i can provide FREE UNLIMITED TIMES OF REVISIONS until you satisfy, you can always have great peso materials.

You are welcome to my portfolio:
2026 Portfolio: https://www.dropbox.com/scl/fi/h2j4nnvjszuy9to7yrdka/2026.pdf?rlkey=h5bmzi358apoqfw8gu20pcvkw&st=jgrfet1r&dl=0
Or Google Slides: https://docs.google.com/presentation/d/1lANo2GNe6mshunISkMghQVPqOaS6XEK04uJLn4nNbIA/edit?usp=sharing
Animation Example: https://www.dropbox.com/scl/fi/96ng7sepi6jbp4ykxo9hf/animation-example.mp4?rlkey=sdgsv59kamapsq23tvf4nunvj&st=w32c7iru&dl=0

From fortune 500 companies to small local businesses, over the past 10 years I have helped more than 500+ clients with presentation graphic design work ! A handful listed below:

🔺 Johnson & Johnson
🔺 Hewlett Packard
🔺 PricewaterhouseCoopers
🔺 Unilever
🔺 Patagonia
🔺 GMAC Insurance
🔺 Criterion Industries

Here is my service description for your project.

✅	Price - TBD
⏰	Period  - TBD
✅	Use FREE Stock  Images for your work
🔺    FREE UNLIMITED REVISIONS until you satisfy
✅	Additional 3 designers support can get if required .
✅	Capable web, file hosting and tech support

My Qualifications and Experience.

✅   TOP RATED at UpWork
✅   True Expert in Adobe PS. PowerPoint, Apple Keynote etc
✅   Among TOP 10% for PowerPoint Talent
✅   1500+ Presentations at UpWork
✅   490+ Jobs completed at UpWork  as a individual
✅   115+ Five star PROJECT feedbacks from last 120

I'm very confident in my work and I'm sure I can exceed your expectations!
Thank you for your time.

Kalaa`
};

const seventhInitialProposal: UploadedFile = {
    name: 'Seventh Example Proposal.txt',
    content: `★★★ 600+ Presentation Projects @ UpWork  ★ START NOW . FROM 89$ ★★★
------------------------------------------------------------------------------------------------

Hi ,

Let’s do it , yes, i'm ready to take down your 12/15 slides deck now and deliver in next 24hrs .
As you can see from my work below, I am a well-capable certified presentation designer from Sri Lanka.

My Portfolio:
2026 Portfolio: https://www.dropbox.com/scl/fi/h2j4nnvjszuy9to7yrdka/2026.pdf?rlkey=h5bmzi358apoqfw8gu20pcvkw&st=jgrfet1r&dl=0
Or Google Slides: https://docs.google.com/presentation/d/1lANo2GNe6mshunISkMghQVPqOaS6XEK04uJLn4nNbIA/edit?usp=sharing
Animation Example: https://www.dropbox.com/scl/fi/96ng7sepi6jbp4ykxo9hf/animation-example.mp4?rlkey=sdgsv59kamapsq23tvf4nunvj&st=w32c7iru&dl=0

:::::::::: DID YOU FIND SOME ONE GIVES THESE OFFERS ?  ::::::::::

🔺  FREE UNLIMITED REVISIONS until you satisfy
⏰	 First Draft within 12 Hrs & FINAL WORK within 36 Hrs.
✅	 Use FREE Stock  Images for your work
✅	 15 slides for 89$

:::::::::: EXPERIENCE | SKILLS | ENVIRONMENT  ::::::::::

✅   Among TOP 10% for PowerPoint Talent
✅   Completed 1500+ Presentations at UpWork
✅   WORKED with top clients like Johnsons, Unilever , Patagonia , PWC , HP , UpWork
✅   115+ Five star PROJECT feedbacks from last 120
✅   Expert in Google slides, PowerPoint, Keynote , Articulate , Captivate, PS, Pr
✅   Multi Skilled in Video editing, eLearning and Graphic Designs
✅   Environment of MAC & PC with high-speed internet

Please let me know if there is anything else I can do to convince you.
🔺 READY TO CALL NOW IF NEEDED .

I'm very confident in my work and I'm sure I can exceed your expectations !

Thank you for your time.

Kalaa`
};

const eighthInitialProposal: UploadedFile = {
    name: 'Eighth Example Proposal.txt',
    content: `★★★ 600+ Presentation Projects @ UpWork  ★ START NOW . FROM 89$ ★★★
--------------------------------------------------------------------------------

Hi ,

Let’s do it , yes, i'm ready to take down your 12/15 slides deck now and deliver in next 24hrs .
As you can see from my work below, I am a well-capable certified presentation designer from Sri Lanka.

My Portfolio:
2026 Portfolio: https://www.dropbox.com/scl/fi/h2j4nnvjszuy9to7yrdka/2026.pdf?rlkey=h5bmzi358apoqfw8gu20pcvkw&st=jgrfet1r&dl=0
Or Google Slides: https://docs.google.com/presentation/d/1lANo2GNe6mshunISkMghQVPqOaS6XEK04uJLn4nNbIA/edit?usp=sharing
Animation Example: https://www.dropbox.com/scl/fi/96ng7sepi6jbp4ykxo9hf/animation-example.mp4?rlkey=sdgsv59kamapsq23tvf4nunvj&st=w32c7iru&dl=0

:::::::::: DID YOU FIND SOME ONE GIVES THESE OFFERS ?  ::::::::::

🔺  FREE UNLIMITED REVISIONS until you satisfy
⏰	 First Draft within 12 Hrs & FINAL WORK within 36 Hrs.
✅	 Use FREE Stock  Images for your work
✅	 PRICING STRUCTURE
             • 10 Slides = 89$
             • 15 Slides = 109$
             • 20 Slides = 139$
             • 25 Slides = 189$
              ( PRICE NEGOTIABLE )

:::::::::: EXPERIENCE | SKILLS | ENVIRONMENT  ::::::::::

✅   Among TOP 10% for PowerPoint Talent
✅   Completed 1500+ Presentations at UpWork
✅   WORKED with top clients like Johnsons, Unilever , Patagonia , PWC , HP , UpWork
✅   115+ Five star PROJECT feedbacks from last 120
✅   Expert in Excel, Word , SWAY , PowerPoint, Keynote and best in those
✅   Always use of advance skills with Adobe suite - PS, Id, Pr
✅   Environment of MAC & PC with high-speed internet

Please let me know if there is anything else I can do to convince you.
I'm very confident in my work and I'm sure I can exceed your expectations !

Thank you for your time.

Kalaa`
};

const initialProposals: UploadedFile[] = [
    initialProposal, 
    secondInitialProposal, 
    thirdInitialProposal,
    fourthInitialProposal,
    fifthInitialProposal,
    sixthInitialProposal,
    seventhInitialProposal,
    eighthInitialProposal
];

type ApiProvider = 'gemini' | 'groq';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const [jobDescription, setJobDescription] = useState<string>('');
  const [generatedProposal, setGeneratedProposal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiProvider, setApiProvider] = useState<ApiProvider>('gemini');

  const [isGeminiConfigured, setIsGeminiConfigured] = useState(false);
  const [isGroqConfigured, setIsGroqConfigured] = useState(false);

  useEffect(() => {
    // This check runs once on component mount.
    // In a real build environment, process.env is static.
    // In some development setups, this could be more dynamic, but for this context, once is sufficient.
    setIsGeminiConfigured(!!process.env.API_KEY);
    setIsGroqConfigured(!!process.env.GROQ_API_KEY);
  }, []);

  const handleGenerateClick = useCallback(async () => {
    if (!jobDescription.trim()) {
      setError('Please provide a job description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedProposal('');

    try {
      const proposalContents = initialProposals.map(file => file.content);
      let result;
      if (apiProvider === 'gemini') {
        result = await generateWithGemini(proposalContents, jobDescription);
      } else {
        result = await generateWithGroq(proposalContents, jobDescription);
      }
      setGeneratedProposal(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate proposal: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [jobDescription, apiProvider]);

  const handlePasswordSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (passwordInput === 'asaa') {
          setIsAuthenticated(true);
          setAuthError('');
      } else {
          setAuthError('Incorrect password. Please try again.');
          setPasswordInput('');
      }
  };

  const isCurrentProviderConfigured = () => {
    return apiProvider === 'gemini' ? isGeminiConfigured : isGroqConfigured;
  };

  const isGenerateDisabled = !jobDescription.trim() || isLoading || !isCurrentProviderConfigured();

  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <form onSubmit={handlePasswordSubmit} className="bg-white shadow-lg p-8 rounded-lg border border-gray-200">
                    <h1 className="text-2xl md:text-3xl font-bold text-cyan-600 tracking-tight text-center mb-2">
                        Access Required
                    </h1>
                    <p className="text-gray-500 mt-1 text-center mb-6">Please enter the password to continue.</p>
                    <div className="mb-4">
                        <label htmlFor="password-input" className="sr-only">Password</label>
                        <input
                            id="password-input"
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Password"
                            autoFocus
                            className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder-gray-400"
                        />
                    </div>
                     {authError && (
                        <p className="text-red-500 text-center text-sm mb-4">{authError}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-opacity-50"
                    >
                        Unlock
                    </button>
                </form>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-600 tracking-tight">
            AI Upwork Proposal Generator
          </h1>
          <p className="text-gray-500 mt-1">
            Instantly generate tailored proposals from a job description.
          </p>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="flex flex-col gap-8">
          <JobInputSection 
            jobDescription={jobDescription} 
            setJobDescription={setJobDescription} 
            isLoading={isLoading} 
          />
        
          <ProposalOutputSection 
            proposal={generatedProposal}
            isLoading={isLoading}
            error={error}
          />

          <div className="mt-4 pt-6 border-t border-gray-200 flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center space-y-4">
                <span className="text-sm font-medium text-gray-600">Choose AI Provider:</span>
                <div className="inline-flex rounded-lg shadow-sm">
                    <button
                        onClick={() => setApiProvider('gemini')}
                        disabled={isLoading}
                        title={isGeminiConfigured ? 'Gemini is configured' : 'Gemini API key is not set'}
                        className={`px-4 py-2 text-sm font-semibold border border-gray-300 rounded-l-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-400 flex items-center gap-2 ${
                            apiProvider === 'gemini'
                                ? 'bg-cyan-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        } disabled:opacity-50`}
                    >
                        Gemini
                        {isGeminiConfigured ? <CheckCircleIcon /> : <WarningIcon />}
                    </button>
                    <button
                        onClick={() => setApiProvider('groq')}
                        disabled={isLoading}
                        title={isGroqConfigured ? 'Groq is configured' : 'Groq API key is not set'}
                        className={`px-4 py-2 text-sm font-semibold border-t border-b border-r border-gray-300 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-400 flex items-center gap-2 ${
                            apiProvider === 'groq'
                                ? 'bg-cyan-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        } disabled:opacity-50`}
                    >
                        Groq (Fast)
                        {isGroqConfigured ? <CheckCircleIcon /> : <WarningIcon />}
                    </button>
                </div>
            </div>

            <div className="h-10 text-center">
              {!isCurrentProviderConfigured() && !isLoading && (
                  <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs rounded-md px-4 py-2 flex items-center gap-2">
                      <WarningIcon />
                      <span>
                          {apiProvider === 'gemini' ? 'Gemini API key is missing. Add ' : 'Groq API key is missing. Add '}
                          <code className="bg-yellow-200 p-1 rounded text-xs font-mono">{apiProvider === 'gemini' ? 'API_KEY' : 'GROQ_API_KEY'}</code>
                          {' to your environment variables.'}
                      </span>
                  </div>
              )}
            </div>

            <button
              onClick={handleGenerateClick}
              disabled={isGenerateDisabled}
              className="w-full max-w-md bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-opacity-50 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
              ) : '✨ Generate Proposal'}
            </button>
            {error && !isLoading && (
              <p className="text-red-500 mt-4 text-center">{error}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
