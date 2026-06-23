import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { festivals } from "../data/festivals";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "festival" | "order" | "general";
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bhakti_notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
    generateFestivalReminders();
  }, []);

  useEffect(() => {
    localStorage.setItem("bhakti_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const generateFestivalReminders = () => {
    const now = new Date();
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const existing = JSON.parse(localStorage.getItem("bhakti_notifications") || "[]") as Notification[];
    const existingIds = new Set(existing.map(n => n.id));

    const newNotifications: Notification[] = [];

    festivals.forEach(f => {
      const festDate = new Date(f.date);
      const diffDays = Math.ceil((festDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays > 0 && diffDays <= 7) {
        const nId = `fest_${f.id}_${f.date}`;
        if (!existingIds.has(nId)) {
          newNotifications.push({
            id: nId,
            title: `🎉 ${f.name} in ${diffDays} day${diffDays > 1 ? "s" : ""}!`,
            message: `${f.description} ${f.muhurat ? `Muhurat: ${f.muhurat}` : ""}`,
            type: "festival",
            read: false,
            createdAt: now.toISOString(),
          });
        }
      }

      if (diffDays > 7 && diffDays <= 14) {
        const nId = `fest_upcoming_${f.id}_${f.date}`;
        if (!existingIds.has(nId)) {
          newNotifications.push({
            id: nId,
            title: `📅 ${f.name} coming up on ${new Date(f.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`,
            message: `Start preparing! ${f.rituals?.[0] || ""}`,
            type: "festival",
            read: false,
            createdAt: now.toISOString(),
          });
        }
      }
    });

    if (newNotifications.length > 0) {
      setNotifications(prev => [...newNotifications, ...prev]);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllRead, deleteNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
