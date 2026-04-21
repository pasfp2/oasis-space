import { GlassCard } from "./GlassCard";
import { Calendar } from "lucide-react";

export const Header = () => (
  <header className="sticky top-4 z-50 mx-4 lg:mx-8">
    <GlassCard variant="strong" className="flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center">
          <span className="font-display text-sm font-bold text-primary">F</span>
        </div>
        <div>
          <h1 className="font-display text-base font-semibold leading-none">FlowDesk</h1>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-1">Smart office</p>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-1">
        {["Карта", "Резервации", "Аналитика"].map((l, i) => (
          <button
            key={l}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              i === 0
                ? "bg-foreground/8 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </nav>
      <button className="glass rounded-full px-3 py-2 glass-hover flex items-center gap-2 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        <span>Сегодня</span>
      </button>
    </GlassCard>
  </header>
);