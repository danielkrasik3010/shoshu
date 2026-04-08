import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full bg-background">
      <Separator className="bg-border/50" />
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-6">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            <span className="font-semibold text-foreground">Shosu</span>
            {" · "}Built for Israel&apos;s earliest startups
          </p>
          <a
            href="mailto:hello@shosu.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            hello@shosu.com
          </a>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
          Made with love ❤️ by{" "}
          <span className="font-medium text-foreground">Symbol VC</span>
        </p>
      </div>
    </footer>
  );
}
