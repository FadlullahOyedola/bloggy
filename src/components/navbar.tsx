import React from 'react';
import Link from 'next/link';
import { Search, Bell, Moon, Sun } from 'lucide-react';
import logo from '@/app/logo.png.webp';

type Props = {
    isScrolled: boolean;
    isDarkMode: boolean;
    setIsDarkMode: (v: boolean) => void;
    setSearchModalOpen: (v: boolean) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (v: boolean) => void;
};

export default function Navbar({ isScrolled, isDarkMode, setIsDarkMode, setSearchModalOpen, mobileMenuOpen, setMobileMenuOpen }: Props) {
    const logoSrc = typeof logo === 'string' ? logo : logo.src;

    return (
        <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
            <div className="container">
                <div className="nav-inner">
                    <Link href="/" className="nav-logo">
                        <img src={logoSrc} alt="Bloggy logo" className="h-9 w-auto object-contain" />
                    </Link>

                    <div className="nav-links nav-links-desktop">
                        <Link href="#trending">Trending</Link>
                        <Link href="#topics">Topics</Link>
                        <Link href="#editors">Editor's Picks</Link>
                        <Link href="#authors">Authors</Link>
                        <Link href="#podcasts">Podcasts</Link>
                        <Link href="#newsletter" className="cta-link">Write →</Link>
                    </div>

                    <div className="nav-actions">
                        <button className="nav-icon-btn" onClick={() => setSearchModalOpen(true)} aria-label="Search">
                            <Search size={18} />
                        </button>
                        <button className="nav-icon-btn" aria-label="Notifications">
                            <Bell size={18} />
                        </button>
                        <button className="nav-icon-btn" onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle dark mode">
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <Link href="#" className="btn-primary">Get Started</Link>

                        <button className="hamburger" aria-label="Menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="mobile-drawer" role="dialog" aria-label="Mobile menu">
                    <Link href="#trending" onClick={() => setMobileMenuOpen(false)}>Trending</Link>
                    <Link href="#topics" onClick={() => setMobileMenuOpen(false)}>Topics</Link>
                    <Link href="#editors" onClick={() => setMobileMenuOpen(false)}>Editor's Picks</Link>
                    <Link href="#authors" onClick={() => setMobileMenuOpen(false)}>Authors</Link>
                    <Link href="#podcasts" onClick={() => setMobileMenuOpen(false)}>Podcasts</Link>
                    <Link href="#newsletter" onClick={() => setMobileMenuOpen(false)} className="cta-link">Write →</Link>
                </div>
            )}
        </nav>
    );
}
