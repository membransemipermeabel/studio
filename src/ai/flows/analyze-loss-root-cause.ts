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
    .describe('Daftar usulan akar penyebab potensial untuk anomali yang teridentifikasi.'),
  likelihoods: z
    .array(z.number())
    .describe(
      'Daftar skor kemungkinan (0-1) yang sesuai untuk setiap usulan akar penyebab, berdasarkan data kasus lampau.'
    ),
  confidenceLevels: z
    .array(z.string())
    .describe(
      'Daftar tingkat kepercayaan (rendah, sedang, tinggi) yang sesuai untuk setiap usulan akar penyebab, berdasarkan kualitas bukti.'
    ),
  recommendedSolutions: z
    .array(z.string())
    .describe(
      'Daftar solusi atau pendekatan perbaikan yang direkomendasikan untuk setiap usulan akar penyebab.'
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
  prompt: `Anda adalah seorang ahli dalam menganalisis kerugian rantai pasokan beras. Berdasarkan anomali yang teridentifikasi dan data kasus lampau, usulkan akar penyebab dan solusi potensial dalam Bahasa Indonesia. Nilai kemungkinan dan keyakinan dari setiap usulan berdasarkan data yang diberikan.

Anomali yang Diidentifikasi: {{{identifiedAnomalies}}}
Data Kasus Lampau: {{{pastCaseData}}}

Format respons Anda sebagai objek JSON dengan bidang berikut:
- suggestedRootCauses: Daftar akar penyebab potensial.
- likelihoods: Daftar skor kemungkinan (0-1) untuk setiap akar penyebab.
- confidenceLevels: Daftar tingkat kepercayaan (rendah, sedang, tinggi) untuk setiap akar penyebab.
- recommendedSolutions: Daftar solusi yang direkomendasikan untuk setiap akar penyebab.`,
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
