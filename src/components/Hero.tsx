"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Calendar,
  Bell,
  Zap,
  ArrowRight,
  CheckCircle,
  Play,
  Sparkles,
  Star,
  TrendingUp,
  Clock,
  Shield,
  ChevronRight,
  Inbox,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Emails Prioritized", value: "2.4M+", icon: Mail },
  { label: "Hours Saved Weekly", value: "12h", icon: Clock },
  { label: "Active Users", value: "8,200+", icon: TrendingUp },
  { label: "Uptime SLA", value: "99.9%", icon: Shield },
];

const NOTIFICATION_DEMOS = [
  {
    id: 1,
    type: "email",
    icon: Mail,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "High Priority: Q4 Budget Review",
    subtitle: "From: Sarah Chen · CEO",
    time: "Just now",
    badge: "Urgent",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  {
    id: 2,
    type: "slack",
    icon: MessageSquare,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    title: "Daily Briefing Ready",
    subtitle: "3 action items · 2 meetings today",
    time: "2m ago",
    badge: "AI Summary",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    id: 3,
    type: "calendar",
    icon: Calendar,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    title: "Meeting Scheduled: Investor Call",
    subtitle: "Tomorrow at 2:00 PM · Zoom",
    time: "5m ago",
    badge: "Auto-scheduled",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
];

const INTEGRATIONS = [
  { name: "Gmail", icon: Mail, color: "text-red-400", bg: "bg-red-500/10" },
  { name: "Slack", icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-500/10" },
  { name: "Calendar", icon: Calendar, color: "text-blue-400", bg: "bg-blue-500/10" },
];

const TRUST_BADGES = [
  "SOC 2 Compliant",
  "GDPR Ready",
  "256-bit Encryption",
];

function FloatingNotification({
  notification,
  delay,
}: {
  notification: (typeof NOTIFICATION_DEMOS)[0];
  delay: number;
}) {
  const Icon = notification.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`flex items-start gap-3 p-3.5 rounded-xl border ${notification.border} ${notification.bg} backdrop-blur-sm`}
    >
      <div className={`p-2 rounded-lg ${notification.bg} border ${notification.border} flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${notification.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold text-white truncate">{notification.title}</p>
        </div>
        <p className="text-xs text-slate-400 truncate">{notification.subtitle}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${notification.badgeColor}`}>
            {notification.badge}
          </span>
          <span className="text-xs text-slate-500">{notification.time}</span>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Inbox", "Briefing", "Calendar"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-2xl" />

      {/* Main dashboard card */}
      <div className="relative bg-slate-900/90 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/60 bg-slate-800/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-slate-700/50 rounded-md px-3 py-1 text-xs text-slate-400 font-mono w-fit mx-auto">
              app.jeveren.io/dashboard
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400">Live</span>
          </div>
        </div>

        {/* Dashboard header */}
        <div className="px-5 py-4 border-b border-slate-700/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Good morning,</p>
              <h3 className="text-sm font-bold text-white">Alex Johnson</h3>
            </div>
            <div className="flex items-center gap-2">
              {INTEGRATIONS.map((integration) => {
                const Icon = integration.icon;
                return (
                  <div
                    key={integration.name}
                    className={`p-1.5 rounded-lg ${integration.bg} border border-slate-700/40`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${integration.color}`} />
                  </div>
                );
              })}
              <div className="flex items-center gap-1 ml-2 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Synced</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === i
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 space-y-2.5 min-h-[200px]">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="inbox"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                {[
                  { from: "Sarah Chen", subject: "Q4 Budget Review", priority: "high", time: "2m" },
                  { from: "Mark Williams", subject: "Product Roadmap Update", priority: "medium", time: "15m" },
                  { from: "Newsletter", subject: "Weekly Digest", priority: "low", time: "1h" },
                ].map((email, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/30"
                  >
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        email.priority === "high"
                          ? "bg-red-400"
                          : email.priority === "medium"
                          ? "bg-yellow-400"
                          : "bg-slate-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{email.from}</p>
                      <p className="text-xs text-slate-400 truncate">{email.subject}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-slate-500">{email.time}</span>
                      {email.priority === "high" && (
                        <span className="text-xs px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded border border-red-500/30">
                          AI: Urgent
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            {activeTab === 1 && (
              <motion.div
                key="briefing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2.5"
              >
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  <p className="text-xs text-slate-300">
                    <span className="font-semibold text-violet-300">AI Briefing</span> — 3 urgent emails, 2 meetings, 1 decision needed
                  </p>
                </div>
                {[
                  { label: "Reply to Sarah about budget", done: false },
                  { label: "Review product roadmap doc", done: false },
                  { label: "Investor call prep complete", done: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/30">
                    <CheckCircle
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        item.done ? "text-emerald-400" : "text-slate-600"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        item.done ? "text-slate-500 line-through" : "text-slate-300"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
            {activeTab === 2 && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                {[
                  { time: "10:00 AM", title: "Team Standup", type: "Recurring", color: "bg-blue-500" },
                  { time: "2:00 PM", title: "Investor Call", type: "Auto-scheduled", color: "bg-emerald-500" },
                  { time: "4:30 PM", title: "1:1 with Mark", type: "Slack invite", color: "bg-purple-500" },
                ].map((event, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/30">
                    <div className={`w-1 h-10 rounded-full ${event.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white">{event.title}</p>
                      <p className="text-xs text-slate-400">{event.time}</p>
                    </div>
                    <span className="text-xs px-1.5 py-0.5 bg-slate-700/50 text-slate-400 rounded border border-slate-600/30">
                      {event.type}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom status bar */}
        <div className="px-4 py-2.5 border-t border-slate-700/40 bg-slate-800/30 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs