import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-background/50 border-b border-border/50">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
          <span className="font-clash font-bold text-xl tracking-tight">hibeats</span>
        </div>
        <Button size="lg" className="font-clash font-semibold">
          Launch App
        </Button>
      </nav>
    </header>
  );
};

export default Header;
