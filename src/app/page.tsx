"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  BookOpen,
  Users,
  Compass,
  Bookmark,
  TrendingUp,
  ArrowRight,
  Code,
  FileText,
  Heart,
  MessageSquare,
  Share2,
  ChevronRight,
  Flame,
  X,
  CheckCircle2,
  Layers,
  Award,
  Globe,
  PenTool,
  ShieldCheck,
  BarChart3,
  UserPlus,
  FileCode2,
  Image as ImageIcon,
  PillIcon,
  Quote
} from "lucide-react";

/* ==========================================================================
   UTILITY & TYPES
   ========================================================================== */

const cn = (...args: Array<string | false | null | undefined>): string =>
  args.filter(Boolean).join(" ");

export type VerificationType = "GOLD" | "PURPLE" | "BLUE" | "NONE";

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: VerificationType;
  };
  readingTime: string;
  date: string;
  reactions: number;
  image: string;
  featured?: boolean;
}

export interface Author {
  handle: string;
  name: string;
  avatar: string;
  verified: VerificationType;
  bio: string;
  followers: string;
  role: string;
}

export interface Collection {
  slug: string;
  title: string;
  itemCount: string;
  image: string;
  category: string;
}

export interface Community {
  slug: string;
  name: string;
  description: string;
  members: string;
  icon: string;
  tag: string;
}

/* ==========================================================================
   SLIDESHOW & AVATAR FLOATING DATA
   ========================================================================== */

const HERO_CREATORS = [
  {
    id: 1,
    name: "Dr. Elena Rostova",
    role: "Cognitive Linguist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    position: "top-4 left-6 sm:top-8 sm:left-12",
    badge: "Linguistics",
  },
  {
    id: 2,
    name: "Alex Rivera",
    role: "Full-Stack Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    position: "top-10 right-6 sm:top-12 sm:right-16",
    badge: "Next.js",
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "UI/UX System Lead",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    position: "bottom-12 left-8 sm:bottom-16 sm:left-20",
    badge: "Design",
  },
  {
    id: 4,
    name: "David K. Chen",
    role: "AI Research Fellow",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    position: "bottom-6 right-8 sm:bottom-10 sm:right-24",
    badge: "Research",
  },
];

const HERO_SLIDES = [
  {
    id: "slide-1",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1600&auto=format&fit=crop",
    title: "Deep Qualitative Analysis & Critical Discourse",
    category: "RESEARCH & DISCOURSE",
    author: "Dr. Elena Rostova",
    readingTime: "7 min read",
  },
  {
    id: "slide-2",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    title: "Full-Stack Web Architecture & Prisma Schemas",
    category: "ENGINEERING",
    author: "Alex Rivera",
    readingTime: "5 min read",
  },
  {
    id: "slide-3",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop",
    title: "Editorial Design Systems & Motion Micro-Interactions",
    category: "UI/UX DESIGN",
    author: "Sarah Chen",
    readingTime: "4 min read",
  },
  {
    id: "slide-4",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    title: "Large Language Models & Cognitive Thought Models",
    category: "ARTIFICIAL INTELLIGENCE",
    author: "David K. Chen",
    readingTime: "8 min read",
  },
  {
    id: "slide-5",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop",
    title: "Publishing Digital Products with Studio.Ade Methodology",
    category: "PRODUCTIVITY",
    author: "Studio.Ade",
    readingTime: "6 min read",
  },
  {
    id: "slide-6",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
    title: "Modern Educational Platforms & Student Analytics",
    category: "ACADEMICS",
    author: "Akademix Team",
    readingTime: "5 min read",
  },
];

/* ==========================================================================
   FEATURED & TRENDING ARTICLES DATA
   ========================================================================== */

const FEATURED_MAIN_ARTICLE: Article = {
  slug: "van-dijk-cda-social-media-health-tips",
  title: "Teun van Dijk’s Socio-Cognitive Framework in Digital Health Discourse",
  category: "Linguistics & CDA",
  excerpt: "Evaluating ideological power, authority markers, and text-based framing in viral social media health advice before empirical verification occurs.",
  author: {
    name: "Dr. Elena Rostova",
    handle: "elena_discourse",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    verified: "PURPLE",
  },
  readingTime: "7 min read",
  date: "Aug 6, 2026",
  reactions: 1420,
  image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1000&auto=format&fit=crop&q=80",
};

