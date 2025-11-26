'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lightbulb, Loader2, AlertCircle } from 'lucide-react';
import { getAnalysis } from '@/app/actions';
import type { AnalyzeLossRootCauseOutput } from '@/ai/flows/analyze-loss-root-cause';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const analysisSchema = z.object({
  identifiedAnomalies: z.string().min(20, {
    message: 'Please provide a detailed description of anomalies (at least 20 characters).',
  }),
  pastCaseData: z.string().min(20, {
    message: 'Please provide relevant past case data (at least 20 characters).',
  }),
});

type AnalysisFormValues = z.infer<typeof analysisSchema>;

export function Analysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeLossRootCauseOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      identifiedAnomalies: '',
      pastCaseData: '',
    },
  });

  const onSubmit = async (data: AnalysisFormValues) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await getAnalysis(data);
      setAnalysisResult(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getConfidenceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  return (
    <section id="analysis" className="py-16 md:py-24 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="lg:sticky lg:top-24">
          <div className="mb-8">
            <h2 className="font-headline text-4xl font-bold text-secondary">Loss Root Cause Analysis</h2>
            <p className="mt-4 max-w-2xl text-lg text-secondary/70">
              Leverage AI to diagnose supply chain issues. Describe the problem and provide historical context to receive potential root causes and solutions.
            </p>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Submit for Analysis</CardTitle>
              <CardDescription>Fill in the details below to start the AI analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="identifiedAnomalies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identified Anomalies</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'Unexpected 15% weight loss observed in Batch B-7 during the drying phase at the Northern facility in the last quarter...'"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pastCaseData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Past Case Data</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'Similar losses in 2021 were attributed to high humidity levels and malfunctioning sensor equipment...'"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Run Analysis
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Analysis Results</h3>
            {isLoading && (
                 <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader><div className="h-6 w-3/4 rounded bg-muted"></div></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="h-4 w-full rounded bg-muted"></div>
                                <div className="h-4 w-1/2 rounded bg-muted"></div>
                                <div className="h-8 w-full rounded bg-muted"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {error && !isLoading && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!isLoading && !analysisResult && !error && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-secondary/60">Results will appear here once analysis is complete.</p>
                </div>
            )}
            {analysisResult && (
                <div className="space-y-6">
                    {analysisResult.suggestedRootCauses.map((cause, index) => (
                        <Card key={index} className="fade-in">
                            <CardHeader>
                                <CardTitle className="text-lg text-secondary">{cause}</CardTitle>
                                <div className="flex items-center gap-4 pt-2">
                                     <Badge variant="secondary">Likelihood: {Math.round(analysisResult.likelihoods[index] * 100)}%</Badge>
                                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className={cn('h-3 w-3 rounded-full', getConfidenceColor(analysisResult.confidenceLevels[index]))}></span>
                                        Confidence: {analysisResult.confidenceLevels[index]}
                                     </div>
                                </div>
                                <Progress value={analysisResult.likelihoods[index] * 100} className="mt-3 h-2" />
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-semibold text-secondary mb-2">Recommended Solution:</h4>
                                <p className="text-secondary/80">{analysisResult.recommendedSolutions[index]}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>

      </div>
    </section>
  );
}
