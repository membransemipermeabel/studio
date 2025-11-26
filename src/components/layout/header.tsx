'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { LeafIcon } from '@/components/icons/leaf';

const navItems = [
  { href: '#dashboard', label: 'Dasbor' },
  { href: '#analysis', label: 'Analisis' },
  { href: '#background', label: 'Latar Belakang' },
  { href: '#platform', label: 'Platform' },
  { href: '#team', label: 'Tim' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = navItems.map((item) => document.querySelector(item.href));
      let currentSection = '';

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (window.scrollY >= sectionTop - 120) { // Adjusted offset
            currentSection = `#${section.id}`;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={() => setIsMobileMenuOpen(false)}
      className={cn(
        'rounded-md px-3 py-2 text-sm font-medium transition-colors',
        activeSection === href
          ? 'bg-primary/10 text-primary'
          : 'text-secondary/80 hover:text-secondary'
      )}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/60 bg-background/80 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LeafIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-secondary">PaddyFlow Insights</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-secondary" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <LeafIcon className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold text-secondary">PaddyFlow</span>
                  </Link>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon">
                       <X className="h-6 w-6" />
                       <span className="sr-only">Tutup menu</span>
                     </Button>
                  </SheetTrigger>
                </div>
                <nav className="mt-6 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'rounded-lg p-3 text-lg font-medium transition-colors',
                         activeSection === item.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-secondary/90 hover:bg-muted'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