const FEATURED_SIDE_ARTICLES: Article[] = [
  {
    slug: "nextjs-prisma-token-verification-routes",
    title: "Architecting Token Verification Routes in Next.js & Prisma ORM",
    category: "Full-Stack Dev",
    excerpt: "Building asynchronous email registration handlers and Prisma token validation actions.",
    author: {
      name: "Studio.Ade",
      handle: "studio_ade",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      verified: "GOLD",
    },
    readingTime: "5 min read",
    date: "Aug 5, 2026",
    reactions: 980,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "designing-fluid-motion-tokens-framer",
    title: "Designing Weightless Motion Systems with Framer Motion Physics",
    category: "UI/UX Design",
    excerpt: "Creating spring physics micro-interactions that communicate state without reader distraction.",
    author: {
      name: "Sarah Chen",
      handle: "sarah_ui",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
      verified: "BLUE",
    },
    readingTime: "4 min read",
    date: "Aug 3, 2026",
    reactions: 710,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
  },
];

const TRENDING_ARTICLES: Article[] = [
  {
    slug: "ai-cognitive-models-and-human-learning",
    title: "How Cognitive Models Drive Natural Language Understanding in AI",
    category: "AI & Learning",
    excerpt: "Examining semantic networks and human cognition parallels in recent transformer models.",
    author: {
      name: "David K. Chen",
      handle: "dchen_ai",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
      verified: "BLUE",
    },
    readingTime: "6 min read",
    date: "Aug 7, 2026",
    reactions: 1890,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "building-akademix-course-portal-architecture",
    title: "Building Akademix: Course Materials & Past Question Search Portals",
    category: "Education Tech",
    excerpt: "Lessons learned scaling university learning portals with clean responsive UI/UX.",
    author: {
      name: "Aminu Ibrahim",
      handle: "aminu_tech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      verified: "GOLD",
    },
    readingTime: "5 min read",
    date: "Aug 4, 2026",
    reactions: 1120,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "startup-product-studio-playbook-2026",
    title: "The Product Studio Playbook: From Design System to Live Code",
    category: "Startups",
    excerpt: "How small creative studios deliver enterprise-grade digital products at high velocity.",
    author: {
      name: "Adebayo Studio",
      handle: "studio_ade",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      verified: "GOLD",
    },
    readingTime: "8 min read",
    date: "Aug 2, 2026",
    reactions: 2340,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
  },
];

/* ==========================================================================
   TOPICS, AUTHORS, COLLECTIONS, COMMUNITIES DATA
   ========================================================================== */

const TOPICS_LIST = [
  { name: "AI", slug: "ai", icon: Sparkles, count: "2.4k articles" },
  { name: "Technology", slug: "technology", icon: Globe, count: "4.1k articles" },
  { name: "Programming", slug: "programming", icon: Code, count: "3.8k articles" },
  { name: "Business", slug: "business", icon: TrendingUp, count: "1.9k articles" },
  { name: "Startups", slug: "startups", icon: Flame, count: "1.2k articles" },
  { name: "Design", slug: "design", icon: PenTool, count: "2.8k articles" },
  { name: "Science", slug: "science", icon: BookOpen, count: "950 articles" },
  { name: "Education", slug: "education", icon: Award, count: "1.5k articles" },
  { name: "Finance", slug: "finance", icon: BarChart3, count: "890 articles" },
  { name: "Career", slug: "career", icon: UserPlus, count: "1.1k articles" },
  { name: "Productivity", slug: "productivity", icon: CheckCircle2, count: "2.2k articles" },
  { name: "Culture", slug: "culture", icon: Heart, count: "1.7k articles" },
  { name: "Travel", slug: "travel", icon: Compass, count: "640 articles" },
  { name: "Research", slug: "research", icon: FileText, count: "1.3k articles" },
  { name: "Health", slug: "health", icon: ShieldCheck, count: "1.1k articles" },
];

