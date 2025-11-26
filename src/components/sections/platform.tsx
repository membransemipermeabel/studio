import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  "Visualisasi aliran massa di semua tahap.",
  "Pelacakan KPI real-time untuk wawasan langsung.",
  "Analisis akar penyebab bertenaga AI untuk pengurangan kerugian.",
  "Dukungan pengambilan keputusan berbasis data.",
];

export function Platform() {
  const platformImage = PlaceHolderImages.find((img) => img.id === 'platform-overview');

  return (
    <section id="platform" className="py-16 md:py-24 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                Platform Kami
            </div>
            <h2 className="font-headline text-4xl font-bold text-secondary">Alat untuk Efisiensi dan Pertumbuhan</h2>
            <p className="text-lg text-secondary/70">
                PaddyFlow Insights dirancang untuk menjadi pusat analisis dan peningkatan rantai pasokan beras Anda. Kami mengubah data kompleks menjadi wawasan yang jelas dan dapat ditindaklanjuti.
            </p>
            <ul className="space-y-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                        <span className="text-secondary/80">{feature}</span>
                    </li>
                ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
             {platformImage && (
                <Image
                    src={platformImage.imageUrl}
                    alt={platformImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={platformImage.imageHint}
                />
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
