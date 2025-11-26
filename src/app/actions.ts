
'use server';

import {
  analyzeLossRootCause,
  type AnalyzeLossRootCauseInput,
  type AnalyzeLossRootCauseOutput,
} from '@/ai/flows/analyze-loss-root-cause';

export async function getAnalysis(
  input: AnalyzeLossRootCauseInput
): Promise<AnalyzeLossRootCauseOutput> {
  try {
    const result = await analyzeLossRootCause(input);
    return result;
  } catch (error) {
    console.error('Error in getAnalysis server action:', error);
    throw new Error('Failed to get analysis from AI model.');
  }
}
