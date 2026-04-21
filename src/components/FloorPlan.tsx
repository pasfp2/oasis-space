import { cn } from "@/lib/utils";
import { Monitor, Users, Wifi, Coffee } from "lucide-react";

export type DeskStatus = "available" | "reserved" | "occupied" | "mine";

export interface Desk {
  id: string;
  label: string;
  x: number;
  y: number;
  status: DeskStatus;
  features: ("monitor" | "wifi" | "quiet")[];
}

interface FloorPlanProps {
  desks: Desk[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusStyles: Record<DeskStatus, string> = {
  available: "bg-foreground/[0.04] border-border text-muted-foreground hover:border-primary/60 hover:text-foreground",
  reserved: "bg-foreground/[0.03] border-border/60 text-muted-foreground/70",
  occupied: "bg-foreground/[0.02] border-border/40 text-muted-foreground/40 cursor-not-allowed",
  mine: "bg-primary/15 border-primary/70 text-primary",
};

export const FloorPlan = ({ desks, selectedId, onSelect }: FloorPlanProps) => {
  return (
    <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden glass-strong p-6">
      {/* Subtle ambient blob */}
      <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Zone labels */}
      <div className="absolute top-6 left-6 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        Open Space · 4 этаж
      </div>
      <div className="absolute top-6 right-6 glass rounded-full px-3 py-1.5 flex items-center gap-2 text-xs">
        <Coffee className="h-3 w-3 text-muted-foreground" />
        <span className="text-muted-foreground">Кухня рядом</span>
      </div>

      {/* Meeting room block */}
      <div className="absolute glass rounded-2xl border-dashed border-border/60" style={{ left: "5%", top: "55%", width: "25%", height: "35%" }}>
        <div className="p-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Переговорка</p>
          <p className="font-display text-sm">Aurora</p>
        </div>
      </div>

      {/* Desks */}
      {desks.map((desk) => {
        const isSelected = selectedId === desk.id;
        const disabled = desk.status === "occupied";
        return (
          <button
            key={desk.id}
            disabled={disabled}
            onClick={() => onSelect(desk.id)}
            style={{ left: `${desk.x}%`, top: `${desk.y}%` }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-xl border backdrop-blur-md transition-all duration-200 grid place-items-center",
              statusStyles[desk.status],
              isSelected && "scale-110 ring-2 ring-primary/60 ring-offset-2 ring-offset-background z-10"
            )}
          >
            <span className="font-display text-xs font-bold">{desk.label}</span>
            {isSelected && (
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 glass-strong rounded-lg px-2 py-1 text-[10px] whitespace-nowrap text-foreground">
                {desk.label}
              </span>
            )}
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 flex items-center gap-4 text-xs">
        {[
          { c: "bg-muted-foreground/40 border border-border", l: "Свободно" },
          { c: "bg-muted-foreground/20 border border-border/60", l: "Резерв" },
          { c: "bg-muted-foreground/10 border border-border/40", l: "Занято" },
          { c: "bg-primary border border-primary", l: "Моё" },
        ].map((s) => (
          <div key={s.l} className="flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-full", s.c)} />
            <span className="text-muted-foreground">{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};