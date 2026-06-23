import { useState } from "react";
import { aartis } from "../data/aartis";
import { quotes } from "../data/quotes";
import { motion } from "framer-motion";
import { BookOpen, Quote as QuoteIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function Devotional() {
  const [expandedAarti, setExpandedAarti] = useState<string | null>(null);
  const [lang, setLang] = useState<"hindi" | "english">("hindi");
  const [quoteFilter, setQuoteFilter] = useState<"all" | "shloka" | "mantra" | "wisdom">("all");

  const filteredQuotes = quoteFilter === "all" ? quotes : quotes.filter(q => q.category === quoteFilter);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold mb-2">Devotional Content</h1>
      <p className="text-sm text-muted-foreground mb-6">Aartis, bhajans, mantras, and spiritual wisdom</p>

      <Tabs defaultValue="aartis">
        <TabsList className="mb-6">
          <TabsTrigger value="aartis" className="gap-1"><BookOpen className="h-3.5 w-3.5" /> Aartis</TabsTrigger>
          <TabsTrigger value="quotes" className="gap-1"><QuoteIcon className="h-3.5 w-3.5" /> Quotes & Mantras</TabsTrigger>
        </TabsList>

        <TabsContent value="aartis">
          <div className="flex gap-2 mb-6">
            <Button size="sm" variant={lang === "hindi" ? "default" : "outline"} onClick={() => setLang("hindi")}
              className={lang === "hindi" ? "gradient-saffron text-primary-foreground border-0" : ""}>
              हिन्दी
            </Button>
            <Button size="sm" variant={lang === "english" ? "default" : "outline"} onClick={() => setLang("english")}
              className={lang === "english" ? "gradient-saffron text-primary-foreground border-0" : ""}>
              English
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aartis.map(a => (
              <motion.div
                key={a.id}
                layout
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setExpandedAarti(expandedAarti === a.id ? null : a.id)}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="text-3xl">{a.image}</span>
                  <div>
                    <h3 className="font-display font-semibold">{a.name}</h3>
                    <p className="text-xs text-primary">{a.deity}</p>
                  </div>
                </button>
                {expandedAarti === a.id && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: "auto" }}
                    className="px-4 pb-4"
                  >
                    <div className="bg-muted/50 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed">
                        {lang === "hindi" ? a.lyricsHindi : a.lyricsEnglish}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quotes">
          <div className="flex gap-2 mb-6 flex-wrap">
            {(["all", "shloka", "mantra", "wisdom"] as const).map(f => (
              <Button
                key={f}
                size="sm"
                variant={quoteFilter === f ? "default" : "outline"}
                onClick={() => setQuoteFilter(f)}
                className={quoteFilter === f ? "gradient-saffron text-primary-foreground border-0" : ""}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuotes.map(q => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <p className="font-display text-sm italic leading-relaxed mb-3">"{q.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">— {q.source}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium capitalize">{q.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
