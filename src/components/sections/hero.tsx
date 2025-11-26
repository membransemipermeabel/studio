import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronDown, BarChart2 } from 'lucide-react';
import { LeafIcon } from '@/components/icons/leaf';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section id="hero" className="relative h-[calc(100vh-5rem)] min-h-[600px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-start justify-center text-left container mx-auto">
        <div className="max-w-3xl space-y-6">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-2 border border-primary/20">
             <div className="flex items-center gap-2">
                <LeafIcon className="w-5 h-5 text-primary" />
                <p className="font-semibold text-primary">Rantai Pasokan Beras Berkelanjutan</p>
             </div>
          </div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight text-secondary md:text-6xl lg:text-7xl">
            Buka Efisiensi dalam Rantai Pasokan Anda
          </h1>
          <p className="text-lg text-secondary/80 md:text-xl">
            PaddyFlow Insights menyediakan alat analisis canggih untuk mengoptimalkan efisiensi proses, meningkatkan pengambilan keputusan, dan mengurangi kerugian pascapanen.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#dashboard">
                <BarChart2 />
                Lihat Dasbor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-secondary/30 bg-background/50 hover:bg-background/80">
              <Link href="#background">
                <ChevronDown />
                Pelajari Lebih Lanjut
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
