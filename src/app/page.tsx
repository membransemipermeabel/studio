import { Header } from '@/components/layout/header';
import { Hero } from '@/components/sections/hero';
import { Dashboard } from '@/components/sections/dashboard';
import { Analysis } from '@/components/sections/analysis';
import { Background } from '@/components/sections/background';
import { Team } from '@/components/sections/team';
import { Platform } from '@/components/sections/platform';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Dashboard />
        <Analysis />
        <Background />
        <Platform />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
