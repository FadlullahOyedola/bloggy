"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/app/logo.png.webp";
import {
    Sparkles,
    Search,
    Bell,
    ChevronDown,
    Home,
    Compass,
    Users,
    Tag,
    Bookmark,
    PlusSquare,
    PenTool,
    BarChart3,
    User,
    Settings,
    LogOut,
    Image as ImageIcon,
    Link as LinkIcon,
    Video,
    FileText,
    CheckCircle2,
    Share2,
    Heart,
    MessageCircle,
    MoreHorizontal,
    X,
    Menu,
    Edit3,
    HelpCircle,
    TrendingUp,
    BookOpen,
    Loader2,
    Send,
    Eye,
    Filter,
    Check,
    Copy,
    ThumbsUp,
    Smile,
    Flame,
    Award,
    Clock,
    Zap,
    Globe,
    Plus,
    Trash2,
    RefreshCw,
    ExternalLink,
    ChevronRight,
    SlidersHorizontal,
} from "lucide-react";

// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface Comment {
    id: string;
    authorName: string;
    authorHandle: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
    likes: number;
    isLiked?: boolean;
}

interface Post {
    id: string;
    authorName: string;
    authorHandle: string;
    authorAvatar: string;
    isVerified: boolean;
    content: string;
    mediaUrl?: string;
    mediaType?: "image" | "link" | "video";
    timestamp: string;
    likes: number;
    commentsCount: number;
    comments: Comment[];
    shares: number;
    isLiked?: boolean;
    isSaved?: boolean;
    tags?: string[];
    readingTime?: string;
}

interface NotificationItem {
    id: string;
    type: "like" | "comment" | "follow" | "repost";
    user: string;
    userAvatar: string;
    action: string;
    timestamp: string;
    read: boolean;
}

interface SuggestedAuthor {
    id: string;
    name: string;
    handle: string;
    role: string;
    avatar: string;
    followersCount: number;
    isFollowing: boolean;
}

interface TopicItem {
    id: string;
    name: string;
    postCount: number;
    isFollowing: boolean;
}

// ============================================================================
// Main Component
// ============================================================================

export default function BloggyDashboardPage() {
    const router = useRouter();
    const logoSrc = typeof logo === "string" ? logo : logo.src;

    // --------------------------------------------------------------------------
    // User Session State (Dynamic Session Load from Neon Database)
    // --------------------------------------------------------------------------
    const [isLoadingSession, setIsLoadingSession] = useState(true);
    const [user, setUser] = useState({
        id: "",
        name: "",
        username: "",
        email: "",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        coverPhoto: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        headline: "",
        bio: "",
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
        articlesCount: 0,
    });

    // --------------------------------------------------------------------------
    // Navigation & Interactive UI States
    // --------------------------------------------------------------------------
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [feedFilter, setFeedFilter] = useState<"forYou" | "following" | "latest" | "saved">("forYou");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [dismissQuote, setDismissQuote] = useState(false);

    // Reaction Popup State per Post ID
    const [activeReactionPostId, setActiveReactionPostId] = useState<string | null>(null);

    // Active Collapsible Comment Drawer
    const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
    const [newCommentInputs, setNewCommentInputs] = useState<{ [postId: string]: string }>({});

    // Share Modal State
    const [shareModalPost, setShareModalPost] = useState<Post | null>(null);
    const [copiedPostLink, setCopiedPostLink] = useState(false);

    // --------------------------------------------------------------------------
    // Post Creator Form State
    // --------------------------------------------------------------------------
    const [postContent, setPostContent] = useState("");
    const [mediaType, setMediaType] = useState<"image" | "link" | "video" | null>(null);
    const [mediaUrlInput, setMediaUrlInput] = useState("");
    const [showMediaInput, setShowMediaInput] = useState(false);
    const [selectedTag, setSelectedTag] = useState<string>("General");
    const [isPublishing, setIsPublishing] = useState(false);

    // --------------------------------------------------------------------------
    // Mock Data Collections for Feed, Notifications, Topics & Authors
    // --------------------------------------------------------------------------

    // Notifications
    const [notifications, setNotifications] = useState<NotificationItem[]>([
        {
            id: "n-1",
            type: "like",
            user: "Sarah Williams",
            userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            action: "liked your post about Next.js 15 Server Actions",
            timestamp: "10m ago",
            read: false,
        },
        {
            id: "n-2",
            type: "follow",
            user: "David Cole",
            userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            action: "started following your writing profile",
            timestamp: "1h ago",
            read: false,
        },
        {
            id: "n-3",
            type: "comment",
            user: "Aisha Ibrahim",
            userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
            action: "commented: 'Great insights on discourse analysis!'",
            timestamp: "3h ago",
            read: true,
        },
    ]);

    // Main Posts Feed
    const [posts, setPosts] = useState<Post[]>([
        {
            id: "post-101",
            authorName: "Sarah Williams",
            authorHandle: "@sarahwrites",
            authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            isVerified: true,
            content: "Just published our deep dive into Next.js 15 Server Actions & Prisma performance optimizations on Neon PostgreSQL! Check out the architecture benchmarks below. 🚀 What are your thoughts on edge runtime ORMs?",
            mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
            mediaType: "image",
            timestamp: "2h ago",
            readingTime: "2 min read",
            likes: 142,
            commentsCount: 3,
            shares: 12,
            isLiked: false,
            isSaved: false,
            tags: ["#ArtificialIntelligence", "#Technology", "#WebDev"],
            comments: [
                {
                    id: "c-1",
                    authorName: "David Cole",
                    authorHandle: "@davidcode",
                    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
                    content: "The Prisma connection pooling optimizations on serverless Neon endpoints really reduced cold starts for us!",
                    timestamp: "1h ago",
                    likes: 5,
                },
                {
                    id: "c-2",
                    authorName: "Alex Vance",
                    authorHandle: "@alexvance",
                    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
                    content: "Awesome benchmarks! Would love to see how this compares against Drizzle ORM.",
                    timestamp: "45m ago",
                    likes: 2,
                },
            ],
        },
        {
            id: "post-102",
            authorName: "David Cole",
            authorHandle: "@davidcode",
            authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            isVerified: true,
            content: "Language shapes digital identity in subtle ways. Exploring how Critical Discourse Analysis applies to online communities and algorithmic media feeds. Full essay coming this weekend! 📝✨",
            timestamp: "5h ago",
            readingTime: "1 min read",
            likes: 89,
            commentsCount: 1,
            shares: 6,
            isLiked: true,
            isSaved: true,
            tags: ["#Linguistics", "#DiscourseAnalysis", "#Design"],
            comments: [
                {
                    id: "c-3",
                    authorName: "Sarah Williams",
                    authorHandle: "@sarahwrites",
                    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
                    content: "Looking forward to this essay! CDA is so underrated in UX content strategy.",
                    timestamp: "2h ago",
                    likes: 4,
                },
            ],
        },
        {
            id: "post-103",
            authorName: "Aisha Ibrahim",
            authorHandle: "@aishadesign",
            authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
            isVerified: false,
            content: "Minimalist design isn't about removing elements — it's about adding clarity. Here's a preview of our new UI system for editorial blogs. Clean typography meets dark mode elegance.",
            mediaUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
            mediaType: "image",
            timestamp: "8h ago",
            readingTime: "3 min read",
            likes: 230,
            commentsCount: 0,
            shares: 28,
            isLiked: false,
            isSaved: false,
            tags: ["#Design", "#UIUX", "#Minimalism"],
            comments: [],
        },
    ]);

    // Suggested Authors
    const [suggestedAuthors, setSuggestedAuthors] = useState<SuggestedAuthor[]>([
        {
            id: "sa-1",
            name: "Sarah Williams",
            handle: "@sarahwrites",
            role: "AI Researcher & Author",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            followersCount: 1420,
            isFollowing: false,
        },
        {
            id: "sa-2",
            name: "David Cole",
            handle: "@davidcode",
            role: "Software Engineer",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            followersCount: 980,
            isFollowing: false,
        },
        {
            id: "sa-3",
            name: "Aisha Ibrahim",
            handle: "@aishadesign",
            role: "UX Lead & Essayist",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
            followersCount: 2310,
            isFollowing: false,
        },
        {
            id: "sa-4",
            name: "Marcus Vance",
            handle: "@marcusv",
            role: "Fintech & Product Strategy",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
            followersCount: 850,
            isFollowing: false,
        },
    ]);

    // User Topics
    const [userTopics, setUserTopics] = useState<TopicItem[]>([
        { id: "t-1", name: "Artificial Intelligence", postCount: 124, isFollowing: true },
        { id: "t-[#ArtificialIntelligence]", name: "Technology", postCount: 98, isFollowing: true },
        { id: "t-3", name: "Programming", postCount: 76, isFollowing: true },
        { id: "t-[#Linguistics]", name: "Design & UX", postCount: 52, isFollowing: true },
        { id: "t-[#Design]", name: "Linguistics & Discourse", postCount: 31, isFollowing: true },
        { id: "t-6", name: "Startups & Product", postCount: 45, isFollowing: false },
    ]);

    // Featured Highlights / Stories
    const [highlights] = useState([
        { id: "h-1", title: "Next.js 15 Guide", author: "Sarah W.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
        { id: "h-2", title: "CDA Frameworks", author: "David C.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
        { id: "h-3", title: "Minimal UI/UX", author: "Aisha I.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
        { id: "h-4", title: "Neon DB Tips", author: "Marcus V.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
    ]);

    // --------------------------------------------------------------------------
    // Fetch Authenticated User Session from Neon Database
    // --------------------------------------------------------------------------
    useEffect(() => {
        async function fetchUserSession() {
            try {
                const res = await fetch("/api/user/me");
                if (res.ok) {
                    const data = await res.json();
                    const emailPrefix = data.email ? data.email.split("@")[0] : "User";
                    const formattedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

                    setUser({
                        id: data.id || "user-session-id",
                        name: data.displayName || data.name || formattedName,
                        username: data.username || emailPrefix.toLowerCase(),
                        email: data.email || "",
                        avatar: data.avatar || data.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
                        coverPhoto: data.coverPhoto || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
                        headline: data.headline || "Content Creator & Reader",
                        bio: data.bio || "Welcome to my Bloggy workspace.",
                        followersCount: data.followersCount || 0,
                        followingCount: data.followingCount || 0,
                        postsCount: data.postsCount || 1,
                        articlesCount: data.articlesCount || 0,
                    });
                }
            } catch (err) {
                console.error("Session fetch error:", err);
            } finally {
                setIsLoadingSession(false);
            }
        }
        fetchUserSession();
    }, []);

    // Time-of-day greeting helper
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    // Logout handler
    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } catch (e) {
            console.warn("Logging out session...");
        } finally {
            localStorage.clear();
            window.location.href = "/login";
        }
    };

    // Create Post Submission Handler
    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!postContent.trim()) return;

        setIsPublishing(true);

        const newPost: Post = {
            id: `post-${Date.now()}`,
            authorName: user.name || "User",
            authorHandle: `@${user.username || "user"}`,
            authorAvatar: user.avatar,
            isVerified: true,
            content: postContent,
            mediaUrl: mediaUrlInput || undefined,
            mediaType: mediaType || undefined,
            timestamp: "Just now",
            readingTime: "1 min read",
            likes: 0,
            commentsCount: 0,
            comments: [],
            shares: 0,
            isLiked: false,
            isSaved: false,
            tags: [`#${selectedTag.replace(/\s+/g, "")}`],
        };

        // Simulate API posting delay
        setTimeout(() => {
            setPosts([newPost, ...posts]);
            setUser((prev) => ({ ...prev, postsCount: prev.postsCount + 1 }));

            // Reset Form
            setPostContent("");
            setMediaUrlInput("");
            setMediaType(null);
            setShowMediaInput(false);
            setIsPublishing(false);
        }, 400);
    };

    // Toggle Author Follow Status
    const toggleFollowAuthor = (id: string) => {
        setSuggestedAuthors((prev) =>
            prev.map((author) => {
                if (author.id === id) {
                    const nextState = !author.isFollowing;
                    setUser((u) => ({
                        ...u,
                        followingCount: nextState ? u.followingCount + 1 : Math.max(0, u.followingCount - 1),
                    }));
                    return { ...author, isFollowing: nextState };
                }
                return author;
            })
        );
    };

    // Toggle Topic Follow Status
    const toggleFollowTopic = (id: string) => {
        setUserTopics((prev) =>
            prev.map((t) => (t.id === id ? { ...t, isFollowing: !t.isFollowing } : t))
        );
    };

    // Toggle Post Like
    const toggleLikePost = (id: string) => {
        setPosts((prev) =>
            prev.map((p) => {
                if (p.id === id) {
                    const isLiked = !p.isLiked;
                    return {
                        ...p,
                        isLiked,
                        likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
                    };
                }
                return p;
            })
        );
    };

    // Toggle Post Saved/Bookmarked
    const toggleSavePost = (id: string) => {
        setPosts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, isSaved: !p.isSaved } : p))
        );
    };

    // Comment Submission
    const handleAddComment = (postId: string) => {
        const inputVal = newCommentInputs[postId];
        if (!inputVal || !inputVal.trim()) return;

        const newComment: Comment = {
            id: `c-${Date.now()}`,
            authorName: user.name || "User",
            authorHandle: `@${user.username || "user"}`,
            authorAvatar: user.avatar,
            content: inputVal.trim(),
            timestamp: "Just now",
            likes: 0,
        };

        setPosts((prev) =>
            prev.map((p) => {
                if (p.id === postId) {
                    return {
                        ...p,
                        commentsCount: p.commentsCount + 1,
                        comments: [...p.comments, newComment],
                    };
                }
                return p;
            })
        );

        setNewCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    };

    // Search submission
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/discover?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Filter feed calculation
    const displayedPosts = posts.filter((post) => {
        if (feedFilter === "saved") return post.isSaved;
        if (feedFilter === "following") return post.isLiked || post.isSaved;
        return true;
    });

    const markAllNotificationsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    // Show full page loader while session loads
    if (isLoadingSession) {
        return (
            <div className="min-h-screen bg-[#FAF8FF] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-9 h-9 text-[#6D28D9] animate-spin" />
                <p className="text-xs font-bold text-slate-500 tracking-wide">
                    Loading your Bloggy workspace...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFD] text-slate-900 font-sans flex flex-col relative selection:bg-[#6D28D9] selection:text-white">
            {/* ====================================================================
          1. TOP NAVIGATION BAR
          ==================================================================== */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
                {/* Left Side Logo & Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 rounded-xl bg-slate-50 text-slate-700 hover:text-[#6D28D9] lg:hidden cursor-pointer transition-colors"
                    >
                        <Menu size={20} />
                    </button>

                    <Link href="/" className="flex items-center gap-2 group">
                        <img src={logoSrc} alt="Bloggy logo" className="h-8 w-auto group-hover:scale-105 transition-transform" />
                    </Link>
                </div>

                {/* Center Search Input with Autocomplete Preview */}
                <div className="hidden md:block flex-1 max-w-md mx-6 relative">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <Search className="absolute left-3.5 top-2.5 text-slate-400" size={15} />
                        <input
                            type="text"
                            placeholder="Search Bloggy (Posts, Articles, Authors, Topics...)"
                            value={searchQuery}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200/80 rounded-full pl-9 pr-8 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-all shadow-xs"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </form>

                    {/* Search Quick Popup */}
                    {isSearchFocused && searchQuery.length > 0 && (
                        <div className="absolute top-11 left-0 right-0 bg-white border border-slate-100 rounded-2xl shadow-xl p-3 z-50 space-y-2 text-xs">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                                Quick Results
                            </div>
                            <Link
                                href={`/discover?q=${encodeURIComponent(searchQuery)}`}
                                className="flex items-center gap-2 p-2 rounded-xl hover:bg-purple-50 text-[#6D28D9] font-semibold"
                            >
                                <Search size={14} /> Search for "{searchQuery}"
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right Side Header Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/creator/post"
                        className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-xs rounded-full shadow-md shadow-purple-500/10 transition-all active:scale-95"
                    >
                        <PlusSquare size={14} />
                        <span>Create</span>
                    </Link>

                    {/* Notifications Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#6D28D9] relative cursor-pointer transition-colors"
                        >
                            <Bell size={18} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#6D28D9] rounded-full ring-2 ring-white" />
                            )}
                        </button>

                        {isNotificationsOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 space-y-3">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-xs text-slate-900">Notifications</h4>
                                        {unreadCount > 0 && (
                                            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#6D28D9] text-[10px] font-bold">
                                                {unreadCount} new
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={markAllNotificationsRead}
                                        className="text-[11px] text-[#6D28D9] font-bold hover:underline cursor-pointer"
                                    >
                                        Mark all read
                                    </button>
                                </div>

                                <div className="space-y-2 max-h-72 overflow-y-auto">
                                    {notifications.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`p-2.5 rounded-xl flex items-start gap-2.5 text-xs transition-colors ${item.read ? "bg-white hover:bg-slate-50" : "bg-purple-50/50 border border-purple-100/50"
                                                }`}
                                        >
                                            <img
                                                src={item.userAvatar}
                                                alt={item.user}
                                                className="w-7 h-7 rounded-full object-cover shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-slate-800 leading-tight">
                                                    <strong className="font-bold text-slate-900">{item.user}</strong> {item.action}
                                                </p>
                                                <span className="text-[10px] text-slate-400 font-medium block pt-1">
                                                    {item.timestamp}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile Dropdown Menu */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
                        >
                            <img
                                src={user.avatar}
                                alt={user.name || "User Avatar"}
                                className="w-8 h-8 rounded-full object-cover border border-purple-200"
                            />
                            <ChevronDown size={14} className="text-slate-500 hidden sm:inline" />
                        </button>

                        {isProfileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 space-y-1 text-xs">
                                {/* Header info */}
                                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                                    <p className="font-bold text-slate-900 truncate">{user.name}</p>
                                    <p className="text-[11px] text-[#6D28D9] font-medium">@{user.username}</p>
                                </div>

                                <Link
                                    href={`/@${user.username}`}
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] font-medium transition-colors"
                                >
                                    <User size={15} /> View Profile
                                </Link>

                                <Link
                                    href="/settings/profile"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] font-medium transition-colors"
                                >
                                    <Edit3 size={15} /> Edit Profile
                                </Link>

                                <Link
                                    href="/saved"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] font-medium transition-colors"
                                >
                                    <Bookmark size={15} /> Saved Articles
                                </Link>

                                <Link
                                    href="/creator/analytics"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] font-medium transition-colors"
                                >
                                    <BarChart3 size={15} /> Creator Analytics
                                </Link>

                                <Link
                                    href="/settings"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] font-medium transition-colors"
                                >
                                    <Settings size={15} /> Account Settings
                                </Link>

                                <div className="pt-1 border-t border-slate-100 mt-1">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-left cursor-pointer transition-colors"
                                    >
                                        <LogOut size={15} /> Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ====================================================================
          2. SLIDE-OUT MOBILE NAVIGATION DRAWER
          ==================================================================== */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <aside className="relative w-72 max-w-[80%] bg-white h-full p-5 space-y-6 shadow-2xl flex flex-col z-10 overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <img src={logoSrc} alt="Bloggy logo" className="h-8 w-auto" />
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-slate-400 p-1 rounded-lg hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Mobile User Profile Header */}
                        <div className="flex items-center gap-3 p-3 bg-purple-50/60 rounded-2xl border border-purple-100/50">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover border border-purple-200"
                            />
                            <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-xs text-slate-900 truncate">{user.name}</h4>
                                <p className="text-[11px] text-[#6D28D9] truncate">@{user.username}</p>
                            </div>
                        </div>

                        <nav className="space-y-4 text-xs font-medium text-slate-700 flex-1">
                            <div className="space-y-1">
                                <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    Navigation
                                </span>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-purple-50 text-[#6D28D9] font-bold"
                                >
                                    <Home size={16} /> Dashboard
                                </Link>
                                <Link
                                    href="/discover"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50"
                                >
                                    <Compass size={16} /> Discover
                                </Link>
                                <Link
                                    href="/following"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50"
                                >
                                    <Users size={16} /> Following
                                </Link>
                                <Link
                                    href="/topics"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50"
                                >
                                    <Tag size={16} /> Topics
                                </Link>
                                <Link
                                    href="/saved"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50"
                                >
                                    <Bookmark size={16} /> Saved Items
                                </Link>
                            </div>

                            <div className="space-y-1 pt-3 border-t border-slate-100">
                                <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    Creator
                                </span>
                                <Link
                                    href="/creator/post"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50"
                                >
                                    <PlusSquare size={16} /> Create Short Post
                                </Link>
                                <Link
                                    href="/creator/article"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50"
                                >
                                    <PenTool size={16} /> Write Full Article
                                </Link>
                                <Link
                                    href="/creator/analytics"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50"
                                >
                                    <BarChart3 size={16} /> Creator Analytics
                                </Link>
                            </div>
                        </nav>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs transition-colors hover:bg-rose-100"
                        >
                            Logout Account
                        </button>
                    </aside>
                </div>
            )}

            {/* ====================================================================
          3. MAIN 3-COLUMN LAYOUT
          ==================================================================== */}
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* ------------------------------------------------------------------
            LEFT COLUMN: NAVIGATION & PROFILE MINI CARD
            ------------------------------------------------------------------ */}
                <aside className="hidden lg:block lg:col-span-3 space-y-5 text-xs font-medium text-slate-600">

                    {/* User Profile Quick Card */}
                    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
                        <div className="flex items-center gap-3">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-11 h-11 rounded-2xl object-cover border-2 border-purple-100 shadow-xs"
                            />
                            <div className="min-w-0 flex-1">
                                <h3 className="font-serif font-bold text-slate-900 text-sm truncate">
                                    {user.name}
                                </h3>
                                <p className="text-[11px] text-[#6D28D9] font-medium truncate">
                                    @{user.username}
                                </p>
                            </div>
                        </div>

                        {user.headline && (
                            <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 pt-0.5">
                                {user.headline}
                            </p>
                        )}

                        <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-1 text-center font-bold text-slate-700 text-[11px]">
                            <div className="p-1.5 rounded-xl bg-slate-50">
                                <span className="block text-slate-900 font-extrabold">{user.postsCount}</span>
                                <span className="text-[9px] text-slate-400 font-normal">Posts</span>
                            </div>
                            <div className="p-1.5 rounded-xl bg-slate-50">
                                <span className="block text-slate-900 font-extrabold">{user.followersCount}</span>
                                <span className="text-[9px] text-slate-400 font-normal">Followers</span>
                            </div>
                            <div className="p-1.5 rounded-xl bg-slate-50">
                                <span className="block text-slate-900 font-extrabold">{user.followingCount}</span>
                                <span className="text-[9px] text-slate-400 font-normal">Following</span>
                            </div>
                        </div>

                        <Link
                            href="/settings/profile"
                            className="block w-full py-2 text-center bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#6D28D9] font-bold rounded-xl transition-colors text-[11px]"
                        >
                            Edit Profile Details
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-4">
                        <div className="space-y-1">
                            <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                Main
                            </span>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 px-3 py-2 rounded-xl bg-purple-50 text-[#6D28D9] font-bold"
                            >
                                <Home size={16} /> Dashboard
                            </Link>
                            <Link
                                href="/discover"
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-[#6D28D9] transition-colors"
                            >
                                <Compass size={16} /> Discover
                            </Link>
                            <Link
                                href="/following"
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-[#6D28D9] transition-colors"
                            >
                                <Users size={16} /> Following
                            </Link>
                            <Link
                                href="/topics"
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-[#6D28D9] transition-colors"
                            >
                                <Tag size={16} /> Topics
                            </Link>
                            <Link
                                href="/saved"
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-[#6D28D9] transition-colors"
                            >
                                <Bookmark size={16} /> Saved
                            </Link>
                        </div>

                        <div className="space-y-1 pt-3 border-t border-slate-100">
                            <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                Create
                            </span>
                            <Link
                                href="/creator/post"
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-[#6D28D9] transition-colors"
                            >
                                <PlusSquare size={16} /> Create Short Post
                            </Link>
                            <Link
                                href="/creator/article"
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-[#6D28D9] transition-colors"
                            >
                                <PenTool size={16} /> Write Essay
                            </Link>
                            <Link
                                href="/creator/analytics"
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-[#6D28D9] transition-colors"
                            >
                                <BarChart3 size={16} /> Creator Studio
                            </Link>
                        </div>

                        <div className="space-y-1 pt-3 border-t border-slate-100">
                            <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                Account
                            </span>
                            <Link
                                href="/settings"
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-[#6D28D9] transition-colors"
                            >
                                <Settings size={16} /> Settings
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-colors cursor-pointer text-left"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </nav>
                </aside>

                {/* ------------------------------------------------------------------
            CENTER COLUMN: MAIN DASHBOARD FEED & WORKSPACE
            ------------------------------------------------------------------ */}
                <main className="lg:col-span-6 space-y-5">

                    {/* Greeting Header */}
                    <div className="space-y-1">
                        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-tight">
                            {getGreeting()}, {user.name || "there"} 👋
                        </h1>
                        <p className="text-xs text-slate-500">
                            Here is what's happening today in your social-reading network.
                        </p>
                    </div>

                    {/* Daily Motivational Insight Banner */}
                    {!dismissQuote && (
                        <div className="p-4 rounded-3xl bg-gradient-to-br from-purple-900 to-[#6D28D9] text-white space-y-2 relative shadow-md">
                            <button
                                type="button"
                                onClick={() => setDismissQuote(true)}
                                className="absolute top-3 right-3 text-purple-200 hover:text-white"
                            >
                                <X size={15} />
                            </button>
                            <div className="flex items-center gap-1.5 text-purple-200 text-[10px] font-bold uppercase tracking-wider">
                                <Sparkles size={13} />
                                <span>Daily Reflection</span>
                            </div>
                            <p className="text-xs font-serif italic text-purple-50 leading-relaxed pr-6">
                                "Words have the power to create conversations, shape ideas, and connect minds across boundaries."
                            </p>
                        </div>
                    )}

                    {/* Story Highlights Bar */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                        {highlights.map((item) => (
                            <div
                                key={item.id}
                                className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer group"
                            >
                                <div className="w-13 h-13 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-purple-600 to-[#6D28D9] group-hover:scale-105 transition-transform">
                                    <img
                                        src={item.avatar}
                                        alt={item.title}
                                        className="w-full h-full rounded-full object-cover border-2 border-white"
                                    />
                                </div>
                                <span className="text-[10px] font-medium text-slate-600 truncate max-w-[60px]">
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Composer Card */}
                    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5"
                            />
                            <div className="flex-1 space-y-2">
                                <textarea
                                    rows={2}
                                    placeholder={`What's on your mind, ${user.name ? user.name.split(" ")[0] : "there"}?`}
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Attachments Input Panel */}
                        {showMediaInput && (
                            <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-2 text-xs">
                                <div className="flex items-center justify-between font-bold text-[#6D28D9]">
                                    <span>Attach {mediaType} URL</span>
                                    <button
                                        type="button"
                                        onClick={() => setShowMediaInput(false)}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <input
                                    type="url"
                                    placeholder={`Paste ${mediaType} URL...`}
                                    value={mediaUrlInput}
                                    onChange={(e) => setMediaUrlInput(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#6D28D9]"
                                />
                            </div>
                        )}

                        {/* Composer Footer Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMediaType("image");
                                        setShowMediaInput(true);
                                    }}
                                    className="flex items-center gap-1 hover:text-[#6D28D9] cursor-pointer transition-colors"
                                >
                                    <ImageIcon size={15} /> <span className="hidden sm:inline">Photo</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMediaType("video");
                                        setShowMediaInput(true);
                                    }}
                                    className="flex items-center gap-1 hover:text-[#6D28D9] cursor-pointer transition-colors"
                                >
                                    <Video size={15} /> <span className="hidden sm:inline">Video</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMediaType("link");
                                        setShowMediaInput(true);
                                    }}
                                    className="flex items-center gap-1 hover:text-[#6D28D9] cursor-pointer transition-colors"
                                >
                                    <LinkIcon size={15} /> <span className="hidden sm:inline">Link</span>
                                </button>
                            </div>

                            {/* Tag Selector & Publish Button */}
                            <div className="flex items-center gap-2">
                                <select
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 px-2.5 py-1 focus:outline-none focus:border-[#6D28D9]"
                                >
                                    <option value="General">General</option>
                                    <option value="Technology">Technology</option>
                                    <option value="AI">AI</option>
                                    <option value="Linguistics">Linguistics</option>
                                    <option value="Design">Design</option>
                                </select>

                                <button
                                    type="button"
                                    onClick={handleCreatePost}
                                    disabled={!postContent.trim() || isPublishing}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${postContent.trim() && !isPublishing
                                            ? "bg-[#6D28D9] hover:bg-purple-800 text-white shadow-md shadow-purple-500/20 cursor-pointer active:scale-95"
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        }`}
                                >
                                    {isPublishing ? (
                                        <Loader2 size={13} className="animate-spin" />
                                    ) : (
                                        <Send size={13} />
                                    )}
                                    <span>Post</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Feed Filter Controls */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-bold">
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setFeedFilter("forYou")}
                                className={`pb-2 transition-colors cursor-pointer ${feedFilter === "forYou"
                                        ? "text-[#6D28D9] border-b-2 border-[#6D28D9]"
                                        : "text-slate-400 hover:text-slate-700"
                                    }`}
                            >
                                For You
                            </button>
                            <button
                                type="button"
                                onClick={() => setFeedFilter("following")}
                                className={`pb-2 transition-colors cursor-pointer ${feedFilter === "following"
                                        ? "text-[#6D28D9] border-b-2 border-[#6D28D9]"
                                        : "text-slate-400 hover:text-slate-700"
                                    }`}
                            >
                                Following
                            </button>
                            <button
                                type="button"
                                onClick={() => setFeedFilter("latest")}
                                className={`pb-2 transition-colors cursor-pointer ${feedFilter === "latest"
                                        ? "text-[#6D28D9] border-b-2 border-[#6D28D9]"
                                        : "text-slate-400 hover:text-slate-700"
                                    }`}
                            >
                                Latest
                            </button>
                            <button
                                type="button"
                                onClick={() => setFeedFilter("saved")}
                                className={`pb-2 transition-colors cursor-pointer ${feedFilter === "saved"
                                        ? "text-[#6D28D9] border-b-2 border-[#6D28D9]"
                                        : "text-slate-400 hover:text-slate-700"
                                    }`}
                            >
                                Saved
                            </button>
                        </div>

                        <span className="text-[10px] text-slate-400 font-medium">
                            {displayedPosts.length} items
                        </span>
                    </div>

                    {/* Posts Feed Cards List */}
                    <div className="space-y-4">
                        {displayedPosts.length === 0 ? (
                            <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-xs space-y-3">
                                <div className="w-12 h-12 rounded-full bg-purple-50 text-[#6D28D9] flex items-center justify-center mx-auto">
                                    <BookOpen size={20} />
                                </div>
                                <h3 className="font-serif font-bold text-slate-900 text-base">
                                    No posts found in this tab
                                </h3>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                    Try switching to "For You" or discover new creators to follow.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setFeedFilter("forYou")}
                                    className="px-4 py-2 bg-[#6D28D9] text-white rounded-full text-xs font-bold shadow-md hover:bg-purple-800 transition-colors cursor-pointer"
                                >
                                    Back to For You
                                </button>
                            </div>
                        ) : (
                            displayedPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-3 transition-all hover:shadow-sm"
                                >
                                    {/* Author Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <img
                                                src={post.authorAvatar}
                                                alt={post.authorName}
                                                className="w-10 h-10 rounded-full object-cover border border-purple-100"
                                            />
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <h4 className="font-bold text-slate-900 text-xs">
                                                        {post.authorName}
                                                    </h4>
                                                    {post.isVerified && (
                                                        <CheckCircle2 size={13} className="text-[#6D28D9]" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                                    <span>{post.authorHandle}</span>
                                                    <span>•</span>
                                                    <span>{post.timestamp}</span>
                                                    {post.readingTime && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-purple-600 font-semibold">{post.readingTime}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <p className="text-xs text-slate-800 leading-relaxed font-normal">
                                        {post.content}
                                    </p>

                                    {/* Media attachment */}
                                    {post.mediaUrl && (
                                        <div className="rounded-2xl overflow-hidden border border-slate-100 max-h-80 bg-slate-50">
                                            <img
                                                src={post.mediaUrl}
                                                alt="Post media attachment"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 rounded-md bg-purple-50 text-[#6D28D9] text-[10px] font-bold"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Post Interaction Bar */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-semibold">
                                        <div className="relative">
                                            {/* Emoji reaction tooltip popup */}
                                            {activeReactionPostId === post.id && (
                                                <div className="absolute -top-11 left-0 bg-white border border-slate-200 shadow-xl rounded-full px-3 py-1 flex items-center gap-2 text-sm z-20 animate-in fade-in zoom-in-95">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            toggleLikePost(post.id);
                                                            setActiveReactionPostId(null);
                                                        }}
                                                    >
                                                        ❤️
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            toggleLikePost(post.id);
                                                            setActiveReactionPostId(null);
                                                        }}
                                                    >
                                                        👍
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            toggleLikePost(post.id);
                                                            setActiveReactionPostId(null);
                                                        }}
                                                    >
                                                        🔥
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            toggleLikePost(post.id);
                                                            setActiveReactionPostId(null);
                                                        }}
                                                    >
                                                        👏
                                                    </button>
                                                </div>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setActiveReactionPostId(
                                                        activeReactionPostId === post.id ? null : post.id
                                                    )
                                                }
                                                className={`flex items-center gap-1.5 hover:text-[#6D28D9] cursor-pointer transition-colors ${post.isLiked ? "text-rose-600 font-bold" : ""
                                                    }`}
                                            >
                                                <Heart
                                                    size={15}
                                                    className={post.isLiked ? "fill-rose-600 text-rose-600" : ""}
                                                />
                                                <span>{post.likes}</span>
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setExpandedCommentsPostId(
                                                    expandedCommentsPostId === post.id ? null : post.id
                                                )
                                            }
                                            className="flex items-center gap-1.5 hover:text-[#6D28D9] cursor-pointer transition-colors"
                                        >
                                            <MessageCircle size={15} />
                                            <span>{post.commentsCount}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setShareModalPost(post)}
                                            className="flex items-center gap-1.5 hover:text-[#6D28D9] cursor-pointer transition-colors"
                                        >
                                            <Share2 size={15} />
                                            <span>{post.shares}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => toggleSavePost(post.id)}
                                            className={`flex items-center gap-1.5 hover:text-[#6D28D9] cursor-pointer transition-colors ${post.isSaved ? "text-[#6D28D9] font-bold" : ""
                                                }`}
                                        >
                                            <Bookmark
                                                size={15}
                                                className={post.isSaved ? "fill-[#6D28D9]" : ""}
                                            />
                                        </button>
                                    </div>

                                    {/* Collapsible Comments Drawer */}
                                    {expandedCommentsPostId === post.id && (
                                        <div className="pt-3 border-t border-slate-100 space-y-3">
                                            {/* Comments List */}
                                            {post.comments.length > 0 && (
                                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                                    {post.comments.map((comment) => (
                                                        <div
                                                            key={comment.id}
                                                            className="p-2.5 rounded-2xl bg-slate-50 text-xs space-y-1"
                                                        >
                                                            <div className="flex items-center justify-between font-bold text-slate-900 text-[11px]">
                                                                <span>{comment.authorName}</span>
                                                                <span className="text-[10px] text-slate-400 font-normal">
                                                                    {comment.timestamp}
                                                                </span>
                                                            </div>
                                                            <p className="text-slate-700 text-[11px]">{comment.content}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Add Comment Input */}
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Write a comment..."
                                                    value={newCommentInputs[post.id] || ""}
                                                    onChange={(e) =>
                                                        setNewCommentInputs({
                                                            ...newCommentInputs,
                                                            [post.id]: e.target.value,
                                                        })
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") handleAddComment(post.id);
                                                    }}
                                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddComment(post.id)}
                                                    className="p-1.5 bg-[#6D28D9] text-white rounded-full hover:bg-purple-800 cursor-pointer"
                                                >
                                                    <Send size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </article>
                            ))
                        )}
                    </div>
                </main>

                {/* ------------------------------------------------------------------
            RIGHT COLUMN: SUGGESTED AUTHORS & DISCOVERY SIDEBAR
            ------------------------------------------------------------------ */}
                <aside className="hidden lg:block lg:col-span-3 space-y-5 text-xs">

                    {/* Follow Topics Widget */}
                    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
                        <h3 className="font-serif font-bold text-slate-900 text-sm">
                            Your Topics
                        </h3>
                        <div className="space-y-2">
                            {userTopics.map((topic) => (
                                <div
                                    key={topic.id}
                                    className="flex items-center justify-between text-slate-700"
                                >
                                    <div className="min-w-0 flex-1 pr-2">
                                        <span className="font-semibold block truncate hover:text-[#6D28D9] cursor-pointer">
                                            {topic.name}
                                        </span>
                                        <span className="text-[10px] text-slate-400">{topic.postCount} posts</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleFollowTopic(topic.id)}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${topic.isFollowing
                                                ? "bg-purple-50 text-[#6D28D9]"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                    >
                                        {topic.isFollowing ? "Following" : "Follow"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Suggested Authors Widget */}
                    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
                        <h3 className="font-serif font-bold text-slate-900 text-sm">
                            Suggested Authors
                        </h3>
                        <div className="space-y-3">
                            {suggestedAuthors.map((author) => (
                                <div key={author.id} className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <img
                                            src={author.avatar}
                                            alt={author.name}
                                            className="w-8 h-8 rounded-full object-cover shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-slate-900 text-xs truncate">
                                                {author.name}
                                            </h4>
                                            <p className="text-[10px] text-slate-400 truncate">{author.role}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleFollowAuthor(author.id)}
                                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 ${author.isFollowing
                                                ? "bg-slate-100 text-slate-600"
                                                : "bg-[#6D28D9] text-white hover:bg-purple-800"
                                            }`}
                                    >
                                        {author.isFollowing ? "Following" : "Follow"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trending Hashtags */}
                    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-2">
                        <h3 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <TrendingUp size={15} className="text-[#6D28D9]" /> Trending Now
                        </h3>
                        <div className="space-y-2 pt-1 text-slate-600 font-medium">
                            <div className="hover:text-[#6D28D9] cursor-pointer">
                                <p className="font-bold text-slate-900 text-xs">#ArtificialIntelligence</p>
                                <p className="text-[10px] text-slate-400">12.4k essays & posts</p>
                            </div>
                            <div className="hover:text-[#6D28D9] cursor-pointer">
                                <p className="font-bold text-slate-900 text-xs">#WebDevelopment</p>
                                <p className="text-[10px] text-slate-400">8.1k posts</p>
                            </div>
                            <div className="hover:text-[#6D28D9] cursor-pointer">
                                <p className="font-bold text-slate-900 text-xs">#DiscourseAnalysis</p>
                                <p className="text-[10px] text-slate-400">3.5k posts</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer links */}
                    <div className="px-2 text-[10px] text-slate-400 space-y-1">
                        <div className="flex flex-wrap gap-2">
                            <Link href="/privacy" className="hover:underline">
                                Privacy
                            </Link>
                            <span>•</span>
                            <Link href="/terms" className="hover:underline">
                                Terms
                            </Link>
                            <span>•</span>
                            <Link href="/help" className="hover:underline">
                                Help Center
                            </Link>
                        </div>
                        <p>© 2026 Bloggy Inc. All rights reserved.</p>
                    </div>

                </aside>

            </div>

            {/* ====================================================================
          4. SHARE MODAL DIALOG
          ==================================================================== */}
            {shareModalPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="font-serif font-bold text-slate-900 text-sm">
                                Share Post
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShareModalPost(null)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                            "{shareModalPost.content}"
                        </p>

                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="text"
                                readOnly
                                value={`https://bloggy.com/post/${shareModalPost.id}`}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 font-mono"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://bloggy.com/post/${shareModalPost.id}`);
                                    setCopiedPostLink(true);
                                    setTimeout(() => setCopiedPostLink(false), 2000);
                                }}
                                className="px-4 py-2 bg-[#6D28D9] text-white rounded-xl text-xs font-bold hover:bg-purple-800 transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                                {copiedPostLink ? <Check size={14} /> : <Copy size={14} />}
                                <span>{copiedPostLink ? "Copied" : "Copy"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}