'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search, Bell, Moon, Sun, PenLine, PlayCircle, ArrowRight,
  ChevronDown, ChevronLeft, ChevronRight, Check, Cpu,
  TrendingUp, DollarSign, ShieldCheck, Headphones, BarChart3,
  WifiOff, Mic, Smartphone, Tablet, Play, X
} from 'lucide-react';

export default function HomePage() {
  // --- States ---
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [testimonialOffset, setTestimonialOffset] = useState(0);
  const [followingState, setFollowingState] = useState<{ [key: number]: boolean }>({});

  const searchInputRef = useRef<HTMLInputElement>(null);

  // --- Hero Slides Data ---
  const slides = [
    'https://images.unsplash.com/photo-1549399905-5d1bad747576?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1664353655151-9d94a9170eb0?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1574856049959-d3134a3e592f?w=1920&h=1080&fit=crop&auto=format'
  ];

  // --- Scroll Progress & Navbar Listener ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Auto Hero Slideshow ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // --- Dark Mode Handler ---
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- Hotkey Handler (Ctrl/Cmd + K & Esc) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchModalOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchModalOpen]);

  // --- Testimonials Navigation ---
  const handleScrollTestimonials = (dir: number) => {
    const cardWidth = 360 + 24;
    const totalCards = 4;
    const maxOffset = (totalCards - 1) * cardWidth;
    setTestimonialOffset((prev) => Math.max(0, Math.min(maxOffset, prev + dir * cardWidth)));
  };

  // --- Follow Button Toggle ---
  const toggleFollow = (authorId: number) => {
    setFollowingState((prev) => ({
      ...prev,
      [authorId]: !prev[authorId]
    }));
  };

  return (
    <>
      {/* ── EMBEDDED STYLES ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --purple-900: #3B0764;
          --purple-800: #4C1D95;
          --purple-700: #6D28D9;
          --purple-600: #7C3AED;
          --purple-500: #8B5CF6;
          --purple-400: #A78BFA;
          --purple-300: #C4B5FD;
          --purple-100: #EDE9FE;
          --purple-50:  #F5F3FF;
          --white: #FFFFFF;
          --gray-50:  #FAFAFA;
          --gray-100: #F4F4F5;
          --gray-200: #E4E4E7;
          --gray-300: #D1D5DB;
          --gray-400: #9CA3AF;
          --gray-500: #6B7280;
          --gray-600: #4B5563;
          --gray-700: #374151;
          --gray-800: #1F2937;
          --gray-900: #111827;
          --radius-sm: 8px;
          --radius-md: 16px;
          --radius-lg: 24px;
          --radius-xl: 32px;
          --shadow-card: 0 4px 24px rgba(109,40,217,0.08), 0 1px 4px rgba(0,0,0,0.04);
          --shadow-card-hover: 0 12px 48px rgba(109,40,217,0.16), 0 4px 16px rgba(0,0,0,0.08);
          --shadow-glass: 0 8px 32px rgba(109,40,217,0.12), inset 0 1px 0 rgba(255,255,255,0.6);
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--white);
          color: var(--gray-900);
          line-height: 1.6;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--purple-300); border-radius: 99px; }

        .container { max-width: 1440px; margin: 0 auto; padding: 0 40px; }
        @media (max-width: 768px) { .container { padding: 0 20px; } }

        .tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 5px 12px;
          border-radius: 99px;
        }
        .tag-purple { background: var(--purple-100); color: var(--purple-700); }
        .tag-white  { background: rgba(255,255,255,0.18); color: #fff; border: 1px solid rgba(255,255,255,0.3); backdrop-filter: blur(8px); }

        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px;
          padding: 14px 28px; border-radius: 99px; cursor: pointer;
          border: none; text-decoration: none; transition: all 0.25s ease;
          white-space: nowrap;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--purple-600), var(--purple-500));
          color: #fff;
          box-shadow: 0 4px 16px rgba(109,40,217,0.35);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(109,40,217,0.45); }
        .btn-ghost { background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.3); backdrop-filter: blur(8px); }
        .btn-ghost:hover { background: rgba(255,255,255,0.22); }
        .btn-outline { background: transparent; color: var(--purple-700); border: 1.5px solid var(--purple-300); }
        .btn-outline:hover { background: var(--purple-50); }
        .btn-sm { padding: 9px 18px; font-size: 13px; }

        #announcement {
          background: linear-gradient(90deg, var(--purple-700), var(--purple-500), var(--purple-700));
          background-size: 200% 100%;
          animation: gradientShift 4s ease infinite;
          color: #fff; text-align: center;
          padding: 10px 20px; font-size: 13px; font-family: 'Space Grotesk', sans-serif; font-weight: 500;
          position: relative;
        }
        #announcement a { color: #fff; text-decoration: underline; margin-left: 8px; }
        #announcement .close-btn { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); cursor: pointer; opacity: 0.7; }
        #announcement .close-btn:hover { opacity: 1; }
        @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

        #navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(109,40,217,0.08);
          transition: all 0.3s ease;
        }
        #navbar.scrolled {
          box-shadow: 0 4px 32px rgba(109,40,217,0.1);
          background: rgba(255,255,255,0.88);
        }
        .nav-inner {
          display: flex; align-items: center; gap: 0; height: 68px;
          justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 22px;
          color: var(--gray-900); text-decoration: none; display: flex; align-items: center; gap: 8px;
          flex-shrink: 0;
        }
        .nav-logo .logo-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: linear-gradient(135deg, var(--purple-600), var(--purple-400));
          display: inline-block;
        }
        .nav-links { display: flex; align-items: center; gap: 2px; }
        .nav-links a {
          font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 14px;
          color: var(--gray-600); text-decoration: none; padding: 8px 14px; border-radius: 8px;
          transition: all 0.2s; position: relative;
        }
        .nav-links a:hover { color: var(--purple-700); background: var(--purple-50); }
        .nav-actions { display: flex; align-items: center; gap: 10px; }
        .nav-icon-btn {
          width: 38px; height: 38px; border-radius: 50%; border: none; background: transparent;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          color: var(--gray-500); transition: all 0.2s;
        }
        .nav-icon-btn:hover { background: var(--purple-50); color: var(--purple-700); }
        .nav-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--purple-500), var(--purple-700));
          border: 2px solid var(--purple-300); cursor: pointer;
          background-image: url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format');
          background-size: cover;
        }
        @media (max-width: 900px) { .nav-links-desktop { display: none !important; } }

        #hero {
          position: relative; height: 100vh; min-height: 640px;
          overflow: hidden; display: flex; align-items: flex-end;
        }
        .hero-slides { position: absolute; inset: 0; }
        .hero-slide {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          opacity: 0; transition: opacity 1.2s ease, transform 8s ease;
          transform: scale(1.08);
        }
        .hero-slide.active { opacity: 1; transform: scale(1); }
        .hero-slide::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
        }
        .hero-content {
          position: relative; z-index: 10; width: 100%;
          padding-bottom: 80px;
        }
        .hero-inner { max-width: 900px; }
        .hero-kicker { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .hero-kicker .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #22C55E;
          animation: pulse 2s ease infinite; flex-shrink: 0;
        }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); } 50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); } }
        .hero-category { font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 600; color: var(--purple-300); letter-spacing: 0.1em; text-transform: uppercase; }
        .hero-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 72px);
          font-weight: 700; color: #fff; line-height: 1.1;
          margin-bottom: 20px; letter-spacing: -0.02em;
        }
        .hero-deck { font-size: 17px; color: rgba(255,255,255,0.75); max-width: 520px; margin-bottom: 32px; line-height: 1.65; }
        .hero-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 40px; }
        .hero-meta { display: flex; align-items: center; gap: 20px; }
        .hero-author { display: flex; align-items: center; gap: 10px; }
        .hero-author img { width: 36px; height: 36px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.4); object-fit: cover; }
        .hero-author-name { font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600; color: #fff; }
        .hero-author-role { font-size: 11px; color: rgba(255,255,255,0.55); }
        .hero-stats { display: flex; gap: 20px; }
        .hero-stat { text-align: center; }
        .hero-stat-num { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: #fff; }
        .hero-stat-label { font-size: 11px; color: rgba(255,255,255,0.5); }

        .slide-nav {
          position: absolute; bottom: 32px; right: 40px; z-index: 20;
          display: flex; gap: 8px; align-items: center;
        }
        .slide-dot {
          width: 6px; height: 6px; border-radius: 99px;
          background: rgba(255,255,255,0.35); cursor: pointer;
          transition: all 0.3s ease;
        }
        .slide-dot.active { width: 24px; background: #fff; }

        .hero-badge {
          position: absolute; z-index: 20;
          background: rgba(255,255,255,0.12); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius-md);
          padding: 12px 16px; color: #fff;
          font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600;
          animation: floatBadge 4s ease-in-out infinite;
        }
        .hero-badge.b1 { top: 20%; right: 6%; animation-delay: 0s; }
        .hero-badge.b2 { top: 38%; right: 6%; animation-delay: 1.5s; }
        @media (max-width: 768px) { .hero-badge { display: none; } }
        @keyframes floatBadge { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .hero-badge .badge-num { font-size: 22px; font-weight: 700; color: var(--purple-300); display: block; }
        .hero-badge .badge-label { font-size: 11px; opacity: 0.7; }

        .section-header { text-align: center; max-width: 640px; margin: 0 auto 64px; }
        .section-label { font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--purple-600); margin-bottom: 14px; display: block; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; color: var(--gray-900); margin-bottom: 16px; }
        .section-subtitle { font-size: 17px; color: var(--gray-500); line-height: 1.65; }

        section { padding: 96px 0; }
        @media (max-width: 768px) { section { padding: 64px 0; } }

        #trending { background: var(--gray-50); }
        .trending-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 1100px) { .trending-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .trending-grid { grid-template-columns: 1fr; } }

        .article-card {
          background: var(--white); border-radius: var(--radius-md);
          overflow: hidden; box-shadow: var(--shadow-card);
          transition: all 0.3s ease; cursor: pointer;
          display: flex; flex-direction: column;
        }
        .article-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-card-hover); }
        .article-card:hover .card-img { transform: scale(1.05); }
        .card-img-wrap { overflow: hidden; height: 200px; background: var(--gray-100); position: relative; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .card-body { padding: 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .card-category { font-family: 'Space Grotesk', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--purple-600); }
        .card-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; line-height: 1.35; color: var(--gray-900); }
        .card-excerpt { font-size: 13px; color: var(--gray-500); line-height: 1.6; flex: 1; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--gray-100); margin-top: auto; }
        .card-author { display: flex; align-items: center; gap: 8px; }
        .card-avatar { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; }
        .card-author-name { font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 600; color: var(--gray-700); }
        .card-read-time { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--gray-400); }

        .trending-num {
          position: absolute; top: 12px; left: 12px; z-index: 5;
          font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 12px;
          background: var(--purple-600); color: #fff;
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        #topics { background: var(--white); }
        .topics-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
        @media (max-width: 1100px) { .topics-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .topics-grid { grid-template-columns: repeat(2, 1fr); } }
        .topic-card {
          border-radius: var(--radius-md); padding: 24px 20px;
          text-align: center; cursor: pointer;
          transition: all 0.25s ease; border: 1.5px solid transparent;
          background: var(--gray-50);
        }
        .topic-card:hover { background: var(--purple-50); border-color: var(--purple-200); transform: translateY(-3px); }
        .topic-icon { font-size: 32px; margin-bottom: 10px; display: block; }
        .topic-name { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px; color: var(--gray-800); }
        .topic-count { font-size: 11px; color: var(--gray-400); margin-top: 4px; }

        #editors { background: var(--gray-50); }
        .editors-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 32px; }
        @media (max-width: 900px) { .editors-layout { grid-template-columns: 1fr; } }
        .editors-featured {
          border-radius: var(--radius-lg); overflow: hidden; position: relative;
          height: 540px; background: var(--gray-200); cursor: pointer;
          box-shadow: var(--shadow-card);
        }
        .editors-featured img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .editors-featured:hover img { transform: scale(1.04); }
        .editors-featured-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 32px;
        }
        .editors-list { display: flex; flex-direction: column; gap: 16px; }
        .editors-list-item {
          display: flex; gap: 16px; padding: 16px;
          background: var(--white); border-radius: var(--radius-md);
          cursor: pointer; transition: all 0.2s ease; box-shadow: var(--shadow-card);
        }
        .editors-list-item:hover { transform: translateX(4px); box-shadow: var(--shadow-card-hover); }
        .editors-list-thumb { width: 90px; height: 70px; border-radius: var(--radius-sm); overflow: hidden; flex-shrink: 0; background: var(--gray-100); }
        .editors-list-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .editors-list-content { flex: 1; }
        .editors-list-num { font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700; color: var(--purple-400); margin-bottom: 4px; }
        .editors-list-title { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: var(--gray-900); line-height: 1.3; margin-bottom: 6px; }

        #latest { background: var(--white); }
        .masonry-grid { columns: 3; column-gap: 24px; }
        @media (max-width: 1000px) { .masonry-grid { columns: 2; } }
        @media (max-width: 600px) { .masonry-grid { columns: 1; } }
        .masonry-item { break-inside: avoid; margin-bottom: 24px; }

        #collections { background: var(--purple-50); }
        .collections-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .collections-grid { grid-template-columns: 1fr; } }
        .collection-card {
          border-radius: var(--radius-md); overflow: hidden;
          background: var(--white); box-shadow: var(--shadow-card);
          cursor: pointer; transition: all 0.3s ease;
        }
        .collection-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-card-hover); }
        .collection-header {
          height: 180px; position: relative; overflow: hidden;
          background: linear-gradient(135deg, var(--purple-700), var(--purple-500));
        }
        .collection-header img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
        .collection-header-overlay {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 8px;
        }
        .collection-icon { font-size: 40px; }
        .collection-title-overlay { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #fff; text-align: center; padding: 0 16px; }
        .collection-body { padding: 20px; }
        .collection-body-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; color: var(--gray-900); margin-bottom: 6px; }
        .collection-meta { font-size: 12px; color: var(--gray-500); display: flex; gap: 12px; margin-bottom: 14px; }
        .collection-previews { display: flex; gap: 6px; }
        .collection-preview-img { width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover; border: 2px solid #fff; background: var(--gray-100); }

        #authors { background: var(--white); }
        .authors-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 1000px) { .authors-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .authors-grid { grid-template-columns: 1fr; } }
        .author-card {
          text-align: center; padding: 32px 24px;
          background: var(--white); border-radius: var(--radius-md);
          border: 1.5px solid var(--gray-100);
          cursor: pointer; transition: all 0.3s ease;
        }
        .author-card:hover { border-color: var(--purple-300); box-shadow: var(--shadow-card-hover); transform: translateY(-4px); }
        .author-avatar-wrap { position: relative; display: inline-block; margin-bottom: 16px; }
        .author-avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--purple-200); }
        .author-verified {
          position: absolute; bottom: 2px; right: 2px;
          width: 22px; height: 22px; background: var(--purple-600); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #fff;
        }
        .author-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; color: var(--gray-900); margin-bottom: 4px; }
        .author-role { font-size: 12px; color: var(--gray-500); margin-bottom: 14px; }
        .author-stats { display: flex; justify-content: center; gap: 20px; padding-top: 14px; border-top: 1px solid var(--gray-100); }
        .author-stat-num { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; color: var(--gray-900); }
        .author-stat-label { font-size: 11px; color: var(--gray-400); }
        .author-follow-btn {
          margin-top: 14px; width: 100%; padding: 9px; border-radius: 99px;
          border: 1.5px solid var(--purple-300); background: transparent;
          color: var(--purple-700); font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 13px;
          cursor: pointer; transition: all 0.2s ease;
        }
        .author-follow-btn:hover { background: var(--purple-600); color: #fff; border-color: var(--purple-600); }
        .author-follow-btn.following { background: var(--purple-600); color: #fff; border-color: var(--purple-600); }

        #why { background: var(--gray-50); }
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr; } }
        .why-card {
          padding: 36px 28px; background: var(--white);
          border-radius: var(--radius-md); border: 1.5px solid var(--gray-100);
          transition: all 0.3s ease;
        }
        .why-card:hover { border-color: var(--purple-200); box-shadow: var(--shadow-card-hover); transform: translateY(-4px); }
        .why-icon-wrap {
          width: 56px; height: 56px; border-radius: var(--radius-sm);
          background: var(--purple-50); display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; color: var(--purple-600);
        }
        .why-title { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: var(--gray-900); margin-bottom: 12px; }
        .why-desc { font-size: 15px; color: var(--gray-500); line-height: 1.7; }

        #statistics {
          background: linear-gradient(135deg, var(--purple-900) 0%, var(--purple-700) 100%);
          padding: 96px 0; position: relative; overflow: hidden;
        }
        #statistics::before {
          content: ''; position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; position: relative; text-align: center; }
        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .stat-num { font-family: 'Space Grotesk', sans-serif; font-size: clamp(40px, 5vw, 64px); font-weight: 700; color: #fff; line-height: 1; margin-bottom: 8px; }
        .stat-num .stat-suffix { font-size: 0.6em; color: var(--purple-300); }
        .stat-label { font-size: 15px; color: rgba(255,255,255,0.6); }
        .stat-sub { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 4px; }

        #testimonials { background: var(--white); }
        .testimonials-track { display: flex; gap: 24px; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .testimonial-card {
          min-width: 360px; padding: 32px; background: var(--gray-50);
          border-radius: var(--radius-md); border: 1.5px solid var(--gray-100);
          flex-shrink: 0;
        }
        .testimonial-stars { color: #FBBF24; font-size: 14px; margin-bottom: 16px; letter-spacing: 2px; }
        .testimonial-text { font-family: 'Playfair Display', serif; font-size: 18px; font-style: italic; color: var(--gray-800); line-height: 1.6; margin-bottom: 20px; }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .testimonial-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--purple-200); }
        .testimonial-author-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 14px; color: var(--gray-900); }
        .testimonial-author-handle { font-size: 12px; color: var(--gray-400); }
        .testimonials-nav { display: flex; justify-content: center; gap: 12px; margin-top: 32px; }
        .testimonials-nav-btn {
          width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid var(--gray-200);
          background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: var(--gray-600); transition: all 0.2s;
        }
        .testimonials-nav-btn:hover { border-color: var(--purple-400); color: var(--purple-600); }

        #newsletter {
          background: linear-gradient(135deg, #1a0533 0%, var(--purple-800) 50%, var(--purple-700) 100%);
          position: relative; overflow: hidden;
        }
        #newsletter::before {
          content: ''; position: absolute;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%);
          top: -200px; right: -100px;
        }
        #newsletter::after {
          content: ''; position: absolute;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%);
          bottom: -150px; left: -100px;
        }
        .newsletter-inner { max-width: 580px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
        .newsletter-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 700; color: #fff; margin-bottom: 16px; line-height: 1.2; }
        .newsletter-sub { color: rgba(255,255,255,0.65); font-size: 17px; margin-bottom: 36px; }
        .newsletter-form { display: flex; gap: 12px; }
        @media (max-width: 600px) { .newsletter-form { flex-direction: column; } }
        .newsletter-input {
          flex: 1; padding: 16px 20px; border-radius: 99px;
          border: 1.5px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.08); color: #fff;
          font-family: 'Inter', sans-serif; font-size: 15px;
          outline: none; backdrop-filter: blur(8px);
          transition: border-color 0.2s;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.4); }
        .newsletter-input:focus { border-color: var(--purple-400); }
        .newsletter-note { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 14px; }

        #mobile-app { background: var(--gray-50); }
        .app-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 900px) { .app-layout { grid-template-columns: 1fr; } }
        .app-content .section-header { text-align: left; margin: 0 0 32px; }
        .app-features { display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px; }
        .app-feature { display: flex; align-items: flex-start; gap: 14px; }
        .app-feature-icon { width: 44px; height: 44px; border-radius: var(--radius-sm); background: var(--purple-100); display: flex; align-items: center; justify-content: center; color: var(--purple-600); flex-shrink: 0; }
        .app-feature-title { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; color: var(--gray-900); margin-bottom: 4px; }
        .app-feature-desc { font-size: 13px; color: var(--gray-500); line-height: 1.5; }
        .app-stores { display: flex; gap: 12px; flex-wrap: wrap; }
        .app-store-btn {
          display: flex; align-items: center; gap: 10px; padding: 12px 20px;
          background: var(--gray-900); border-radius: var(--radius-sm); color: #fff;
          text-decoration: none; transition: all 0.2s;
        }
        .app-store-btn:hover { background: var(--purple-700); transform: translateY(-2px); }
        .app-store-label { font-size: 10px; opacity: 0.6; display: block; }
        .app-store-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 14px; }
        .app-phone-mockup { display: flex; justify-content: center; }
        .phone-frame {
          width: 280px; height: 560px;
          background: var(--gray-900); border-radius: 44px;
          border: 8px solid var(--gray-800);
          overflow: hidden; position: relative;
          box-shadow: 0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08) inset;
        }
        .phone-notch {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 100px; height: 28px; background: var(--gray-900); border-radius: 0 0 18px 18px; z-index: 10;
        }
        .phone-screen { width: 100%; height: 100%; background: var(--white); padding: 36px 16px 16px; overflow: hidden; }
        .phone-app-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .phone-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 12px; color: var(--purple-700); }
        .phone-article { margin-bottom: 12px; border-radius: 8px; overflow: hidden; background: var(--gray-50); }
        .phone-article-img { height: 80px; background: var(--gray-200); background-size: cover; background-position: center; }
        .phone-article-body { padding: 8px; }
        .phone-article-cat { font-size: 7px; font-weight: 700; color: var(--purple-600); text-transform: uppercase; letter-spacing: 0.05em; }
        .phone-article-title { font-family: 'Playfair Display', serif; font-size: 10px; font-weight: 700; color: var(--gray-900); line-height: 1.3; }

        #podcasts { background: var(--white); }
        .podcast-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .podcast-grid { grid-template-columns: 1fr; } }
        .podcast-card {
          display: flex; gap: 16px; padding: 20px;
          background: var(--gray-50); border-radius: var(--radius-md);
          cursor: pointer; transition: all 0.2s ease;
          border: 1.5px solid transparent;
        }
        .podcast-card:hover { background: var(--purple-50); border-color: var(--purple-200); transform: translateX(4px); }
        .podcast-art { width: 72px; height: 72px; border-radius: var(--radius-sm); object-fit: cover; background: var(--gray-200); flex-shrink: 0; }
        .podcast-content { flex: 1; }
        .podcast-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; color: var(--gray-900); margin-bottom: 4px; }
        .podcast-host { font-size: 12px; color: var(--gray-500); margin-bottom: 8px; }
        .podcast-meta { display: flex; align-items: center; gap: 10px; }
        .podcast-duration { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--gray-500); }
        .podcast-play {
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--purple-600); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; color: #fff;
          transition: all 0.2s;
        }
        .podcast-play:hover { background: var(--purple-700); transform: scale(1.1); }

        #footer { background: var(--gray-900); padding: 80px 0 32px; }
        .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 56px; }
        @media (max-width: 1000px) { .footer-top { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .footer-top { grid-template-columns: 1fr; } }
        .footer-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 24px; color: #fff; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .footer-desc { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.65; margin-bottom: 24px; max-width: 280px; }
        .footer-socials { display: flex; gap: 10px; }
        .footer-social {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1); background: transparent;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.2s;
          text-decoration: none;
        }
        .footer-social:hover { border-color: var(--purple-400); color: var(--purple-400); }
        .footer-col-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 18px; }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-links a { font-size: 14px; color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--purple-300); }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 28px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .footer-copy { font-size: 13px; color: rgba(255,255,255,0.3); }
        .footer-bottom-links { display: flex; gap: 20px; }
        .footer-bottom-links a { font-size: 12px; color: rgba(255,255,255,0.35); text-decoration: none; }
        .footer-bottom-links a:hover { color: rgba(255,255,255,0.6); }

        #reading-progress {
          position: fixed; top: 0; left: 0; z-index: 200;
          height: 3px;
          background: linear-gradient(90deg, var(--purple-700), var(--purple-400));
          transition: width 0.1s linear;
        }

        .hamburger {
          display: none; flex-direction: column; gap: 5px; cursor: pointer;
          padding: 4px; background: none; border: none;
        }
        .hamburger span { width: 22px; height: 2px; background: var(--gray-700); border-radius: 2px; transition: all 0.3s; }
        @media (max-width: 900px) { .hamburger { display: flex; } }

        body.dark {
          --white: #0F0F14;
          --gray-50: #17171F;
          --gray-100: #1E1E2A;
          --gray-200: #28283A;
          --gray-300: #3A3A50;
          --gray-400: #6B6B8F;
          --gray-500: #9B9BBF;
          --gray-600: #BBBBD5;
          --gray-700: #D0D0E8;
          --gray-800: #E0E0F2;
          --gray-900: #F0F0FF;
        }
        body.dark #navbar { background: rgba(15,15,20,0.85); }
        body.dark .article-card,
        body.dark .editors-list-item,
        body.dark .collection-card,
        body.dark .author-card,
        body.dark .why-card,
        body.dark .testimonial-card { background: #1E1E2A; border-color: #28283A; }
      `}</style>

      {/* Reading Progress Indicator */}
      <div id="reading-progress" style={{ width: `${scrollProgress}%` }} />

      {/* ── ANNOUNCEMENT BAR ── */}
      {announcementVisible && (
        <div id="announcement">
          ✨ Bloggy 3.0 is here — AI writing tools, voice articles & collaborative spaces.
          <Link href="#">Explore what's new →</Link>
          <span className="close-btn" onClick={() => setAnnouncementVisible(false)}>✕</span>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              <span className="logo-dot"></span>
              Bloggy
            </Link>

            <div className="nav-links nav-links-desktop">
              <Link href="#trending">Trending</Link>
              <Link href="#topics">Topics</Link>
              <Link href="#editors">Editor's Picks</Link>
              <Link href="#authors">Authors</Link>
              <Link href="#podcasts">Podcasts</Link>
              <Link href="#newsletter" style={{ color: 'var(--purple-700)', fontWeight: 600 }}>Write →</Link>
            </div>

            <div className="nav-actions">
              <button className="nav-icon-btn" onClick={() => setSearchModalOpen(true)} title="Search">
                <Search size={18} />
              </button>
              <button className="nav-icon-btn" title="Notifications">
                <Bell size={18} />
              </button>
              <button className="nav-icon-btn" onClick={() => setIsDarkMode(!isDarkMode)} title="Dark mode">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="nav-avatar" title="Profile"></div>
              <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            display: 'flex', flexDirection: 'column', position: 'absolute', top: '68px', left: 0, right: 0,
            background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(20px)', padding: '16px 20px',
            gap: '8px', borderBottom: '1px solid rgba(109,40,217,0.1)', zIndex: 99
          }}>
            <Link href="#trending" onClick={() => setMobileMenuOpen(false)}>Trending</Link>
            <Link href="#topics" onClick={() => setMobileMenuOpen(false)}>Topics</Link>
            <Link href="#editors" onClick={() => setMobileMenuOpen(false)}>Editor's Picks</Link>
            <Link href="#authors" onClick={() => setMobileMenuOpen(false)}>Authors</Link>
            <Link href="#podcasts" onClick={() => setMobileMenuOpen(false)}>Podcasts</Link>
            <Link href="#newsletter" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--purple-700)', fontWeight: 600 }}>Write →</Link>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {searchModalOpen && (
        <div
          id="search-modal"
          style={{
            position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-start',
            justifyContent: 'center', paddingTop: '100px'
          }}
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: '20px', width: 'min(600px, 90%)',
              padding: '8px', boxShadow: '0 32px 80px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px' }}>
              <Search size={20} style={{ color: 'var(--gray-400)', flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search articles, authors, topics…"
                style={{
                  flex: 1, fontSize: '17px', border: 'none', outline: 'none',
                  fontFamily: "'Inter', sans-serif", color: 'var(--gray-900)', background: 'transparent'
                }}
              />
              <kbd
                style={{
                  fontSize: '11px', padding: '3px 6px', border: '1px solid var(--gray-200)',
                  borderRadius: '4px', color: 'var(--gray-400)', cursor: 'pointer'
                }}
                onClick={() => setSearchModalOpen(false)}
              >
                ESC
              </kbd>
            </div>
            <div style={{ borderTop: '1px solid var(--gray-100)', padding: '16px 20px' }}>
              <p style={{
                fontSize: '12px', color: 'var(--gray-400)', fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px'
              }}>
                Trending Searches
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span className="tag tag-purple" style={{ cursor: 'pointer' }}>AI Writing Tools</span>
                <span className="tag tag-purple" style={{ cursor: 'pointer' }}>Startup Stories</span>
                <span className="tag tag-purple" style={{ cursor: 'pointer' }}>Tech Culture</span>
                <span className="tag tag-purple" style={{ cursor: 'pointer' }}>Remote Work</span>
                <span className="tag tag-purple" style={{ cursor: 'pointer' }}>Future of Media</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-slides">
          {slides.map((url, idx) => (
            <div
              key={idx}
              className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url('${url}')` }}
            />
          ))}
        </div>

        <div className="hero-badge b1">
          <span className="badge-num">2.4M</span>
          <span className="badge-label">Monthly Readers</span>
        </div>
        <div className="hero-badge b2">
          <span className="badge-num">#1</span>
          <span className="badge-label">AI Publishing Platform</span>
        </div>

        <div className="slide-nav">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`slide-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-kicker">
                <span className="live-dot"></span>
                <span className="hero-category">Featured Story</span>
                <span className="tag tag-white" style={{ marginLeft: '4px' }}>⚡ Trending Now</span>
              </div>
              <h1 className="hero-headline">
                The Future of Writing<br />Is Intelligent, Personal<br />and Beautifully Human.
              </h1>
              <p className="hero-deck">
                Bloggy combines AI-powered publishing with editorial excellence.
                Reach millions of readers, grow your voice, and turn your ideas into impact.
              </p>
              <div className="hero-actions">
                <Link href="#newsletter" className="btn btn-primary">
                  <PenLine size={16} />
                  Start Writing Free
                </Link>
                <Link href="#trending" className="btn btn-ghost">
                  <PlayCircle size={16} />
                  Explore Stories
                </Link>
              </div>
              <div className="hero-meta">
                <div className="hero-author">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" alt="Editor" />
                  <div>
                    <div className="hero-author-name">Ava Sinclair</div>
                    <div className="hero-author-role">Editor in Chief · Bloggy</div>
                  </div>
                </div>
                <div className="hero-stats">
                  <div className="hero-stat">
                    <div className="hero-stat-num">8 min</div>
                    <div className="hero-stat-label">Read</div>
                  </div>
                  <div className="hero-stat">
                    <div className="hero-stat-num">12.4K</div>
                    <div className="hero-stat-label">Claps</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRENDING TODAY ── */}
      <section id="trending">
        <div className="container">
          <div className="section-header">
            <span className="section-label">🔥 Trending Today</span>
            <h2 className="section-title">Stories Everyone's Talking About</h2>
            <p className="section-subtitle">Hand-curated by our editorial team. Updated every hour with the most-read, most-shared pieces from across the platform.</p>
          </div>
          <div className="trending-grid">
            <div className="article-card">
              <div className="card-img-wrap">
                <span className="trending-num">01</span>
                <img className="card-img" src="https://images.unsplash.com/photo-1549399905-5d1bad747576?w=600&h=400&fit=crop&auto=format" alt="Technology article" loading="lazy" />
              </div>
              <div className="card-body">
                <span className="card-category">Artificial Intelligence</span>
                <h3 className="card-title">How GPT-5 Is Rewriting the Rules of Knowledge Work</h3>
                <p className="card-excerpt">The latest generation of language models isn't just autocompleting text — it's reshaping entire professional categories from legal research to medical diagnosis.</p>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Marcus Chen</span>
                  </div>
                  <span className="card-read-time">6 min read</span>
                </div>
              </div>
            </div>

            <div className="article-card">
              <div className="card-img-wrap">
                <span className="trending-num">02</span>
                <img className="card-img" src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&h=400&fit=crop&auto=format" alt="Startup article" loading="lazy" />
              </div>
              <div className="card-body">
                <span className="card-category">Startups</span>
                <h3 className="card-title">The Contrarian Playbook: Why the Best Founders Ignore Conventional Wisdom</h3>
                <p className="card-excerpt">A deep dive into the counter-intuitive decisions that created billion-dollar companies — and what they reveal about how markets actually work.</p>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Priya Nair</span>
                  </div>
                  <span className="card-read-time">9 min read</span>
                </div>
              </div>
            </div>

            <div className="article-card">
              <div className="card-img-wrap">
                <span className="trending-num">03</span>
                <img className="card-img" src="https://images.unsplash.com/photo-1664353655151-9d94a9170eb0?w=600&h=400&fit=crop&auto=format" alt="City article" loading="lazy" />
              </div>
              <div className="card-body">
                <span className="card-category">Culture & Society</span>
                <h3 className="card-title">The New Geography of Ambition: How Cities Are Competing for Talent</h3>
                <p className="card-excerpt">Remote work broke the monopoly of a handful of metros. Now smaller cities are reinventing themselves — and winning — in the war for creative talent.</p>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Jordan Ellis</span>
                  </div>
                  <span className="card-read-time">7 min read</span>
                </div>
              </div>
            </div>

            <div className="article-card">
              <div className="card-img-wrap">
                <span className="trending-num">04</span>
                <img className="card-img" src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&auto=format" alt="Design article" loading="lazy" />
              </div>
              <div className="card-body">
                <span className="card-category">Design</span>
                <h3 className="card-title">Designing for the Post-Screen Era: What Comes After the Rectangle</h3>
                <p className="card-excerpt">As spatial computing matures, the foundational principles of UI design are being challenged. Here's what forward-thinking designers are building for next.</p>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Sofia Reyes</span>
                  </div>
                  <span className="card-read-time">5 min read</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="#" className="btn btn-outline">
              View All Trending Stories <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BROWSE TOPICS ── */}
      <section id="topics">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Browse Topics</span>
            <h2 className="section-title">Find Your Obsession</h2>
            <p className="section-subtitle">From cutting-edge tech to contemplative travel writing — we have more than 500 curated topics for every kind of curious mind.</p>
          </div>
          <div className="topics-grid">
            {[
              { icon: '🤖', name: 'Artificial Intelligence', count: '14,230 articles' },
              { icon: '🚀', name: 'Startups', count: '9,840 articles' },
              { icon: '🎨', name: 'Design', count: '7,120 articles' },
              { icon: '🌍', name: 'Travel', count: '11,450 articles' },
              { icon: '💰', name: 'Finance', count: '6,390 articles' },
              { icon: '🧬', name: 'Science', count: '8,760 articles' },
              { icon: '📱', name: 'Technology', count: '18,200 articles' },
              { icon: '🎭', name: 'Culture', count: '5,900 articles' },
              { icon: '🏋️', name: 'Health & Wellness', count: '7,840 articles' },
              { icon: '📚', name: 'Education', count: '4,230 articles' },
              { icon: '🌱', name: 'Sustainability', count: '3,610 articles' },
              { icon: '🎵', name: 'Music & Audio', count: '2,990 articles' }
            ].map((topic, i) => (
              <div key={i} className="topic-card">
                <span className="topic-icon">{topic.icon}</span>
                <div className="topic-name">{topic.name}</div>
                <div className="topic-count">{topic.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITOR'S PICKS ── */}
      <section id="editors">
        <div className="container">
          <div className="section-header">
            <span className="section-label">✦ Editor's Picks</span>
            <h2 className="section-title">Curated with Care</h2>
            <p className="section-subtitle">Our editors spend hours every week surfacing the best long-form, investigative, and essayistic writing on the platform.</p>
          </div>
          <div className="editors-layout">
            <div className="editors-featured">
              <img src="https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?w=900&h=1100&fit=crop&auto=format" alt="Featured article" loading="lazy" />
              <div className="editors-featured-overlay">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <span className="tag tag-white">✦ Editor's Choice</span>
                  <span className="tag tag-white">Long Read</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '14px' }}>
                  Inside the Lab Where Scientists Are Teaching Machines to Dream
                </h2>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '20px', lineHeight: 1.6 }}>
                  A reported investigation into the world's most ambitious AI research programs — and the humans who can't stop building what they half-fear.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&auto=format" alt="Author" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '13px', color: '#fff' }}>Dr. James Okafor</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>12 min read · Aug 4, 2026</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="editors-list">
              {[
                { num: '02', title: 'The Loneliness of the Long-Form Writer in the Age of the Thread', author: 'Elena Vasquez', time: '8 min', img: 'https://images.unsplash.com/photo-1574856049959-d3134a3e592f?w=180&h=140&fit=crop&auto=format' },
                { num: '03', title: 'Color Theory Has Been Wrong for 200 Years. Now What?', author: 'Kenji Yamamoto', time: '6 min', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=180&h=140&fit=crop&auto=format' },
                { num: '04', title: "The 4-Day Work Week Is Not a Perk. It's a Competitive Moat.", author: 'Amara Johnson', time: '10 min', img: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=180&h=140&fit=crop&auto=format' },
                { num: '05', title: 'Why Every Philosopher Should Learn to Code (And Vice Versa)', author: 'Nadia Petrov', time: '11 min', img: 'https://images.unsplash.com/photo-1665686369011-f96e57d2b24f?w=180&h=140&fit=crop&auto=format' }
              ].map((item, idx) => (
                <div key={idx} className="editors-list-item">
                  <div className="editors-list-thumb">
                    <img src={item.img} alt="Article thumbnail" loading="lazy" />
                  </div>
                  <div className="editors-list-content">
                    <div className="editors-list-num">{item.num} ·</div>
                    <div className="editors-list-title">{item.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--gray-400)', marginTop: '4px', display: 'flex', gap: '10px' }}>
                      <span>{item.author}</span><span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <Link href="#" className="btn btn-outline btn-sm">See all picks</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST STORIES ── */}
      <section id="latest">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Latest Stories</span>
            <h2 className="section-title">Fresh from Our Writers</h2>
            <p className="section-subtitle">Published in the last 24 hours — the most recent voices, ideas, and investigations from across the Bloggy community.</p>
          </div>
          <div className="masonry-grid">
            <div className="masonry-item article-card">
              <div className="card-img-wrap" style={{ height: '160px' }}>
                <img className="card-img" src="https://images.unsplash.com/photo-1549399905-5d1bad747576?w=600&h=320&fit=crop&auto=format" alt="Tech article" loading="lazy" />
              </div>
              <div className="card-body">
                <span className="card-category">Technology</span>
                <h3 className="card-title">Apple's Vision Pro SDK Just Made Spatial Computing Accessible</h3>
                <p className="card-excerpt">The new developer tools could unlock an explosion of spatial apps — and democratize a category that felt locked behind hardware.</p>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Marcus Chen</span>
                  </div>
                  <span className="card-read-time">4 min</span>
                </div>
              </div>
            </div>

            <div className="masonry-item article-card">
              <div className="card-body" style={{ padding: '24px' }}>
                <span className="card-category">Philosophy</span>
                <h3 className="card-title" style={{ fontSize: '22px', marginBottom: '14px' }}>What Attention Economy Critics Get Wrong About Human Desire</h3>
                <p className="card-excerpt">The argument that platforms "steal" our attention treats desire as a fixed resource. But attention is generative — the more deliberately we spend it, the more of it we have.</p>
                <div style={{ padding: '16px', background: 'var(--purple-50)', borderRadius: 'var(--radius-sm)', margin: '12px 0', borderLeft: '3px solid var(--purple-500)' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '15px', color: 'var(--purple-800)', lineHeight: 1.55 }}>
                    "To reclaim your attention, you must first understand why you gave it away."
                  </p>
                </div>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Priya Nair</span>
                  </div>
                  <span className="card-read-time">11 min</span>
                </div>
              </div>
            </div>

            <div className="masonry-item article-card">
              <div className="card-img-wrap" style={{ height: '220px' }}>
                <img className="card-img" src="https://images.unsplash.com/photo-1664353655151-9d94a9170eb0?w=600&h=440&fit=crop&auto=format" alt="City article" loading="lazy" />
              </div>
              <div className="card-body">
                <span className="card-category">Urban Life</span>
                <h3 className="card-title">Lisbon Is Having a Moment. Can It Keep Its Soul?</h3>
                <p className="card-excerpt">As the Portuguese capital attracts a new wave of digital nomads and tech capital, longtime residents are asking what — and who — gets left behind.</p>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Jordan Ellis</span>
                  </div>
                  <span className="card-read-time">9 min</span>
                </div>
              </div>
            </div>

            <div className="masonry-item article-card">
              <div className="card-img-wrap" style={{ height: '180px' }}>
                <img className="card-img" src="https://images.unsplash.com/photo-1761123261084-53c40fe1e607?w=600&h=360&fit=crop&auto=format" alt="Workspace article" loading="lazy" />
              </div>
              <div className="card-body">
                <span className="card-category">Productivity</span>
                <h3 className="card-title">The Desk Setup That Added Two Hours to My Creative Day</h3>
                <p className="card-excerpt">A systematic approach to physical environment design — and why ergonomics is only the beginning of the conversation.</p>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Sofia Reyes</span>
                  </div>
                  <span className="card-read-time">5 min</span>
                </div>
              </div>
            </div>

            <div className="masonry-item article-card">
              <div className="card-body" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--purple-50), #fff)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="tag tag-purple">Deep Dive</span>
                </div>
                <span className="card-category">Science</span>
                <h3 className="card-title" style={{ fontSize: '20px', marginBottom: '12px' }}>The Microbiome Revolution Is Just Getting Started</h3>
                <p className="card-excerpt">New research on the gut-brain axis is overturning decades of assumptions in psychiatry — and opening genuinely strange therapeutic possibilities.</p>
                <div style={{ margin: '14px 0', display: 'flex', gap: '8px' }}>
                  <span className="tag tag-purple" style={{ fontSize: '10px' }}>Neuroscience</span>
                  <span className="tag tag-purple" style={{ fontSize: '10px' }}>Health</span>
                  <span className="tag tag-purple" style={{ fontSize: '10px' }}>Research</span>
                </div>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Dr. James Okafor</span>
                  </div>
                  <span className="card-read-time">13 min</span>
                </div>
              </div>
            </div>

            <div className="masonry-item article-card">
              <div className="card-img-wrap" style={{ height: '140px' }}>
                <img className="card-img" src="https://images.unsplash.com/photo-1774029764284-1e52eddb2e0f?w=600&h=280&fit=crop&auto=format" alt="Mobile article" loading="lazy" />
              </div>
              <div className="card-body">
                <span className="card-category">Finance</span>
                <h3 className="card-title">The Quiet Death of the Venture Capital Model</h3>
                <p className="card-excerpt">As returns compress and timelines lengthen, founders are discovering that bootstrap profitability is a better story than a Series A.</p>
                <div className="card-footer">
                  <div className="card-author">
                    <img className="card-avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop&auto=format" alt="Author" />
                    <span className="card-author-name">Priya Nair</span>
                  </div>
                  <span className="card-read-time">7 min</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="#" className="btn btn-primary">
              Load More Stories <ChevronDown size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── READING COLLECTIONS ── */}
      <section id="collections">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Collections</span>
            <h2 className="section-title">Curated Reading Lists</h2>
            <p className="section-subtitle">Multi-part series, thematic anthologies, and deep-dive reading programs curated by editors and expert contributors.</p>
          </div>
          <div className="collections-grid">
            <div className="collection-card">
              <div className="collection-header">
                <img src="https://images.unsplash.com/photo-1549399905-5d1bad747576?w=600&h=360&fit=crop&auto=format" alt="Collection" loading="lazy" />
                <div className="collection-header-overlay">
                  <span className="collection-icon">🤖</span>
                  <div className="collection-title-overlay">The AI Era</div>
                </div>
              </div>
              <div className="collection-body">
                <div className="collection-body-title">Understanding the AI Revolution</div>
                <div className="collection-meta">
                  <span>24 articles</span>
                  <span>~4 hrs total</span>
                  <span>Updated weekly</span>
                </div>
                <div className="collection-previews">
                  <img className="collection-preview-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=88&h=88&fit=crop&auto=format" alt="Author" loading="lazy" />
                  <img className="collection-preview-img" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=88&h=88&fit=crop&auto=format" alt="Author" loading="lazy" />
                  <img className="collection-preview-img" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=88&h=88&fit=crop&auto=format" alt="Author" loading="lazy" />
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--purple-600)' }}>+21</div>
                </div>
              </div>
            </div>

            <div className="collection-card">
              <div className="collection-header" style={{ background: 'linear-gradient(135deg, #1E3A5F, #2563EB)' }}>
                <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&h=360&fit=crop&auto=format" alt="Collection" loading="lazy" />
                <div className="collection-header-overlay">
                  <span className="collection-icon">🚀</span>
                  <div className="collection-title-overlay">Build & Launch</div>
                </div>
              </div>
              <div className="collection-body">
                <div className="collection-body-title">Founder's Survival Guide</div>
                <div className="collection-meta">
                  <span>18 articles</span>
                  <span>~3 hrs total</span>
                  <span>Staff pick</span>
                </div>
                <div className="collection-previews">
                  <img className="collection-preview-img" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=88&h=88&fit=crop&auto=format" alt="Author" loading="lazy" />
                  <img className="collection-preview-img" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=88&h=88&fit=crop&auto=format" alt="Author" loading="lazy" />
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--purple-600)' }}>+16</div>
                </div>
              </div>
            </div>

            <div className="collection-card">
              <div className="collection-header" style={{ background: 'linear-gradient(135deg, #064E3B, #10B981)' }}>
                <img src="https://images.unsplash.com/photo-1574856049959-d3134a3e592f?w=600&h=360&fit=crop&auto=format" alt="Collection" loading="lazy" />
                <div className="collection-header-overlay">
                  <span className="collection-icon">🌱</span>
                  <div className="collection-title-overlay">Creative Life</div>
                </div>
              </div>
              <div className="collection-body">
                <div className="collection-body-title">Making Things That Matter</div>
                <div className="collection-meta">
                  <span>31 articles</span>
                  <span>~5.5 hrs total</span>
                  <span>Reader's choice</span>
                </div>
                <div className="collection-previews">
                  <img className="collection-preview-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=88&h=88&fit=crop&auto=format" alt="Author" loading="lazy" />
                  <img className="collection-preview-img" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=88&h=88&fit=crop&auto=format" alt="Author" loading="lazy" />
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--purple-600)' }}>+29</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED AUTHORS ── */}
      <section id="authors">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Writers</span>
            <h2 className="section-title">Voices Worth Following</h2>
            <p className="section-subtitle">Independent thinkers, domain experts, and investigative reporters — the writers who make Bloggy worth opening every morning.</p>
          </div>
          <div className="authors-grid">
            {[
              { id: 1, name: 'Marcus Chen', role: 'Tech & AI · San Francisco', tags: ['AI', 'Hardware'], followers: '84K', articles: '142', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&auto=format' },
              { id: 2, name: 'Priya Nair', role: 'Startups & Venture · Mumbai', tags: ['VC', 'Founders'], followers: '121K', articles: '209', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&auto=format' },
              { id: 3, name: 'Sofia Reyes', role: 'Design & Creative · Barcelona', tags: ['Design', 'UX'], followers: '67K', articles: '88', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&auto=format' },
              { id: 4, name: 'Dr. James Okafor', role: 'Science & Medicine · London', tags: ['Science', 'Bio'], followers: '98K', articles: '173', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&auto=format' }
            ].map((author) => {
              const isFollowing = followingState[author.id];
              return (
                <div key={author.id} className="author-card">
                  <div className="author-avatar-wrap">
                    <img className="author-avatar" src={author.img} alt={author.name} loading="lazy" />
                    <div className="author-verified">
                      <Check size={11} color="#fff" />
                    </div>
                  </div>
                  <div className="author-name">{author.name}</div>
                  <div className="author-role">{author.role}</div>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {author.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tag tag-purple" style={{ fontSize: '10px' }}>{tag}</span>
                    ))}
                  </div>
                  <button
                    className={`author-follow-btn ${isFollowing ? 'following' : ''}`}
                    onClick={() => toggleFollow(author.id)}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <div className="author-stats">
                    <div className="author-stat">
                      <div className="author-stat-num">{author.followers}</div>
                      <div className="author-stat-label">Followers</div>
                    </div>
                    <div className="author-stat">
                      <div className="author-stat-num">{author.articles}</div>
                      <div className="author-stat-label">Articles</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="#" className="btn btn-outline">Discover All Authors <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── WHY BLOGGY ── */}
      <section id="why">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Bloggy</span>
            <h2 className="section-title">Built for Serious Writers</h2>
            <p className="section-subtitle">Everything you need to write, publish, and grow — without the noise, distractions, or algorithmic compromises of other platforms.</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-wrap"><Cpu size={24} /></div>
              <div className="why-title">AI Writing Assistant</div>
              <div className="why-desc">Research, outline, draft, and refine — our AI co-pilot accelerates your writing without replacing your voice. It learns your style and gets out of the way.</div>
            </div>
            <div className="why-card">
              <div className="why-icon-wrap"><TrendingUp size={24} /></div>
              <div className="why-title">Audience Growth Engine</div>
              <div className="why-desc">Smart distribution puts your work in front of readers who are genuinely interested. No gaming the algorithm — just organic, intent-driven discovery.</div>
            </div>
            <div className="why-card">
              <div className="why-icon-wrap"><DollarSign size={24} /></div>
              <div className="why-title">Honest Monetization</div>
              <div className="why-desc">Earn from reader memberships, pay-per-article, sponsored content, and tips. Transparent revenue splits, no hidden fees, no algorithmic suppression.</div>
            </div>
            <div className="why-card">
              <div className="why-icon-wrap"><ShieldCheck size={24} /></div>
              <div className="why-title">Editorial Independence</div>
              <div className="why-desc">Your work belongs to you. No platform lock-in, full data export, and editorial guidelines that protect nuance instead of flattening it.</div>
            </div>
            <div className="why-card">
              <div className="why-icon-wrap"><Headphones size={24} /></div>
              <div className="why-title">Audio & Multimedia</div>
              <div className="why-desc">Turn any article into a professional audio piece with one click. Embed video, interactive charts, and code — publishing that matches how ideas actually live.</div>
            </div>
            <div className="why-card">
              <div className="why-icon-wrap"><BarChart3 size={24} /></div>
              <div className="why-title">Deep Analytics</div>
              <div className="why-desc">Understand not just how many people read, but how — reading time, scroll depth, share paths, and cohort retention over time. Insight that actually informs craft.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATISTICS ── */}
      <section id="statistics">
        <div className="container">
          <div className="section-header" style={{ color: '#fff' }}>
            <span className="section-label" style={{ color: 'var(--purple-300)' }}>By the Numbers</span>
            <h2 className="section-title" style={{ color: '#fff' }}>The Platform in Figures</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>Real numbers. Real growth. Real writers building real audiences every single day.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-num">2.4M<span className="stat-suffix">+</span></div>
              <div className="stat-label">Monthly Active Readers</div>
              <div className="stat-sub">Up 34% year over year</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">48K</div>
              <div className="stat-label">Active Writers</div>
              <div className="stat-sub">From 140+ countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">920K</div>
              <div className="stat-label">Articles Published</div>
              <div className="stat-sub">And counting</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">$8.2M</div>
              <div className="stat-label">Paid to Writers</div>
              <div className="stat-sub">Since 2023</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our Readers Say</h2>
            <p className="section-subtitle">From morning commuters to late-night thinkers — the Bloggy community spans every timezone and occupation.</p>
          </div>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div className="testimonials-track" style={{ transform: `translateX(-${testimonialOffset}px)` }}>
              <div className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"Bloggy changed my mornings. I used to scroll through a dozen apps looking for something worth reading — now I open Bloggy first and I'm done. The editorial quality is just on another level."</p>
                <div className="testimonial-author">
                  <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=88&h=88&fit=crop&auto=format" alt="Reader" loading="lazy" />
                  <div>
                    <div className="testimonial-author-name">Ava Sinclair <span style={{ color: 'var(--purple-500)', marginLeft: '4px' }}>✓</span></div>
                    <div className="testimonial-author-handle">Product Designer · @avasinclair</div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"As a writer, I've tried everything — Substack, Ghost, Medium. Bloggy is the only platform where I actually feel like the tool is on my side. The AI assistant is genuinely useful without being intrusive."</p>
                <div className="testimonial-author">
                  <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=88&h=88&fit=crop&auto=format" alt="Reader" loading="lazy" />
                  <div>
                    <div className="testimonial-author-name">Jordan Ellis <span style={{ color: 'var(--purple-500)', marginLeft: '4px' }}>✓</span></div>
                    <div className="testimonial-author-handle">Journalist & Author · @jordanellis</div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"I grew my audience from 400 to 60,000 followers in eight months on Bloggy. The discovery algorithm actually works — it finds people who want to read what you write, not just who you already know."</p>
                <div className="testimonial-author">
                  <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=88&h=88&fit=crop&auto=format" alt="Reader" loading="lazy" />
                  <div>
                    <div className="testimonial-author-name">Priya Nair <span style={{ color: 'var(--purple-500)', marginLeft: '4px' }}>✓</span></div>
                    <div className="testimonial-author-handle">VC Writer & Analyst · @priyanair</div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"The reading experience is simply the best on the web. Typography, layout, focus mode — it feels like someone actually thought about what it means to read on a screen. Rare and refreshing."</p>
                <div className="testimonial-author">
                  <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=88&h=88&fit=crop&auto=format" alt="Reader" loading="lazy" />
                  <div>
                    <div className="testimonial-author-name">Dr. James Okafor <span style={{ color: 'var(--purple-500)', marginLeft: '4px' }}>✓</span></div>
                    <div className="testimonial-author-handle">Scientist & Writer · @jamesokafor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonials-nav">
            <button className="testimonials-nav-btn" onClick={() => handleScrollTestimonials(-1)}>
              <ChevronLeft size={18} />
            </button>
            <button className="testimonials-nav-btn" onClick={() => handleScrollTestimonials(1)}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section id="newsletter">
        <div className="container">
          <div className="newsletter-inner">
            <span className="section-label" style={{ color: 'var(--purple-300)' }}>Stay Informed</span>
            <h2 className="newsletter-title">The Weekly Brief from Bloggy</h2>
            <p className="newsletter-sub">Five unmissable stories, one editor's note, and a pick you won't find anywhere else. Every Thursday. Free forever.</p>
            <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
              <input type="email" className="newsletter-input" placeholder="you@yourcompany.com" required />
              <button type="submit" className="btn btn-primary">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
            <p className="newsletter-note">No spam. Unsubscribe in one click. 240,000+ readers already subscribed.</p>
          </div>
        </div>
      </section>

      {/* ── MOBILE APP ── */}
      <section id="mobile-app">
        <div className="container">
          <div className="app-layout">
            <div className="app-content">
              <div className="section-header">
                <span className="section-label">Mobile App</span>
                <h2 className="section-title">Read Anywhere. Write Everywhere.</h2>
                <p className="section-subtitle">The full Bloggy experience — in your pocket. Offline reading, voice articles, and AI writing tools that work on the go.</p>
              </div>
              <div className="app-features">
                <div className="app-feature">
                  <div className="app-feature-icon"><WifiOff size={20} /></div>
                  <div>
                    <div className="app-feature-title">Offline Reading Mode</div>
                    <div className="app-feature-desc">Save any article for offline access. Perfect for flights, commutes, and places with spotty signal.</div>
                  </div>
                </div>
                <div className="app-feature">
                  <div className="app-feature-icon"><Mic size={20} /></div>
                  <div>
                    <div className="app-feature-title">Voice Narration</div>
                    <div className="app-feature-desc">Listen to any article with studio-quality AI voice. Adjust speed, skip, and resume exactly where you left off.</div>
                  </div>
                </div>
                <div className="app-feature">
                  <div className="app-feature-icon"><Bell size={20} /></div>
                  <div>
                    <div className="app-feature-title">Smart Notifications</div>
                    <div className="app-feature-desc">Get notified when your followed authors publish — nothing else. No engagement bait, no spam.</div>
                  </div>
                </div>
              </div>
              <div className="app-stores">
                <Link href="#" className="app-store-btn">
                  <Smartphone size={20} />
                  <div>
                    <span className="app-store-label">Download on the</span>
                    <span className="app-store-name">App Store</span>
                  </div>
                </Link>
                <Link href="#" className="app-store-btn">
                  <Tablet size={20} />
                  <div>
                    <span className="app-store-label">Get it on</span>
                    <span className="app-store-name">Google Play</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="app-phone-mockup">
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <div className="phone-screen-inner">
                    <div className="phone-app-bar">
                      <span className="phone-logo">✦ Bloggy</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--gray-200)' }}></div>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--gray-200)' }}></div>
                      </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '7px', fontWeight: 700, color: 'var(--purple-600)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>🔥 Trending</div>
                      <div className="phone-article">
                        <div className="phone-article-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549399905-5d1bad747576?w=264&h=160&fit=crop&auto=format')" }}></div>
                        <div className="phone-article-body">
                          <div className="phone-article-cat">AI</div>
                          <div className="phone-article-title">How GPT-5 Is Rewriting Knowledge Work</div>
                        </div>
                      </div>
                      <div className="phone-article">
                        <div className="phone-article-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=264&h=160&fit=crop&auto=format')" }}></div>
                        <div className="phone-article-body">
                          <div className="phone-article-cat">Startups</div>
                          <div className="phone-article-title">The Contrarian Founder Playbook</div>
                        </div>
                      </div>
                      <div className="phone-article">
                        <div className="phone-article-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1561070791-2526d30994b5?w=264&h=160&fit=crop&auto=format')" }}></div>
                        <div className="phone-article-body">
                          <div className="phone-article-cat">Design</div>
                          <div className="phone-article-title">After the Rectangle: Post-Screen UI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PODCASTS ── */}
      <section id="podcasts">
        <div className="container">
          <div className="section-header">
            <span className="section-label">🎙 Podcasts</span>
            <h2 className="section-title">Ideas Worth Listening To</h2>
            <p className="section-subtitle">Long-form audio conversations with the people shaping culture, technology, and the future of ideas.</p>
          </div>
          <div className="podcast-grid">
            {[
              { title: 'The Intelligence Layer', host: 'Hosted by Marcus Chen · Ep. 84', time: '1:14:32', img: 'https://images.unsplash.com/photo-1549399905-5d1bad747576?w=144&h=144&fit=crop&auto=format' },
              { title: 'Venture Frequency', host: 'Hosted by Priya Nair · Ep. 121', time: '58:04', img: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=144&h=144&fit=crop&auto=format' },
              { title: 'Deep Work Sessions', host: 'Hosted by Sofia Reyes · Ep. 47', time: '44:18', img: 'https://images.unsplash.com/photo-1574856049959-d3134a3e592f?w=144&h=144&fit=crop&auto=format' },
              { title: 'City Futures', host: 'Hosted by Jordan Ellis · Ep. 33', time: '1:02:51', img: 'https://images.unsplash.com/photo-1664353655151-9d94a9170eb0?w=144&h=144&fit=crop&auto=format' },
              { title: 'Science Unlocked', host: 'Hosted by Dr. James Okafor · Ep. 68', time: '1:28:17', img: 'https://images.unsplash.com/photo-1761123261084-53c40fe1e607?w=144&h=144&fit=crop&auto=format' },
              { title: 'The Creative Brief', host: 'Various hosts · Ep. 92', time: '39:44', img: 'https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=144&h=144&fit=crop&auto=format' }
            ].map((pod, i) => (
              <div key={i} className="podcast-card">
                <img className="podcast-art" src={pod.img} alt="Podcast" loading="lazy" />
                <div className="podcast-content">
                  <div className="podcast-title">{pod.title}</div>
                  <div className="podcast-host">{pod.host}</div>
                  <div className="podcast-meta">
                    <span className="podcast-duration">{pod.time}</span>
                    <button className="podcast-play">
                      <Play size={12} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--purple-500),var(--purple-400))', marginRight: '4px' }}></span>
                Bloggy
              </div>
              <p className="footer-desc">The premium AI-powered publishing platform for writers who believe ideas still matter — and readers who prove it every day.</p>
              <div className="footer-socials">
                <Link href="#" className="footer-social" title="Twitter/X">𝕏</Link>
                <Link href="#" className="footer-social" title="LinkedIn" style={{ fontSize: '13px', fontWeight: 700 }}>in</Link>
                <Link href="#" className="footer-social" title="Instagram" style={{ fontSize: '14px' }}>◎</Link>
                <Link href="#" className="footer-social" title="GitHub" style={{ fontSize: '13px' }}>⌥</Link>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Platform</div>
              <ul className="footer-links">
                <li><Link href="#">Explore Stories</Link></li>
                <li><Link href="#">Browse Topics</Link></li>
                <li><Link href="#">Trending Now</Link></li>
                <li><Link href="#">Collections</Link></li>
                <li><Link href="#">Podcasts</Link></li>
                <li><Link href="#">Newsletter</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">For Writers</div>
              <ul className="footer-links">
                <li><Link href="#">Start Writing</Link></li>
                <li><Link href="#">AI Tools</Link></li>
                <li><Link href="#">Monetization</Link></li>
                <li><Link href="#">Analytics</Link></li>
                <li><Link href="#">Partner Program</Link></li>
                <li><Link href="#">Style Guide</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Editorial Team</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Press Kit</Link></li>
                <li><Link href="#">Investors</Link></li>
                <li><Link href="#">Blog</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Support</div>
              <ul className="footer-links">
                <li><Link href="#">Help Center</Link></li>
                <li><Link href="#">Community</Link></li>
                <li><Link href="#">Contact Us</Link></li>
                <li><Link href="#">API Docs</Link></li>
                <li><Link href="#">Status Page</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2026 Bloggy, Inc. All rights reserved. Made with care, published with purpose.</div>
            <div className="footer-bottom-links">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Cookie Settings</Link>
              <Link href="#">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}