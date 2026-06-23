import { useState, useMemo } from "react";
import { festivals } from "../data/festivals";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthFestivals = useMemo(() => {
    const filtered = festivals.filter(f => {
      const d = new Date(f.date);
      const monthMatch = d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
      const searchMatch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
      return monthMatch && searchMatch;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return filtered;
  }, [selectedMonth, selectedYear, searchQuery]);

  const allUpcoming = useMemo(() => {
    return festivals
      .filter(f => {
        const dateMatch = new Date(f.date) >= new Date();
        const searchMatch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
        return dateMatch && searchMatch;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [searchQuery]);

  // Calendar grid
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const festivalDates = new Set(monthFestivals.map(f => new Date(f.date).getDate()));

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold mb-2">Festival Calendar 2026</h1>
      <p className="text-sm text-muted-foreground mb-6">Auspicious days, muhurat timings, and ritual guides</p>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search festivals by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={() => setSelectedMonth(m => m > 0 ? m - 1 : 11)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="font-display text-xl font-bold">{months[selectedMonth]} {selectedYear}</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedMonth(m => m < 11 ? m + 1 : 0)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const isFestival = festivalDates.has(day);
                const isToday = day === new Date().getDate() && selectedMonth === new Date().getMonth();
                return (
                  <div
                    key={day}
                    className={`text-center py-2 rounded-lg text-sm cursor-default transition-colors
                      ${isFestival ? "gradient-saffron text-primary-foreground font-bold" : ""}
                      ${isToday && !isFestival ? "border-2 border-primary font-bold" : ""}
                      ${!isFestival && !isToday ? "hover:bg-muted" : ""}
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Month festivals */}
            {monthFestivals.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-sm">Festivals this month:</h3>
                {monthFestivals.map(f => (
                  <div key={f.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-2xl">{f.image}</span>
                    <div>
                      <p className="font-semibold text-sm">{f.name}</p>
                      <p className="text-xs text-primary">
                        {new Date(f.date).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
                        {f.muhurat && ` • ${f.muhurat}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {monthFestivals.length === 0 && (
              <p className="text-center text-muted-foreground text-sm mt-6">No festivals this month</p>
            )}
          </div>
        </div>

        {/* Upcoming Festivals List */}
        <div>
          <h3 className="font-display text-lg font-bold mb-4">Upcoming Festivals</h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {allUpcoming.map(f => (
              <motion.div
                key={f.id}
                layout
                className="rounded-xl border border-border bg-card overflow-hidden cursor-pointer"
                onClick={() => setExpandedId(expandedId === f.id ? null : f.id)}
              >
                <div className="p-4 flex items-center gap-3">
                  <span className="text-2xl">{f.image}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{f.name}</p>
                    <p className="text-xs text-primary">
                      {new Date(f.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                {expandedId === f.id && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: "auto" }}
                    className="px-4 pb-4 text-sm space-y-2"
                  >
                    <p className="text-muted-foreground">{f.description}</p>
                    <p className="font-medium">Significance:</p>
                    <p className="text-muted-foreground text-xs">{f.significance}</p>
                    {f.muhurat && <p className="text-primary font-medium text-xs">🕐 {f.muhurat}</p>}
                    <p className="font-medium">Rituals:</p>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                      {f.rituals.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
