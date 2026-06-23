import { Bell, Check, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNotifications } from "../contexts/NotificationContext";
import { motion } from "framer-motion";

export default function Notifications() {
  const { notifications, markAsRead, markAllRead, deleteNotification, clearAll, unreadCount } = useNotifications();

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold flex items-center gap-2">
            <Bell className="h-7 w-7 text-primary" /> Notifications
          </h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up! 🙏"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1">
              <CheckCheck className="h-3.5 w-3.5" /> Read All
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAll} className="text-destructive gap-1">
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </Button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">🔔</p>
          <p className="text-muted-foreground">No notifications yet. Festival reminders will appear here!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border transition-all ${
                n.read ? "border-border bg-card opacity-70" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${!n.read ? "text-primary" : ""}`}>{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {new Date(n.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="flex gap-1">
                  {!n.read && (
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => markAsRead(n.id)}>
                      <Check className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteNotification(n.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
