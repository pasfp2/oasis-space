import { GlassCard } from "./GlassCard";
import { Sparkles, Calendar, User } from "lucide-react";

export const Header = () => (
  <header className="sticky top-4 z-50 mx-4 lg:mx-8">
    <GlassCard variant="strong" className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center glow-primary">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold leading-none">FlowDesk</h1>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Smart office</p>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-1 glass rounded-full px-1.5 py-1.5">
        {["Карта", "Резервации", "Аналитика"].map((l, i) => (
          <button
            key={l}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              i === 0 ? "bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <button className="glass rounded-full p-2.5 glass-hover">
          <Calendar className="h-4 w-4" />
        </button>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-secondary grid place-items-center text-sm font-semibold">
          <User className="h-4 w-4" />
        </div>
      </div>
    </GlassCard>
  </header>
);