const AUTHORS_LIST: Author[] = [
  {
    handle: "elena_discourse",
    name: "Dr. Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    verified: "PURPLE",
    role: "Linguistics Fellow, Cambridge",
    bio: "Analyzing critical discourse frameworks, socio-cognitive media theory, and digital power structures.",
    followers: "18.4k",
  },
  {
    handle: "studio_ade",
    name: "Adebayo Studio",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
    verified: "GOLD",
    role: "Full-Stack Web Dev & UI/UX",
    bio: "Building Next.js applications, Prisma database architectures, and tailored editorial platforms.",
    followers: "32.1k",
  },
  {
    handle: "sarah_ui",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    verified: "BLUE",
    role: "Principal Design Engineer",
    bio: "Obsessed with clean typography, Framer Motion springs, and accessible component design systems.",
    followers: "12.8k",
  },
  {
    handle: "dchen_ai",
    name: "David K. Chen",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
    verified: "BLUE",
    role: "AI Research Scientist",
    bio: "Exploring cognitive models, transformer architectures, and deep learning publishing.",
    followers: "24.5k",
  },
];

const COLLECTIONS_LIST: Collection[] = [
  {
    slug: "ai-learning-models",
    title: "AI Learning & Cognitive Models",
    itemCount: "14 Essays",
    category: "ARTIFICIAL INTELLIGENCE",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "startup-product-playbooks",
    title: "Startup Product & Design Playbooks",
    itemCount: "22 Guides",
    category: "BUSINESS & STARTUPS",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "design-inspiration-systems",
    title: "Design System Tokens & Micro-Interactions",
    itemCount: "18 Blueprints",
    category: "DESIGN & INTERACTION",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "programming-nextjs-prisma",
    title: "Next.js App Router & Prisma Architecture",
    itemCount: "31 Code Snippets",
    category: "SOFTWARE ENGINEERING",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "critical-discourse-research",
    title: "Critical Discourse Analysis Research",
    itemCount: "12 Papers",
    category: "ACADEMICS & LINGUISTICS",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "career-growth-leadership",
    title: "Career Growth & Engineering Leadership",
    itemCount: "19 Perspectives",
    category: "CAREER & PRODUCTIVITY",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
  },
];

const COMMUNITIES_LIST: Community[] = [
  {
    slug: "ai-builders",
    name: "AI Builders Lab",
    description: "Engineers and researchers building local LLM agents and neural interface workflows.",
    members: "14.2k Members",
    icon: "⚡",
    tag: "AI & Data",
  },
  {
    slug: "young-writers-guild",
    name: "Young Writers Guild",
    description: "A sanctuary for long-form essayists, academic linguists, and digital journalists.",
    members: "9.8k Members",
    icon: "🖋️",
    tag: "Publishing",
  },
  {
    slug: "design-thinkers-collective",
    name: "Design Thinkers Collective",
    description: "Focusing on clean white-space layouts, spatial typography, and tactile UI tokens.",
    members: "21.5k Members",
    icon: "🎨",
    tag: "UI/UX System",
  },
  {
    slug: "startup-founders-circle",
    name: "Startup Founders Circle",
    description: "Bootstrapped founders and studio directors sharing early product feedback.",
    members: "18.1k Members",
    icon: "🚀",
    tag: "Ventures",
  },
];

/* ==========================================================================
   1. ANNOUNCEMENT BAR COMPONENT
   ========================================================================== */

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#FAF8FF] border-b border-purple-100/60 py-2 px-4 text-center text-xs font-medium text-slate-700 flex items-center justify-center gap-2">
      <span className="inline-flex items-center gap-1.5 text-[#6D28D9] font-bold">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#6D28D9]" />
        Discover ideas, people, and conversations worth your time.
      </span>
      <span className="hidden sm:inline text-slate-300">•</span>
      <Link
        href="/discover"
        className="text-[#6D28D9] font-bold hover:underline transition-all flex items-center gap-1"
      >
        Explore Bloggy <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};

