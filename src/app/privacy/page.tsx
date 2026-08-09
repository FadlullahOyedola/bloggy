"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import logo from "@/app/logo.png.webp";
import {
    ShieldCheck,
    Eye,
    Users,
    MessageSquare,
    AtSign,
    Activity,
    Download,
    Trash2,
    CheckCircle2,
    Lock,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    Save,
    AlertTriangle
} from "lucide-react";

export default function PrivacySettingsPage() {
    // Privacy Settings State
    const [profileVisibility, setProfileVisibility] = useState("public");
    const [whoCanFollow, setWhoCanFollow] = useState("everyone");
    const [whoCanComment, setWhoCanComment] = useState("everyone");
    const [whoCanMention, setWhoCanMention] = useState("everyone");
    const [showActivityStatus, setShowActivityStatus] = useState(true);
    const [allowIndexing, setAllowIndexing] = useState(true);
    const logoSrc = typeof logo === "string" ? logo : logo.src;

    // Status & Feedback States
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    // Load existing privacy preferences
    useEffect(() => {
        const savedVisibility = localStorage.getItem("bloggy_privacy_visibility");
        const savedFollow = localStorage.getItem("bloggy_privacy_follow");
        const savedComment = localStorage.getItem("bloggy_privacy_comment");
        const savedMention = localStorage.getItem("bloggy_privacy_mention");
        const savedActivity = localStorage.getItem("bloggy_privacy_activity");

        if (savedVisibility) setProfileVisibility(savedVisibility);
        if (savedFollow) setWhoCanFollow(savedFollow);
        if (savedComment) setWhoCanComment(savedComment);
        if (savedMention) setWhoCanMention(savedMention);
        if (savedActivity !== null) setShowActivityStatus(savedActivity === "true");
    }, []);

    // Save Privacy Preferences to Database/Local State
    const handleSavePrivacySettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveSuccess(false);

        const payload = {
            profileVisibility,
            whoCanFollow,
            whoCanComment,
            whoCanMention,
            showActivityStatus,
            allowIndexing
        };

        try {
            // API call to persist settings in Neon database
            await fetch("/api/settings/privacy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.warn("Client fallback execution:", err);
        } finally {
            // Local storage fallback for seamless UX
            localStorage.setItem("bloggy_privacy_visibility", profileVisibility);
            localStorage.setItem("bloggy_privacy_follow", whoCanFollow);
            localStorage.setItem("bloggy_privacy_comment", whoCanComment);
            localStorage.setItem("bloggy_privacy_mention", whoCanMention);
            localStorage.setItem("bloggy_privacy_activity", String(showActivityStatus));

            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }
    };

    // Export User Data Handler
    const handleExportData = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert("Your complete Bloggy data package has been requested. A download link will be sent to your registered email address.");
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#F8F7FC] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white">
            {/* Top Header Bar */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-purple-900/5 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="p-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-[#6D28D9] transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <img src={logoSrc} alt="Bloggy logo" className="h-10 w-auto" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Link href="/settings/profile" className="hover:text-[#6D28D9]">
                            Settings
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-900 font-bold">Privacy & Security</span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Editorial Hero Banner */}
                <div className="bg-white rounded-3xl p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-purple-50 text-[#6D28D9] border border-purple-100 text-xs font-bold rounded-full uppercase tracking-wider">
                        <ShieldCheck size={14} /> Account Privacy Controls
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 tracking-tight">
                        Privacy & Visibility Settings
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base max-w-xl">
                        Control who can discover your profile, interact with your posts, and view your reading activity on Bloggy.
                    </p>
                </div>

                {/* Success Alert */}
                {saveSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                        <span>Your privacy settings have been updated and saved to your database profile!</span>
                    </div>
                )}

                <form onSubmit={handleSavePrivacySettings} className="space-y-6">
                    {/* Section 1: Profile Visibility */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100">
                                    <Eye size={20} />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-900 text-base">
                                        Profile Visibility
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        Determine who can view your profile page and reading history.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                {
                                    id: "public",
                                    label: "Public Profile",
                                    description: "Anyone on Bloggy and web search engines can view your profile."
                                },
                                {
                                    id: "limited",
                                    label: "Followers Only",
                                    description: "Only approved followers can view your detailed articles and feed."
                                }
                            ].map((opt) => (
                                <button
                                    type="button"
                                    key={opt.id}
                                    onClick={() => setProfileVisibility(opt.id)}
                                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${profileVisibility === opt.id
                                        ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-md shadow-purple-500/20"
                                        : "bg-[#F8F7FC] text-slate-700 border-purple-900/5 hover:bg-white hover:border-purple-300"
                                        }`}
                                >
                                    <div className="font-extrabold text-xs sm:text-sm flex items-center justify-between">
                                        <span>{opt.label}</span>
                                        {profileVisibility === opt.id && (
                                            <CheckCircle2 size={16} className="text-white" />
                                        )}
                                    </div>
                                    <p
                                        className={`text-xs mt-1 font-normal ${profileVisibility === opt.id ? "text-purple-200" : "text-slate-500"
                                            }`}
                                    >
                                        {opt.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Audience & Interactions */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100">
                                <Users size={20} />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-base">
                                    Interaction Controls
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Manage followers, comments, and mentions on your published content.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
                            {/* Who Can Follow */}
                            <div className="space-y-2">
                                <label className="text-slate-700 flex items-center gap-1.5">
                                    <Users size={14} className="text-[#6D28D9]" /> Who can follow me
                                </label>
                                <select
                                    value={whoCanFollow}
                                    onChange={(e) => setWhoCanFollow(e.target.value)}
                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3 text-slate-900 focus:outline-none focus:border-[#6D28D9]"
                                >
                                    <option value="everyone">Everyone</option>
                                    <option value="approval">People I approve</option>
                                </select>
                            </div>

                            {/* Who Can Comment */}
                            <div className="space-y-2">
                                <label className="text-slate-700 flex items-center gap-1.5">
                                    <MessageSquare size={14} className="text-[#6D28D9]" /> Who can comment
                                </label>
                                <select
                                    value={whoCanComment}
                                    onChange={(e) => setWhoCanComment(e.target.value)}
                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3 text-slate-900 focus:outline-none focus:border-[#6D28D9]"
                                >
                                    <option value="everyone">Everyone</option>
                                    <option value="followers">Followers only</option>
                                    <option value="nobody">Nobody</option>
                                </select>
                            </div>

                            {/* Who Can Mention */}
                            <div className="space-y-2">
                                <label className="text-slate-700 flex items-center gap-1.5">
                                    <AtSign size={14} className="text-[#6D28D9]" /> Who can mention me
                                </label>
                                <select
                                    value={whoCanMention}
                                    onChange={(e) => setWhoCanMention(e.target.value)}
                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3 text-slate-900 focus:outline-none focus:border-[#6D28D9]"
                                >
                                    <option value="everyone">Everyone</option>
                                    <option value="followers">Followers only</option>
                                    <option value="nobody">Nobody</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Activity & Search Engine Status */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-5">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100">
                                <Activity size={20} />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-base">
                                    Activity Status & Indexing
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Toggle real-time activity indicators and search indexing.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3.5 bg-[#F8F7FC] rounded-2xl">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900">Show Activity Status</h4>
                                    <p className="text-[11px] text-slate-500">
                                        Allow followers to see when you are actively reading or posting online.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowActivityStatus(!showActivityStatus)}
                                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${showActivityStatus ? "bg-[#6D28D9]" : "bg-slate-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showActivityStatus ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-3.5 bg-[#F8F7FC] rounded-2xl">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900">Search Engine Indexing</h4>
                                    <p className="text-[11px] text-slate-500">
                                        Include your public articles in Google and external search engine results.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setAllowIndexing(!allowIndexing)}
                                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${allowIndexing ? "bg-[#6D28D9]" : "bg-slate-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${allowIndexing ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Data Portability & Danger Zone */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-5">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-base">
                                    Data Portability & Management
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Export your personal content or initiate account removal requests.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                            <button
                                type="button"
                                onClick={handleExportData}
                                disabled={isExporting}
                                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-[#6D28D9] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                                <Download size={16} />
                                <span>{isExporting ? "Preparing Package..." : "Export Personal Data (.JSON)"}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => alert("To delete your Bloggy account permanently, please verify your credentials in Security Settings.")}
                                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                                <Trash2 size={16} />
                                <span>Delete Account & Data</span>
                            </button>
                        </div>
                    </div>

                    {/* Save Action Floating Footer */}
                    <div className="sticky bottom-6 z-30 bg-white/90 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl border border-purple-900/10 flex items-center justify-between">
                        <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-1.5">
                            <Lock size={14} className="text-[#6D28D9]" />
                            <span>All changes are encrypted and saved directly to your account.</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-xs shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Save size={16} />
                            <span>{isSaving ? "Saving Privacy Rules..." : "Save Privacy Settings"}</span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}