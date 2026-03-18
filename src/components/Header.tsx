"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  MessageSquare,
  Calendar,
  Bell,
  Zap,
  Menu,
  X,
  ChevronDown,
  Settings,
  LogOut,
  User,
  BarChart3,
  Sparkles,
  CreditCard,
  HelpCircle,
  Shield,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  {
    label: "Integrations",
    children: [
      {
        href: "/integrations/gmail",
        label: "Gmail",
        icon: Mail,
        description: "Sync and prioritize emails",
        badge: null,
      },
      {
        href: "/integrations/slack",
        label: "Slack",
        icon: MessageSquare,
        description: "Unified message hub",
        badge: "Premium",
      },
      {
        href: "/integrations/calendar",
        label: "Calendar",
        icon: Calendar,
        description: "Smart meeting scheduler",
        badge: null,
      },
    ],
  },
  { href: "/briefings", label: "Briefings" },
  { href: "/analytics", label: "Analytics" },
  { href: "/pricing", label: "Pricing" },
];

const MOCK_USER = {
  name: "Alex Johnson",
  email: "alex@startup.io",
  plan: "Pro",
  avatar: null,
  notifications: 4,
};

interface NavDropdownProps {
  label: string;
  children: {
    href: string;
    label: string;
    icon: React.ElementType;
    description: string;
    badge: string | null;
  }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function NavDropdown({ label, children, isOpen, onToggle, onClose }: NavDropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={onClose} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden"
            >
              <div className="p-2">
                {children.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 dark:group-hover:bg-violet-800/40 transition-colors">
                        <Icon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 p-3">
                <Link
                  href="/integrations"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5" />
                  View all integrations
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

interface UserMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isLoggedIn: boolean;
}

function UserMenu({ isOpen, onToggle, onClose, isLoggedIn }: UserMenuProps) {
  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors px-3 py-2"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="text-sm font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
        >
          Get started
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
          {MOCK_USER.name.charAt(0)}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
            {MOCK_USER.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
            {MOCK_USER.plan} plan
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 hidden lg:block ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={onClose} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {MOCK_USER.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {MOCK_USER.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{MOCK_USER.email}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 px-2 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-900/20">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                  <span className="text-xs font-medium text-violet-700 dark:text-violet-300">
                    {MOCK_USER.plan} Plan — Active
                  </span>
                </div>
              </div>

              <div className="p-2">
                {[
                  { href: "/profile", icon: User, label: "Profile" },
                  { href: "/dashboard", icon: BarChart3, label: "Dashboard" },
                  { href: "/settings", icon: Settings, label: "Settings" },
                  { href: "/billing", icon: CreditCard, label: "Billing" },
                  { href: "/help", icon: HelpCircle, label: "Help & Support" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="p-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={onClose}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

interface NotificationBadgeProps {
  count: number;
}

function NotificationBadge({ count }: NotificationBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const MOCK_NOTIFICATIONS = [
    {
      id: 1,
      type: "email",
      icon: Mail,
      title: "3 high-priority emails",
      body: "From investors & partners",
      time: "2m ago",
      color: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-900/30",
    },
    {
      id: 2,
      type: "meeting",
      icon: Calendar,
      title: "Meeting in 15 minutes",
      body: "Q3 Review with Sarah Chen",
      time: "10m ago",
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 3,
      type: "slack",
      icon: MessageSquare,
      title: "New Slack mention",
      body: "@alex in #product-updates",
      time: "24m ago",
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 4,
      type: "briefing",
      icon: Sparkles,
      title: "Daily briefing ready",
      body: "Your AI summary for today",
      time: "1h ago",
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-