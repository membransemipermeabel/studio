import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat, Wind, Cog } from "lucide-react";

const backgroundPoints = [
  {
    icon: Wheat,
    title: "Harvesting",
    description: "The initial stage where paddy is collected from the fields. Losses can occur due to timing, technique, and weather conditions, impacting both quantity and quality.",
  },
  {
    icon: Wind,
    title: "Drying",
    description: "A critical process to reduce moisture content for storage. Improper drying leads to fungal growth, breakage during milling, and significant quantitative losses.",
  },
  {
    icon: Cog,
    title: "Milling",
    description: "The final step to convert paddy into edible rice. Inefficient machinery or processes can result in a lower yield of whole grains, reducing market value.",
  },
];

export function Background() {
  return (
    <section id="background" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground mb-4">
                Context
            </div>
            <h2 className="font-headline text-4xl font-bold text-secondary">Understanding Post-Harvest Losses</h2>
            <p className="mt-4 text-lg text-secondary/70">
                Significant losses occur between harvesting and consumption. Understanding these critical points is the first step toward improving efficiency and sustainability in the rice supply chain.
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
