import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChartHorizontal } from "lucide-react";

export function Dashboard() {
  return (
    <section id="dashboard" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-secondary">Dasbor Analitik</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary/70">
                Visualisasikan indikator kinerja utama dan lacak aliran massa rantai pasokan beras secara real-time.
            </p>
        </div>
        
        <Card className="overflow-hidden shadow-2xl shadow-primary/5 border-primary/10">
            <CardHeader className="bg-muted/50 border-b">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <BarChartHorizontal className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="text-secondary">Laporan Langsung PaddyFlow</CardTitle>
                        <CardDescription>Power BI tersemat untuk eksplorasi data interaktif.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-2 md:p-4">
                 <div className="aspect-video w-full overflow-hidden rounded-lg border">
                    <iframe
                        title="PaddyFlow Insights Power BI Report"
                        className="h-full w-full"
                        src="https://app.powerbi.com/view?r=eyJrIjoiN2Y0MGE3MzYtYjA2Mi00YmY4LWI4YTgtYjY1MGFkYjFlMWQ2IiwidCI6IjY3OTU3ZjE0LWE2YjItNGQwNy05YjYwLTgwMjM5NDYxYmM5OCIsImMiOjl9"
                        frameBorder="0"
                        allowFullScreen={true}
                    ></iframe>
                </div>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
