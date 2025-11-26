import { LeafIcon } from "@/components/icons/leaf";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <LeafIcon className="h-5 w-5 text-secondary/70" />
                <span className="text-sm font-medium text-secondary/70">PaddyFlow Insights</span>
            </div>
            <p className="text-sm text-secondary/60">
                &copy; {currentYear} PaddyFlow Insights. Hak cipta dilindungi.
            </p>
        </div>
      </div>
    </footer>
  );
}
