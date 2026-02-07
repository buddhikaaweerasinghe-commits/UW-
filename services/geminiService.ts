
import { GoogleGenAI } from "@google/genai";

export const generateProposal = async (previousProposals: string[], jobDescription: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set. Please configure it in your deployment environment.");
  }

  // Initialize the AI client here, only when the function is called.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  if (previousProposals.length === 0) {
    throw new Error("At least one previous proposal is required.");
  }
  if (!jobDescription.trim()) {
    throw new Error("Job description cannot be empty.");
  }

  const proposalExamples = previousProposals.map((proposal, index) =>
    `--- PROPOSAL EXAMPLE ${index + 1} ---\n${proposal}\n--- END PROPOSAL EXAMPLE ${index + 1} ---`
  ).join('\n\n');

  const prompt = `
You are an expert Upwork proposal writer. Your task is to write a new, compelling proposal for a job description, using the style, tone, and structure of successful past proposals as a guide.

Here are examples of my previous successful proposals:
${proposalExamples}

Now, here is the new job description I want to apply for:
--- JOB DESCRIPTION ---
${jobDescription}
--- END JOB DESCRIPTION ---

Please write a new proposal for this job. Follow these new, specific instructions carefully:
1.  **Analyze the examples:** Understand the tone (e.g., professional, friendly, technical), structure (e.g., opening hook, problem understanding, solution, call to action), and key selling points from the provided examples.
2.  **Tailor to the job:** Directly address the client's needs and requirements mentioned in the new job description. Use specifics from the job description to show you've read it carefully.
3.  **Mimic the style:** Write the new proposal in a similar style to the examples, but do not copy them directly. The content must be original and highly relevant to the new job.
4.  **Adjust Proposal Length:** The length of your proposal should match the complexity of the job. For simple or short-term jobs, write a concise proposal. For complex or long-term projects, write a more detailed and comprehensive proposal.
5.  **Strategic Portfolio Use:** This is very important. You have three portfolio links available:
    *   **Google Slides (Primary):** https://docs.google.com/presentation/d/1lANo2GNe6mshunISkMghQVPqOaS6XEK04uJLn4nNbIA/edit?usp=sharing
    *   **2026 Portfolio (PDF):** https://www.dropbox.com/scl/fi/h2j4nnvjszuy9to7yrdka/2026.pdf?rlkey=h5bmzi358apoqfw8gu20pcvkw&st=jgrfet1r&dl=0
    *   **Animation Example (Video):** https://www.dropbox.com/scl/fi/96ng7sepi6jbp4ykxo9hf/animation-example.mp4?rlkey=sdgsv59kamapsq23tvf4nunvj&st=w32c7iru&dl=0
    *   **Rule:** For most jobs, **only include the Google Slides link.** However, if the job description explicitly mentions needing \`animation\`, \`video\`, \`motion graphics\`, or is for a high-value, complex project that would benefit from a more extensive portfolio, you should **also include the '2026 Portfolio (PDF)' and the 'Animation Example' links.**
6.  **Start directly:** Begin the proposal with "Hello," or a similar professional but friendly greeting. Do not add any preamble like "Here is the proposal:".
7.  **Output format:** Provide only the text of the proposal. Do not wrap it in markdown code blocks or quotes.
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: prompt,
    });

    if (!response.text) {
        throw new Error("The API returned an empty response. The content may have been blocked.");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Propagate a more generic error to the UI to avoid exposing detailed internal errors.
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(`Failed to communicate with the Gemini API. ${message}`);
  }
};