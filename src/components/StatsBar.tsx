import { GlassCard } from "./GlassCard";
import { TrendingUp, Users, Armchair, Activity } from "lucide-react";

const stats = [
  { icon: Armchair, label: "Свободно", value: "12", total: "/ 24", color: "text-success" },
  { icon: Users, label: "В офисе", value: "47", color: "text-primary" },
  { icon: Activity, label: "Загрузка", value: "68%", color: "text-accent" },
  { icon: TrendingUp, label: "Тренд", value: "+12%", color: "text-secondary" },
];

export const StatsBar = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    {stats.map((s) => (
      <GlassCard key={s.label} hover className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl glass grid place-items-center">
          <s.icon className={`h-4 w-4 ${s.color}`} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
          <p className="font-display text-xl font-bold">
            {s.value}
            {s.total && <span className="text-xs text-muted-foreground font-normal">{s.total}</span>}
          </p>
        </div>
      </GlassCard>
    ))}
  </div>
);