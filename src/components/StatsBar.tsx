import { GlassCard } from "./GlassCard";
import { TrendingUp, Users, Armchair, Activity } from "lucide-react";

const stats = [
  { icon: Armchair, label: "Свободно", value: "12", total: "/ 24" },
  { icon: Users, label: "В офисе", value: "47" },
  { icon: Activity, label: "Загрузка", value: "68%" },
  { icon: TrendingUp, label: "Тренд", value: "+12%" },
];

export const StatsBar = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    {stats.map((s) => (
      <GlassCard key={s.label} hover className="p-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-foreground/[0.04] border border-border grid place-items-center">
          <s.icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
          <p className="font-display text-xl font-semibold">
            {s.value}
            {s.total && <span className="text-xs text-muted-foreground font-normal">{s.total}</span>}
          </p>
        </div>
      </GlassCard>
    ))}
  </div>
);