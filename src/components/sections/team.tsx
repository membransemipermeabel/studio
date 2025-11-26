import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const teamMembers = [
  {
    id: "team-member-1",
    name: "Dr. Alistair Finch",
    role: "Ilmuwan Data Utama",
    description: "Ahli dalam analisis data pertanian dan pemodelan prediktif, mendorong wawasan bertenaga AI dari platform kami.",
  },
  {
    id: "team-member-2",
    name: "Dr. Lena Petrova",
    role: "Analis Rantai Pasokan",
    description: "Spesialisasi dalam logistik dan optimisasi proses, memastikan model kami mencerminkan dinamika rantai pasokan dunia nyata.",
  },
  {
    id: "team-member-3",
    name: "Kenji Tanaka",
    role: "Insinyur Perangkat Lunak Utama",
    description: "Merancang dan membangun platform yang kuat dan dapat diskalakan yang memberikan analitik dan visualisasi kami.",
  },
];

export function Team() {
  return (
    <section id="team" className="py-16 md:py-24 bg-background scroll-mt-20">
        <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-headline text-4xl font-bold text-secondary">Temui Tim Kami</h2>
                <p className="mt-4 text-lg text-secondary/70">
                    Kelompok ahli yang berdedikasi dalam ilmu data, manajemen rantai pasokan, dan rekayasa perangkat lunak.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => {
                    const memberImage = PlaceHolderImages.find((img) => img.id === member.id);
                    return (
                        <Card key={member.name} className="text-center border-0 shadow-none bg-transparent">
                            <CardHeader className="items-center p-2">
                                <Avatar className="h-32 w-32 border-4 border-accent/20">
                                    {memberImage && <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint} />}
                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-xl text-secondary">{member.name}</CardTitle>
                                <p className="text-accent font-semibold mt-1">{member.role}</p>
                                <p className="text-secondary/60 mt-3 text-sm">{member.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    </section>
  );
}
