'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lightbulb, Loader2, AlertCircle } from 'lucide-react';
import { getAnalysis } from '@/app/actions';
import type { AnalyzeLossRootCauseOutput } from '@/ai/flows/analyze-loss-root-cause';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const analysisSchema = z.object({
  identifiedAnomalies: z.string().min(20, {
    message: 'Harap berikan deskripsi anomali secara detail (minimal 20 karakter).',
  }),
  pastCaseData: z.string().min(20, {
    message: 'Harap berikan data kasus lampau yang relevan (minimal 20 karakter).',
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
      const errorMessage = e instanceof Error ? e.message : 'Terjadi kesalahan yang tidak diketahui.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Analisis Gagal',
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
            <h2 className="font-headline text-4xl font-bold text-secondary">Analisis Akar Penyebab Kerugian</h2>
            <p className="mt-4 max-w-2xl text-lg text-secondary/70">
              Manfaatkan AI untuk mendiagnosis masalah rantai pasokan. Jelaskan masalahnya dan berikan konteks historis untuk menerima akar penyebab dan solusi potensial.
            </p>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Kirim untuk Analisis</CardTitle>
              <CardDescription>Isi detail di bawah ini untuk memulai analisis AI.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="identifiedAnomalies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anomali yang Diidentifikasi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="cth., 'Kehilangan berat tak terduga sebesar 15% teramati pada Batch B-7 selama fase pengeringan di fasilitas Utara pada kuartal terakhir...'"
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
                        <FormLabel>Data Kasus Lampau</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="cth., 'Kerugian serupa pada tahun 2021 disebabkan oleh tingkat kelembapan tinggi dan peralatan sensor yang tidak berfungsi...'"
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
                        Menganalisis...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Jalankan Analisis
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Hasil Analisis</h3>
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
                    <p className="text-secondary/60">Hasil akan muncul di sini setelah analisis selesai.</p>
                </div>
            )}
            {analysisResult && (
                <div className="space-y-6">
                    {analysisResult.suggestedRootCauses.map((cause, index) => (
                        <Card key={index} className="fade-in">
                            <CardHeader>
                                <CardTitle className="text-lg text-secondary">{cause}</CardTitle>
                                <div className="flex items-center gap-4 pt-2">
                                     <Badge variant="secondary">Kemungkinan: {Math.round(analysisResult.likelihoods[index] * 100)}%</Badge>
                                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className={cn('h-3 w-3 rounded-full', getConfidenceColor(analysisResult.confidenceLevels[index]))}></span>
                                        Tingkat Kepercayaan: {analysisResult.confidenceLevels[index]}
                                     </div>
                                </div>
                                <Progress value={analysisResult.likelihoods[index] * 100} className="mt-3 h-2" />
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-semibold text-secondary mb-2">Solusi yang Direkomendasikan:</h4>
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
