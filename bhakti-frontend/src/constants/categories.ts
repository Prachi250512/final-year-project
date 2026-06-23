export type Category = {
  id: string
  name: string
  icon: string
  description?: string
}

export const categories: Category[] = [
  { id: "agarbatti", name: "Agarbatti", icon: "🪄" },
  { id: "kapoor", name: "Kapoor", icon: "⚪" },
  { id: "dhoop", name: "Dhoop", icon: "🟤" },
  { id: "oil", name: "Oil", icon: "🪔" },
  { id: "kumkum", name: "Kumkum & Sindoor", icon: "🔴" },
  { id: "kits", name: "Pooja Kits", icon: "🕉️" }
]