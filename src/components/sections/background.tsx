import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat, Wind, Cog } from "lucide-react";

const backgroundPoints = [
  {
    icon: Wheat,
    title: "Panen",
    description: "Tahap awal di mana padi dikumpulkan dari sawah. Kerugian dapat terjadi karena waktu, teknik, dan kondisi cuaca, yang berdampak pada kuantitas dan kualitas.",
  },
  {
    icon: Wind,
    title: "Pengeringan",
    description: "Proses penting untuk mengurangi kadar air untuk penyimpanan. Pengeringan yang tidak tepat menyebabkan pertumbuhan jamur, kerusakan saat penggilingan, dan kerugian kuantitatif yang signifikan.",
  },
  {
    icon: Cog,
    title: "Penggilingan",
    description: "Langkah terakhir untuk mengubah gabah menjadi beras yang dapat dimakan. Mesin atau proses yang tidak efisien dapat menghasilkan hasil biji utuh yang lebih rendah, mengurangi nilai pasar.",
  },
];

export function Background() {
  return (
    <section id="background" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground mb-4">
                Konteks
            </div>
            <h2 className="font-headline text-4xl font-bold text-secondary">Memahami Kerugian Pasca Panen</h2>
            <p className="mt-4 text-lg text-secondary/70">
                Kerugian signifikan terjadi antara panen dan konsumsi. Memahami titik-titik kritis ini adalah langkah pertama untuk meningkatkan efisiensi dan keberlanjutan dalam rantai pasokan beras.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backgroundPoints.map((point) => (
                <Card key={point.title} className="text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card/50">
                    <CardHeader className="items-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                            <point.icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-secondary">{point.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-secondary/70">{point.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
