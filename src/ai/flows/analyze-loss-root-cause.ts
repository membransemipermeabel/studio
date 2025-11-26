'use server';

/**
 * @fileOverview Analyzes potential root causes of rice supply chain losses and suggests solutions.
 *
 * - analyzeLossRootCause - A function that analyzes loss root causes and suggests solutions.
 * - AnalyzeLossRootCauseInput - The input type for the analyzeLossRootCause function.
 * - AnalyzeLossRootCauseOutput - The return type for the analyzeLossRootCause function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLossRootCauseInputSchema = z.object({
  identifiedAnomalies: z
    .string()
    .describe(
      'Description of identified anomalies in the rice supply chain, including details about where and when the anomalies occurred.'
    ),
  pastCaseData: z
    .string()
    .describe(
      'Relevant past case data related to similar anomalies, including previous root causes and remediation approaches.'
    ),
});
export type AnalyzeLossRootCauseInput = z.infer<typeof AnalyzeLossRootCauseInputSchema>;

const AnalyzeLossRootCauseOutputSchema = z.object({
  suggestedRootCauses: z
    .array(z.string())
    .describe('A list of suggested potential root causes for the identified anomalies.'),
  likelihoods: z
    .array(z.number())
    .describe(
      'A corresponding list of likelihood scores (0-1) for each suggested root cause, based on past case data.'
    ),
  confidenceLevels: z
    .array(z.string())
    .describe(
      'A corresponding list of confidence levels (low, medium, high) for each suggested root cause, based on the quality of the evidence.'
    ),
  recommendedSolutions: z
    .array(z.string())
    .describe(
      'A list of recommended solutions or remediation approaches for each suggested root cause.'
    ),
});
export type AnalyzeLossRootCauseOutput = z.infer<typeof AnalyzeLossRootCauseOutputSchema>;

export async function analyzeLossRootCause(
  input: AnalyzeLossRootCauseInput
): Promise<AnalyzeLossRootCauseOutput> {
  return analyzeLossRootCauseFlow(input);
}

const analyzeLossRootCausePrompt = ai.definePrompt({
  name: 'analyzeLossRootCausePrompt',
  input: {schema: AnalyzeLossRootCauseInputSchema},
  output: {schema: AnalyzeLossRootCauseOutputSchema},
  prompt: `You are an expert in analyzing rice supply chain losses. Given the identified anomalies and past case data, suggest potential root causes and solutions.  Assess the likelihood and confidence of each suggestion based on the provided data.

Identified Anomalies: {{{identifiedAnomalies}}}
Past Case Data: {{{pastCaseData}}}

Format your response as a JSON object with the following fields:
- suggestedRootCauses: A list of potential root causes.
- likelihoods: A list of likelihood scores (0-1) for each root cause.
- confidenceLevels: A list of confidence levels (low, medium, high) for each root cause.
- recommendedSolutions: A list of recommended solutions for each root cause.`,
});

const analyzeLossRootCauseFlow = ai.defineFlow(
  {
    name: 'analyzeLossRootCauseFlow',
    inputSchema: AnalyzeLossRootCauseInputSchema,
    outputSchema: AnalyzeLossRootCauseOutputSchema,
  },
  async input => {
    const {output} = await analyzeLossRootCausePrompt(input);
    return output!;
  }
);
