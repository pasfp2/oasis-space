import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { FloorPlan, type Desk } from "@/components/FloorPlan";
import { BookingPanel, MyReservations } from "@/components/BookingPanel";
import { StatsBar } from "@/components/StatsBar";
import { toast } from "sonner";

const initialDesks: Desk[] = [
  { id: "d1", label: "A1", x: 40, y: 18, status: "available", features: ["monitor", "wifi"] },
  { id: "d2", label: "A2", x: 50, y: 18, status: "available", features: ["monitor"] },
  { id: "d3", label: "A3", x: 60, y: 18, status: "occupied", features: ["monitor"] },
  { id: "d4", label: "A4", x: 70, y: 18, status: "available", features: ["wifi"] },
  { id: "d5", label: "A5", x: 80, y: 18, status: "reserved", features: ["monitor"] },
  { id: "d6", label: "B1", x: 40, y: 35, status: "available", features: ["quiet"] },
  { id: "d7", label: "B2", x: 50, y: 35, status: "occupied", features: ["monitor"] },
  { id: "d8", label: "B3", x: 60, y: 35, status: "available", features: ["monitor", "wifi"] },
  { id: "d9", label: "B4", x: 70, y: 35, status: "available", features: ["monitor"] },
  { id: "d10", label: "B5", x: 80, y: 35, status: "available", features: ["wifi"] },
  { id: "d11", label: "C1", x: 50, y: 70, status: "reserved", features: ["monitor"] },
  { id: "d12", label: "C2", x: 60, y: 70, status: "available", features: ["quiet"] },
  { id: "d13", label: "C3", x: 70, y: 70, status: "available", features: ["monitor"] },
  { id: "d14", label: "C4", x: 80, y: 70, status: "occupied", features: ["monitor"] },
  { id: "d15", label: "C5", x: 90, y: 70, status: "available", features: ["wifi"] },
  { id: "d16", label: "D1", x: 50, y: 88, status: "available", features: ["monitor"] },
  { id: "d17", label: "D2", x: 60, y: 88, status: "available", features: ["monitor"] },
  { id: "d18", label: "D3", x: 70, y: 88, status: "available", features: ["wifi"] },
];

interface Reservation {
  id: string;
  deskId: string;
  deskLabel: string;
  date: string;
  time: string;
}

const Index = () => {
  const [desks, setDesks] = useState(initialDesks);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const selected = useMemo(() => desks.find((d) => d.id === selectedId) ?? null, [desks, selectedId]);

  const reserve = (id: string) => {
    const desk = desks.find((d) => d.id === id);
    if (!desk || desk.status === "occupied") return;
    setDesks((prev) => prev.map((d) => (d.id === id ? { ...d, status: "mine" } : d)));
    setReservations((prev) => [
      ...prev,
      { id: crypto.randomUUID(), deskId: id, deskLabel: desk.label, date: "Сегодня", time: "09:00–18:00" },
    ]);
    setSelectedId(null);
  };

  const release = (resId: string) => {
    const r = reservations.find((x) => x.id === resId);
    if (!r) return;
    setReservations((prev) => prev.filter((x) => x.id !== resId));
    setDesks((prev) => prev.map((d) => (d.id === r.deskId ? { ...d, status: "available" } : d)));
  };

  const autoPick = () => {
    const free = desks.filter((d) => d.status === "available");
    if (!free.length) return toast.error("Свободных мест нет");
    const pick = free[Math.floor(Math.random() * free.length)];
    setSelectedId(pick.id);
    toast.success(`AI подобрал место ${pick.label}`, { description: "Лучшее по фильтрам и загрузке" });
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      <main className="px-4 lg:px-8 mt-8 max-w-[1600px] mx-auto space-y-6">
        {/* Hero */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              Гибкие рабочие места · Live
            </p>
            <h1 className="font-display text-4xl lg:text-6xl font-bold leading-[1.05]">
              Найди своё <span className="text-gradient">идеальное</span><br />место за секунды
            </h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Бронируйте стол вручную на карте офиса или доверьте выбор AI — он учтёт ваши предпочтения,
            ближайших коллег и загрузку зон.
          </p>
        </section>

        <StatsBar />

        <section className="grid lg:grid-cols-[1fr_400px] gap-6">
          <FloorPlan desks={desks} selectedId={selectedId} onSelect={setSelectedId} />
          <div className="space-y-6">
            <BookingPanel desk={selected} onReserve={reserve} onAutoPick={autoPick} />
            <MyReservations reservations={reservations} onRelease={release} />
          </div>
        </section>

        <footer className="pt-8 text-center text-xs text-muted-foreground">
          FlowDesk · Powered by Liquid Glass UI
        </footer>
      </main>
    </div>
  );
};

export default Index;
