"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Calendar,
  Bell,
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Shield,
  RefreshCw,
  ChevronRight,
  Play,
  Sparkles,
  Users,
  BarChart3,
  Inbox,
  AlertCircle,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  {
    icon: Mail,
    title: "AI Email Prioritization",
    description:
      "Claude analyzes your inbox and surfaces what actually matters. Never miss a critical email again.",
    color: "from-blue-500 to-cyan-500",
    badge: "Powered by Claude",
  },
  {
    icon: MessageSquare,
    title: "Slack Intelligence",
    description:
      "Unified view of all your Slack channels with AI-powered summaries of key discussions.",
    color: "from-purple-500 to-pink-500",
    badge: "Real-time sync",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "AI suggests optimal meeting times based on your energy levels and workload patterns.",
    color: "from-orange-500 to-amber-500",
    badge: "Auto-schedule",
  },
  {
    icon: Sparkles,
    title: "Daily Briefings",
    description:
      "Start every morning with a personalized AI briefing of your day's priorities.",
    color: "from-green-500 to-emerald-500",
    badge: "Every morning",
  },
  {
    icon: Bell,
    title: "Push Notifications",
    description:
      "Real-time alerts for high-priority items across all your connected platforms.",
    color: "from-red-500 to-rose-500",
    badge: "Instant",
  },
  {
    icon: BarChart3,
    title: "Productivity Analytics",
    description:
      "Track your communication patterns and optimize how you spend your attention.",
    color: "from-indigo-500 to-violet-500",
    badge: "Weekly reports",
  },
];

const PRICING_PLANS = [
  {
    name: "Starter",
    price: 49,
    period: "month",
    description: "Perfect for solopreneurs getting organized",
    features: [
      "Gmail integration",
      "AI email prioritization",
      "Daily briefings",
      "Push notifications",
      "7-day history",
      "Email support",
    ],
    cta: "Start free trial",
    popular: false,
    color: "border-border",
    highlight: false,
  },
  {
    name: "Pro",
    price: 99,
    period: "month",
    description: "For startup founders who move fast",
    features: [
      "Everything in Starter",
      "Slack integration",
      "Smart scheduling",
      "Calendar sync",
      "90-day history",
      "Priority support",
      "Custom briefing time",
      "Team digest",
    ],
    cta: "Start free trial",
    popular: true,
    color: "border-blue-500",
    highlight: true,
  },
  {
    name: "Scale",
    price: 199,
    period: "month",
    description: "For managers running complex operations",
    features: [
      "Everything in Pro",
      "Multi-account Gmail",
      "Unlimited Slack workspaces",
      "Advanced analytics",
      "API access",
      "SSO & security controls",
      "Dedicated success manager",
      "Custom integrations",
    ],
    cta: "Contact sales",
    popular: false,
    color: "border-border",
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CEO, Meridian Labs",
    avatar: "SC",
    avatarColor: "from-purple-400 to-pink-400",
    quote:
      "FlowDesk cut my email time in half. Claude's prioritization is eerily accurate — it knows what needs my attention before I do.",
    metric: "50% less time on email",
  },
  {
    name: "Marcus Williams",
    role: "Founder, DevStack",
    avatar: "MW",
    avatarColor: "from-blue-400 to-cyan-400",
    quote:
      "The daily briefing feature changed how I start my mornings. I walk into every day knowing exactly what matters.",
    metric: "2hrs saved daily",
  },
  {
    name: "Priya Patel",
    role: "VP Operations, Nexus",
    avatar: "PP",
    avatarColor: "from-orange-400 to-amber-400",
    quote:
      "Managing 3 Slack workspaces and 2 email accounts was chaos. FlowDesk brings it all into one intelligent stream.",
    metric: "Zero context switching",
  },
];

const STATS = [
  { value: "12,400+", label: "Active users" },
  { value: "2.1M", label: "Emails prioritized" },
  { value: "47min", label: "Avg. time saved/day" },
  { value: "98.7%", label: "Uptime SLA" },
];

const DEMO_EMAILS = [
  {
    id: 1,
    from: "Alex Kim",
    subject: "Q4 investor deck — needs your sign-off today",
    preview: "The deck is ready for final review before the 4pm call...",
    time: "9:14 AM",
    priority: "critical",
    label: "Urgent",
  },
  {
    id: 2,
    from: "Jennifer Lau",
    subject: "Contract renewal — Acme Corp ($180k ARR)",
    preview: "They want to renew but need updated pricing by EOD...",
    time: "8:52 AM",
    priority: "high",
    label: "Revenue",
  },
  {
    id: 3,
    from: "Team Slack Digest",
    subject: "3 decisions pending in #product-roadmap",
    preview: "The team is blocked on the API authentication approach...",
    time: "8:30 AM",
    priority: "high",
    label: "Team",
  },
  {
    id: 4,
    from: "Newsletter",
    subject: "Your weekly SaaS metrics digest",
    preview: "This week in SaaS: churn rates, expansion revenue...",
    time: "7:00 AM",
    priority: "low",
    label: "FYI",
  },
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground">FlowDesk</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Testimonials
          </a>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Testimonials
              </a>
              <Link
                href="/auth/signin"
                className="text-sm font-semibold text-blue-500"
                onClick={() => setMobileOpen(false)}
              >
                Sign in →
              </Link>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-semibold px-5 py-3 rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                Get started free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DemoEmailCard({
  email,
  index,
}: {
  email: (typeof DEMO_EMAILS)[0];
  index: number;
}) {
  const priorityStyles = {
    critical:
      "bg-red-500/10 text-red-400 border border-red-500/20",
    high: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    low: "bg-muted text-muted-foreground border border-border",
  };

  const dotStyles = {
    critical: "bg-red-500",
    high: "bg-amber-500",
    low: "bg-muted-foreground/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }}
      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer group hover:border-blue-500/30 hover:bg-blue-500/5 ${
        email.priority === "low"
          ? "border-border/50 bg-muted/20 opacity-60"
          : "border-border bg-card"
      }`}
    >
      <div className="mt-1 flex-shrink-0">
        <div
          className={`w-2 h-2 rounded-full ${dotStyles[email.priority as keyof typeof dotStyles]}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-xs font-semibold text-foreground truncate">
            {email.from}
          </span>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {email.time}
          </span>
        </div>
        <p className="text-xs font-medium text-foreground/80 truncate mb-1">
          {email.subject}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {email.preview}
        </p>
      </div>
      <span
        className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
          priorityStyles[email.priority as keyof typeof priorityStyles]
        }`}
      >
        {email.label}
      </span>
    </motion.div>
  );
}

function HeroSection() {
  const [activeEmail, setActiveEmail] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEmail((prev) => (prev + 1) % DEMO_EMAILS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-violet-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10