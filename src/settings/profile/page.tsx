"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/app/logo.png.webp";
import {
    Camera,
    Upload,
    Trash2,
    CheckCircle2,
    X,
    Globe,
    MapPin,
    Briefcase,
    ArrowLeft,
    Save,
    Copy,
    Check,
    Loader2,
} from "lucide-react";

export default function EditProfilePage() {
    const router = useRouter();
    const logoSrc = typeof logo === "string" ? logo : logo.src;

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    // Dynamic state initialized blank — waiting for active user data
    const [formData, setFormData] = useState({
        displayName: "",
        username: "",
        headline: "",
        bio: "",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        coverPhoto: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        location: "",
        website: "",
        profession: "",
        isPublic: true,
        socials: {
            linkedin: "",
        },
        followersCount: 0,
        followingCount: 0,
    });

    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);

    // Load the authenticated user's session data from Neon Database
    useEffect(() => {
        async function loadProfile() {
            try {
                const res = await fetch("/api/user/me");
                if (res.ok) {
                    const data = await res.json();
                    const fallbackName = data.email ? data.email.split("@")[0] : "User";
                    const formattedName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);

                    setFormData({
                        displayName: data.displayName || data.name || formattedName,
                        username: data.username || fallbackName.toLowerCase(),
                        headline: data.headline || "",
                        bio: data.bio || "",
                        avatar: data.avatar || data.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
                        coverPhoto: data.coverPhoto || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
                        location: data.location || "",
                        website: data.website || "",
                        profession: data.profession || "",
                        isPublic: data.isPublic ?? true,
                        socials: {
                            linkedin: data.socials?.linkedin || "",
                        },
                        followersCount: data.followersCount || 0,
                        followingCount: data.followingCount || 0,
                    });
                }
            } catch (err) {
                console.error("Failed to load user profile:", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadProfile();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "username") {
            checkUsernameAvailability(value);
        }
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            socials: { ...prev.socials, [name]: value },
        }));
    };

    const checkUsernameAvailability = (uname: string) => {
        if (!uname) return;
        setIsCheckingUsername(true);
        setTimeout(() => {
            setIsCheckingUsername(false);
            setIsUsernameAvailable(uname.length >= 3);
        }, 300);
    };

    const handleImageFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "avatar" | "coverPhoto"
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    [type]: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveSuccess(false);

        try {
            const response = await fetch("/api/user/me", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const copyProfileLink = () => {
        if (formData.username) {
            navigator.clipboard.writeText(`https://bloggy.com/@${formData.username}`);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF8FF] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-[#6D28D9] animate-spin" />
                <p className="text-xs font-semibold text-slate-500">Loading your profile details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF8FF] font-sans text-slate-900 pb-24">
            {/* Top Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <Link href="/" className="flex items-center gap-2">
                        <img src={logoSrc} alt="Bloggy logo" className="h-8 w-auto" />
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={copyProfileLink}
                        className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedLink ? "Link Copied!" : "Share Profile"}</span>
                    </button>

                    <button
                        type="submit"
                        form="profile-edit-form"
                        disabled={isSaving}
                        className="px-5 py-2 bg-[#6D28D9] hover:bg-[#5B21B6] disabled:bg-purple-300 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>Save Changes</span>
                    </button>
                </div>
            </header>

            {/* Main Grid Container */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT FORM COLUMN */}
                <div className="lg:col-span-7 space-y-8">

                    <div className="space-y-1">
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                            Edit Profile
                        </h1>
                        <p className="text-xs text-slate-500">
                            Update your Bloggy identity and the information people see when they visit your profile.
                        </p>
                    </div>

                    {saveSuccess && (
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span>Your profile changes have been saved to the database!</span>
                        </div>
                    )}

                    <form id="profile-edit-form" onSubmit={handleSaveChanges} className="space-y-8">

                        {/* PROFILE & COVER IMAGES */}
                        <section className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                            <h2 className="font-serif text-base font-bold text-slate-900">
                                Profile Images
                            </h2>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 block">Cover Photo</label>
                                <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group">
                                    <img src={formData.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => coverInputRef.current?.click()}
                                            className="px-3 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <Camera className="w-3.5 h-3.5" />
                                            <span>Change Cover</span>
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={coverInputRef}
                                    accept="image/*"
                                    onChange={(e) => handleImageFileChange(e, "coverPhoto")}
                                    className="hidden"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 block">Profile Picture</label>
                                <div className="flex items-center gap-4">
                                    <img src={formData.avatar} alt="Avatar" className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-200 shrink-0" />
                                    <button
                                        type="button"
                                        onClick={() => avatarInputRef.current?.click()}
                                        className="px-3.5 py-2 rounded-xl bg-purple-50 text-[#6D28D9] hover:bg-purple-100 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Upload className="w-3.5 h-3.5" />
                                        <span>Upload Photo</span>
                                    </button>
                                    <input
                                        type="file"
                                        ref={avatarInputRef}
                                        accept="image/*"
                                        onChange={(e) => handleImageFileChange(e, "avatar")}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* BASIC INFO */}
                        <section className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                            <h2 className="font-serif text-base font-bold text-slate-900">Basic Information</h2>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">Display Name</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    required
                                    value={formData.displayName}
                                    onChange={handleInputChange}
                                    placeholder="Enter display name"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">Username</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-medium">@</span>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="username"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-all"
                                    />
                                    <div className="absolute right-3.5 top-3">
                                        {isCheckingUsername ? (
                                            <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                                        ) : isUsernameAvailable ? (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        ) : (
                                            <X className="w-4 h-4 text-rose-500" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">Headline</label>
                                <input
                                    type="text"
                                    name="headline"
                                    value={formData.headline}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Writer • Developer • Tech Enthusiast"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-slate-700 block">Bio</label>
                                    <span className="text-[10px] text-slate-400 font-medium">{formData.bio.length} / 200</span>
                                </div>
                                <textarea
                                    name="bio"
                                    maxLength={200}
                                    rows={3}
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell the Bloggy community a bit about yourself..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-all resize-none"
                                />
                            </div>
                        </section>

                        {/* ABOUT YOU */}
                        <section className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                            <h2 className="font-serif text-base font-bold text-slate-900">About You</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 block">Location</label>
                                    <div className="relative">
                                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Lagos, Nigeria"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 block">Website</label>
                                    <div className="relative">
                                        <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">Profession / Role</label>
                                <div className="relative">
                                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                    <input
                                        type="text"
                                        name="profession"
                                        value={formData.profession}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Software Engineer"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9]"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* SOCIAL LINKS */}
                        <section className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                            <h2 className="font-serif text-base font-bold text-slate-900">Social Links</h2>



                        </section>

                    </form>
                </div>

                {/* RIGHT LIVE PREVIEW COLUMN */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="sticky top-24">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                            Live Profile Preview
                        </span>

                        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
                            <div className="h-28 bg-slate-200 relative">
                                {formData.coverPhoto && (
                                    <img src={formData.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                                )}
                            </div>

                            <div className="p-6 pt-0 relative space-y-4">
                                <div className="relative -top-10 -mb-8 flex items-end justify-between">
                                    <img
                                        src={formData.avatar}
                                        alt="Avatar"
                                        className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md"
                                    />
                                    <span className="px-3 py-1 rounded-full bg-purple-50 text-[#6D28D9] font-bold text-[10px]">
                                        Live Preview
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="font-serif font-bold text-slate-900 text-lg leading-tight">
                                        {formData.displayName || "New User"}
                                    </h3>
                                    <p className="text-xs text-[#6D28D9] font-semibold">
                                        @{formData.username || "username"}
                                    </p>
                                    {formData.headline && (
                                        <p className="text-xs font-medium text-slate-600 pt-0.5">
                                            {formData.headline}
                                        </p>
                                    )}
                                </div>

                                {formData.bio && (
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        "{formData.bio}"
                                    </p>
                                )}

                                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs font-bold text-slate-700">
                                    <div className="p-2 bg-slate-50 rounded-xl">
                                        <span className="block text-slate-900 font-extrabold text-sm">{formData.followersCount}</span>
                                        <span className="text-[10px] text-slate-400 font-normal">Followers</span>
                                    </div>
                                    <div className="p-2 bg-slate-50 rounded-xl">
                                        <span className="block text-slate-900 font-extrabold text-sm">{formData.followingCount}</span>
                                        <span className="text-[10px] text-slate-400 font-normal">Following</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}