/* ==========================================================================
   2. CLEAN PRESTIGE NAVBAR COMPONENT
   ========================================================================== */

export const PremiumNavbar: React.FC<{
  isScrolled: boolean;
  onOpenMobileMenu: () => void;
}> = ({ isScrolled, onOpenMobileMenu }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/70 shadow-xs py-3"
          : "bg-white/60 backdrop-blur-xs border-b border-slate-100 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Bloggy Branding */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#6D28D9] flex items-center justify-center text-white font-serif font-black text-xl shadow-md group-hover:bg-[#5B21B6] transition-all">
            B
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-slate-900">
            Bloggy<span className="text-[#6D28D9]">.</span>
          </span>
        </Link>

        {/* Clean Center Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-700">
          <Link href="/discover" className="hover:text-[#6D28D9] transition-colors py-1">
            Discover
          </Link>
          <Link href="/topics" className="hover:text-[#6D28D9] transition-colors py-1">
            Topics
          </Link>
          <Link href="/authors" className="hover:text-[#6D28D9] transition-colors py-1">
            Authors
          </Link>
          <Link href="/collections" className="hover:text-[#6D28D9] transition-colors py-1">
            Collections
          </Link>
          <Link href="/community" className="hover:text-[#6D28D9] transition-colors py-1">
            Community
          </Link>
        </nav>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 rounded-xl text-slate-600 hover:text-[#6D28D9] hover:bg-purple-50 transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <Link href="/login">
              <button className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-[#6D28D9] hover:bg-purple-50 rounded-xl transition-colors cursor-pointer">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 text-xs font-semibold bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-xl shadow-sm transition-all hover:scale-[1.02] cursor-pointer">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-800 bg-slate-100 hover:bg-purple-100 transition-colors flex flex-col items-center justify-center gap-1 w-9 h-9"
            aria-label="Toggle Navigation Menu"
          >
            <span className="w-5 h-0.5 bg-slate-800 rounded-full" />
            <span className="w-5 h-0.5 bg-[#6D28D9] rounded-full" />
            <span className="w-3 h-0.5 bg-slate-800 rounded-full self-end pr-1" />
          </button>
        </div>
      </div>
    </header>
  );
};

/* ==========================================================================
   MOBILE DRAWER COMPONENT
   ========================================================================== */

export const MobileDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm lg:hidden flex justify-end">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6D28D9] flex items-center justify-center text-white font-serif font-bold text-lg">
                B
              </div>
              <span className="font-serif font-bold text-lg text-slate-900">Bloggy</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="py-6 space-y-2 text-left font-semibold text-slate-800 text-sm">
            <Link
              href="/discover"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
            >
              <Compass className="w-4 h-4 text-[#6D28D9]" /> Discover
            </Link>
            <Link
              href="/topics"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#6D28D9]" /> Topics
            </Link>
            <Link
              href="/authors"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
            >
              <Users className="w-4 h-4 text-[#6D28D9]" /> Authors
            </Link>
            <Link
              href="/collections"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
            >
              <Layers className="w-4 h-4 text-[#6D28D9]" /> Collections
            </Link>
            <Link
              href="/community"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#6D28D9]" /> Community
            </Link>
            <Link
              href="/search"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
            >
              <Search className="w-4 h-4 text-[#6D28D9]" /> Search
            </Link>
          </nav>

          <div className="space-y-2 pt-6 border-t border-slate-100">
            <Link href="/register" onClick={onClose} className="block w-full">
              <button className="w-full py-3 text-xs font-bold bg-[#6D28D9] text-white rounded-xl shadow-sm">
                Register Free
              </button>
            </Link>
            <Link href="/login" onClick={onClose} className="block w-full">
              <button className="w-full py-3 text-xs font-bold border border-slate-200 text-slate-700 rounded-xl">
                Login
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ==========================================================================
   3. HERO SECTION
   ========================================================================== */

export const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF8FF] via-white to-slate-50 overflow-hidden text-center">
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto hidden md:block">
        {HERO_CREATORS.map((creator) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              delay: creator.id * 0.4,
            }}
            className={cn(
              "absolute z-20 flex items-center gap-2.5 bg-white/90 backdrop-blur-md p-2 pr-4 rounded-2xl border border-purple-100 shadow-xl pointer-events-auto cursor-pointer hover:border-purple-300 transition-all",
              creator.position
            )}
          >
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-10 h-10 rounded-xl object-cover border border-purple-200"
            />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">{creator.name}</p>
              <p className="text-[10px] text-slate-500">{creator.role}</p>
            </div>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] font-bold text-[9px] border border-purple-100">
              {creator.badge}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 border border-purple-200 text-[#6D28D9] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Next-Generation Editorial & Social Ecosystem</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          Discover ideas worth your time.
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          Bloggy brings together qualitative academic discourse, full-stack code playbooks, and creative storytelling in a refined reading environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/discover" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold text-sm shadow-md shadow-purple-950/10 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer">
              <span>Start Reading</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-purple-50 text-slate-800 font-bold text-sm border border-slate-200/80 shadow-xs transition-all cursor-pointer">
              Start Writing
            </button>
          </Link>
        </div>

        <div className="pt-10 max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 aspect-[16/9] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-left text-white flex flex-col justify-end space-y-2 z-10">
              <span className="text-[10px] font-mono font-bold text-purple-300 tracking-widest uppercase bg-purple-900/60 px-2.5 py-1 rounded-md w-max backdrop-blur-md border border-purple-400/30">
                {slide.category}
              </span>
              <h3 className="font-serif font-bold text-lg sm:text-2xl text-white leading-snug">
                {slide.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <span>By {slide.author}</span>
                <span className="font-mono text-purple-300">{slide.readingTime}</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 z-20 flex gap-1.5 bg-slate-950/60 p-2 rounded-full backdrop-blur-md">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeSlide === idx ? "w-6 bg-[#6D28D9]" : "w-1.5 bg-slate-600"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   4. FEATURED CONTENT SECTION
   ========================================================================== */

export const FeaturedContentSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
              CURATED ESSAYS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Featured Content
            </h2>
          </div>
          <Link href="/discover" className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1">
            Browse All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <Link
            href={`/article/${FEATURED_MAIN_ARTICLE.slug}`}
            className="lg:col-span-7 bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 hover:border-purple-300 shadow-xs hover:shadow-md transition-all group flex flex-col text-left"
          >
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
              <img
                src={FEATURED_MAIN_ARTICLE.image}
                alt={FEATURED_MAIN_ARTICLE.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-white/95 text-[#6D28D9] font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                {FEATURED_MAIN_ARTICLE.category}
              </span>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                  {FEATURED_MAIN_ARTICLE.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {FEATURED_MAIN_ARTICLE.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 text-xs text-slate-500">
                <div className="flex items-center gap-2.5">
                  <img
                    src={FEATURED_MAIN_ARTICLE.author.avatar}
                    alt={FEATURED_MAIN_ARTICLE.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-purple-200"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{FEATURED_MAIN_ARTICLE.author.name}</p>
                    <p className="text-[10px] text-slate-400">@{FEATURED_MAIN_ARTICLE.author.handle}</p>
                  </div>
                </div>
                <span className="font-mono text-slate-400">{FEATURED_MAIN_ARTICLE.readingTime}</span>
              </div>
            </div>
          </Link>

          <div className="lg:col-span-5 flex flex-col gap-6">
            {FEATURED_SIDE_ARTICLES.map((art) => (
              <Link
                key={art.slug}
                href={`/article/${art.slug}`}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 hover:border-purple-300 shadow-xs hover:shadow-md transition-all group text-left flex-1 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#6D28D9] uppercase tracking-wider">
                    {art.category}
                  </span>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-bold text-slate-800">{art.author.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">{art.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   5. TRENDING ON BLOGGY SECTION
   ========================================================================== */

export const TrendingSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8FF]/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" /> POPULAR THIS WEEK
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Trending Today
            </h2>
          </div>
          <Link href="/discover" className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRENDING_ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/article/${art.slug}`}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 hover:border-purple-300 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-3">
                <div className="h-44 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-[10px] font-bold text-[#6D28D9] uppercase tracking-wider block">
                  {art.category}
                </span>
                <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#6D28D9] transition-colors leading-snug line-clamp-2">
                  {art.title}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <img src={art.author.avatar} alt={art.author.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="font-semibold text-slate-800 text-[11px]">{art.author.name}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-[#6D28D9] font-bold">
                    <Heart className="w-3.5 h-3.5 fill-current" /> {art.reactions}
                  </span>
                  <Bookmark className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   6. EXPLORE TOPICS SECTION
   ========================================================================== */

export const ExploreTopicsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
            CUSTOM INTERESTS
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900">Explore Topics</h2>
          <p className="text-xs text-slate-500">Pick topics that matter to your research and development</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TOPICS_LIST.map((topic) => {
            const IconComponent = topic.icon;
            return (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-[#FAF8FF] border border-slate-200/80 hover:border-purple-300 transition-all text-center space-y-2 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#6D28D9] shadow-xs mx-auto flex items-center justify-center group-hover:bg-[#6D28D9] group-hover:text-white transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs text-slate-900">{topic.name}</h3>
                <p className="text-[10px] text-slate-400 font-mono">{topic.count}</p>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/topics">
            <button className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-purple-100 text-[#6D28D9] font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5">
              <span>Explore all topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   7. DISCOVER AUTHORS SECTION
   ========================================================================== */

export const DiscoverAuthorsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8FF]/40 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
              VERIFIED CREATORS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Discover Authors
            </h2>
          </div>
          <Link href="/authors" className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1">
            Meet more authors <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUTHORS_LIST.map((author) => (
            <div
              key={author.handle}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-purple-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Link href={`/@${author.handle}`}>
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-purple-100"
                    />
                  </Link>
                  <button className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-[#6D28D9] text-[#6D28D9] hover:text-white font-bold text-xs transition-colors cursor-pointer">
                    Follow
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-sm text-slate-900">{author.name}</h3>
                    <span className="text-[#6D28D9] font-bold text-xs">✓</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">@{author.handle}</p>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{author.bio}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{author.followers} Followers</span>
                <Link href={`/@${author.handle}`} className="text-[#6D28D9] font-bold hover:underline">
                  Profile &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   8. VISUAL COLLECTIONS SECTION
   ========================================================================== */

export const CollectionsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
              CURATED BOARDS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Visual Collections
            </h2>
          </div>
          <Link href="/collections" className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1">
            Explore collections <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS_LIST.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md aspect-[4/3] bg-slate-900 flex flex-col justify-end p-6 text-left"
            >
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-1 text-white">
                <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-widest">
                  {col.category}
                </span>
                <h3 className="font-serif font-bold text-lg text-white group-hover:text-purple-200 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-slate-300 font-mono pt-1">{col.itemCount}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   9. PERSONALIZED DISCOVERY
   ========================================================================== */

export const PersonalizedDiscoverySection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8FF] border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
            INTELLIGENT FEED
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            How Bloggy learns your interests
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Instead of standard algorithmic noise, Bloggy maps your explicit topic preferences into a clean daily digest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-2 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase">STEP 1</span>
            <h3 className="font-bold text-sm text-slate-900">You Follow Topics</h3>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#6D28D9] text-[10px] font-bold">
                #AI
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#6D28D9] text-[10px] font-bold">
                #Design
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#6D28D9] text-[10px] font-bold">
                #Startups
              </span>
            </div>
          </div>

          <div className="text-[#6D28D9] font-bold text-xl hidden md:block">↓</div>

          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-2 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase">STEP 2</span>
            <h3 className="font-bold text-sm text-slate-900">Personalized Digest</h3>
            <p className="text-xs text-slate-500">
              Bloggy filters high-reputation authors matching your specific interest graph.
            </p>
          </div>
        </div>

        <Link href="/register">
          <button className="px-8 py-3.5 bg-[#6D28D9] text-white font-bold text-xs rounded-2xl shadow-md hover:bg-[#5B21B6] transition-all cursor-pointer inline-flex items-center gap-2">
            <span>Build your feed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </section>
  );
};

/* ==========================================================================
   10. READING EXPERIENCE PREVIEW
   ========================================================================== */

export const ReadingExperienceSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-left">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
            READER EXPERIENCE
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Crafted for focused, uninterrupted reading.
          </h2>
        </div>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Elena"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-sm text-slate-900">Dr. Elena Rostova</p>
                <p className="text-[10px] text-slate-400">Published in Critical Discourse Analysis</p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">7 min read</span>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900 leading-snug">
              "The Socio-Cognitive Structure of Health Advice"
            </h3>
            <p className="font-serif text-slate-700 text-sm leading-relaxed italic border-l-2 border-[#6D28D9] pl-4">
              "When analyzing digital posts, we must ask: how do authority markers and technical jargon activate latent trust before empirical validation can occur?"
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-[#6D28D9] font-bold">
                <Heart className="w-4 h-4 fill-current" /> 1,420
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> 94 Comments
              </span>
            </div>
            <Share2 className="w-4 h-4 hover:text-slate-800 cursor-pointer" />
          </div>
        </div>

        <div className="text-center">
          <Link href="/discover">
            <button className="px-6 py-3 bg-purple-50 text-[#6D28D9] font-bold text-xs rounded-xl hover:bg-purple-100 transition-colors cursor-pointer inline-flex items-center gap-1.5">
              <span>Start Reading</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   11. SOCIAL / CREATOR EXPERIENCE
   ========================================================================== */

export const SocialCreatorExperienceSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8FF]/50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-center">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
            PUBLISHING COMPOSER
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Share what you're thinking.
          </h2>
          <p className="text-xs text-slate-500">
            Publish short updates, code blocks, research polls, or full-length essays in seconds.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <input
              type="text"
              readOnly
              placeholder="What curious idea or technical breakthrough are you working on?"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 hover:text-[#6D28D9] cursor-pointer">
                <FileText className="w-4 h-4 text-purple-600" /> Text
              </span>
              <span className="flex items-center gap-1 hover:text-[#6D28D9] cursor-pointer">
                <ImageIcon className="w-4 h-4 text-emerald-600" /> Images
              </span>
              <span className="flex items-center gap-1 hover:text-[#6D28D9] cursor-pointer">
                <FileCode2 className="w-4 h-4 text-amber-600" /> Code
              </span>
              <span className="flex items-center gap-1 hover:text-[#6D28D9] cursor-pointer">
                <BarChart3 className="w-4 h-4 text-rose-600" /> Polls
              </span>
            </div>

            <Link href="/register">
              <button className="px-5 py-2 bg-[#6D28D9] text-white font-bold text-xs rounded-xl cursor-pointer">
                Publish Update
              </button>
            </Link>
          </div>
        </div>

        <Link href="/register">
          <button className="px-6 py-3 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors cursor-pointer inline-flex items-center gap-1.5">
            <span>Create your account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </section>
  );
};

/* ==========================================================================
   12. COMMUNITY SECTION
   ========================================================================== */

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
              PEER HUBS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Community Hubs
            </h2>
          </div>
          <Link href="/community" className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1">
            Explore communities <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMUNITIES_LIST.map((c) => (
            <div
              key={c.slug}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 hover:border-purple-300 transition-all text-left flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-xl">
                  {c.icon}
                </div>
                <h3 className="font-bold text-base text-slate-900">{c.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{c.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">{c.members}</span>
                <Link href={`/community/${c.slug}`}>
                  <button className="px-3.5 py-1.5 rounded-xl bg-[#6D28D9] text-white font-bold text-xs hover:bg-[#5B21B6] transition-colors cursor-pointer">
                    Join
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   13. TESTIMONIALS SECTION
   ========================================================================== */

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8FF]/40 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
            TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Words of Appreciation
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-sm text-left max-w-3xl mx-auto space-y-6">
          <Quote className="w-10 h-10 text-[#6D28D9]/30" />
          <p className="font-serif italic text-slate-800 text-lg sm:text-xl leading-relaxed">
            "Bloggy has completely unified how our research group publishes Critical Discourse Analysis papers while sharing live Next.js code implementations with our students."
          </p>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Dr. Elena Rostova"
              className="w-12 h-12 rounded-2xl object-cover"
            />
            <div>
              <h4 className="font-bold text-sm text-slate-900">Dr. Elena Rostova</h4>
              <p className="text-xs text-slate-500">Linguistics Fellow, Cambridge Hub • @elena_discourse</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   14. CREATOR SECTION
   ========================================================================== */

export const CreatorSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">
            GROW YOUR AUDIENCE
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Publish → Build Audience → Grow
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-center">
            <p className="text-2xl font-black text-slate-900">128.4k</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Reads</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-center">
            <p className="text-2xl font-black text-[#6D28D9]">32.1k</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Followers</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-center">
            <p className="text-2xl font-black text-slate-900">42</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Articles</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-center">
            <p className="text-2xl font-black text-amber-500">14.8k</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Reactions</p>
          </div>
        </div>

        <Link href="/register">
          <button className="px-8 py-3.5 bg-[#6D28D9] text-white font-bold text-xs rounded-2xl hover:bg-[#5B21B6] transition-colors cursor-pointer inline-flex items-center gap-2">
            <span>Become a creator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </section>
  );
};

/* ==========================================================================
   15. FINAL CTA SECTION
   ========================================================================== */

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-24 bg-[#6D28D9] text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          There's always something worth discovering.
        </h2>
        <p className="text-purple-100 text-sm sm:text-base max-w-lg mx-auto">
          Join thousands of researchers, full-stack engineers, and editorial writers on Bloggy today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/discover" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#6D28D9] font-bold text-xs rounded-2xl hover:bg-purple-50 transition-colors cursor-pointer flex items-center justify-center gap-2">
              <span>Start Reading</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-purple-900/60 border border-purple-400/40 text-white font-bold text-xs rounded-2xl hover:bg-purple-900 transition-colors cursor-pointer">
              Join Bloggy
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   16. FOOTER COMPONENT
   ========================================================================== */

export const CompleteFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 text-xs font-sans border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-left">
        {/* Column 1: Product */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Product</h4>
          <ul className="space-y-2">
            <li><Link href="/discover" className="hover:text-white transition-colors">Discover</Link></li>
            <li><Link href="/topics" className="hover:text-white transition-colors">Topics</Link></li>
            <li><Link href="/authors" className="hover:text-white transition-colors">Authors</Link></li>
            <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
            <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Company</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Resources</h4>
          <ul className="space-y-2">
            <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link href="/search" className="hover:text-white transition-colors">Search</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Legal</h4>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div>

        {/* Column 5: Account */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Account</h4>
          <ul className="space-y-2">
            <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
            <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#6D28D9] flex items-center justify-center text-white font-serif font-bold text-xs">
            B
          </div>
          <span className="font-serif font-bold text-white text-sm">Bloggy</span>
          <span>&copy; {new Date().getFullYear()} Bloggy Inc.</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Clean product navigation architecture. Built for writers and readers.
        </p>
      </div>
    </footer>
  );
};

/* ==========================================================================
   MAIN HOMEPAGE ROOT COMPONENT
   ========================================================================== */

export default function BloggyHomepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-purple-100 selection:text-[#6D28D9]">
      <AnnouncementBar />

      <PremiumNavbar
        isScrolled={isScrolled}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <HeroSection />
      <FeaturedContentSection />
      <TrendingSection />
      <ExploreTopicsSection />
      <DiscoverAuthorsSection />
      <CollectionsSection />
      <PersonalizedDiscoverySection />
      <ReadingExperienceSection />
      <SocialCreatorExperienceSection />
      <CommunitySection />
      <TestimonialsSection />
      <CreatorSection />
      <FinalCTASection />
      <CompleteFooter />
    </div>
  );
}