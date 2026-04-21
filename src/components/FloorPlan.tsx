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
  available: "bg-success/20 border-success/60 text-success hover:bg-success/30",
  reserved: "bg-warning/15 border-warning/50 text-warning/90",
  occupied: "bg-destructive/15 border-destructive/50 text-destructive/80 cursor-not-allowed",
  mine: "bg-gradient-to-br from-primary/40 to-secondary/40 border-primary text-primary-foreground animate-pulse-glow",
};

export const FloorPlan = ({ desks, selectedId, onSelect }: FloorPlanProps) => {
  return (
    <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden glass-strong p-6">
      {/* Animated blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
      <div className="absolute top-1/3 left-1/2 h-60 w-60 rounded-full bg-secondary/20 blur-3xl animate-blob" style={{ animationDelay: "10s" }} />

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
        <Coffee className="h-3 w-3 text-accent" />
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
              "absolute -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-2xl border backdrop-blur-md transition-all duration-300 grid place-items-center group",
              statusStyles[desk.status],
              isSelected && "scale-125 ring-2 ring-primary ring-offset-2 ring-offset-background z-10"
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
          { c: "bg-success", l: "Свободно" },
          { c: "bg-warning", l: "Резерв" },
          { c: "bg-destructive", l: "Занято" },
          { c: "bg-gradient-to-r from-primary to-secondary", l: "Моё" },
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