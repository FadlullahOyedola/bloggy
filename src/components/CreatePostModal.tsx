"use client";

import { useState } from "react";
import {
    X, Image as ImageIcon, FileText,
    Globe, Lock, Users, Sparkles, Send, Code, BarChart3
} from "lucide-react";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPostCreated?: (newPost: any) => void;
    user: {
        displayName: string;
        username: string;
        avatar: string;
        verification: "GRAY" | "BLUE" | "PURPLE" | "GOLD";
    };
}

export default function CreatePostModal({ isOpen, onClose, onPostCreated, user }: CreatePostModalProps) {
    const [content, setContent] = useState("");
    const [visibility, setVisibility] = useState<"PUBLIC" | "FOLLOWERS" | "PRIVATE">("PUBLIC");
    const [selectedTags, setSelectedTags] = useState<string[]>(["WebDev", "AI"]);
    const [tagInput, setTagInput] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [codeSnippet, setCodeSnippet] = useState("");

    if (!isOpen) return null;

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (!selectedTags.includes(tagInput.trim())) {
                setSelectedTags([...selectedTags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const handlePublish = async () => {
        if (!content.trim()) return;
        setIsPublishing(true);

        const newPostData = {
            id: `post-${Date.now()}`,
            author: {
                displayName: user.displayName,
                username: user.username,
                avatar: user.avatar,
                verification: user.verification,
            },
            content,
            codeSnippet: showCodeInput ? codeSnippet : null,
            topicTags: selectedTags,
            visibility,
            reactions: { LIKE: 0, LOVE: 0, FIRE: 0 },
            commentsCount: 0,
            timeAgo: "Just now",
            readingTime: Math.max(1, Math.ceil(content.split(" ").length / 200)),
        };

        try {
            await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPostData),
            });
        } catch (err) {
            console.warn("Fallback client submission active.");
        } finally {
            setIsPublishing(false);
            if (onPostCreated) onPostCreated(newPostData);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-3xl w-full max-w-2xl border border-purple-900/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp">

                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8F7FC]">
                    <div className="flex items-center gap-2">
                        <Sparkles size={18} className="text-[#6D28D9]" />
                        <h3 className="font-serif font-bold text-slate-900 text-lg">Create Community Post</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 overflow-y-auto space-y-4 flex-1">

                    {/* User Info Bar */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={user.avatar} alt={user.displayName} className="w-11 h-11 rounded-2xl object-cover border border-purple-100" />
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-slate-900 text-sm">{user.displayName}</span>
                                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white font-bold ${user.verification === "GOLD" ? "bg-amber-500" :
                                        user.verification === "PURPLE" ? "bg-[#6D28D9]" : "bg-blue-500"
                                        }`}>✓</span>
                                </div>
                                <span className="text-xs text-slate-400">@{user.username}</span>
                            </div>
                        </div>

                        {/* Visibility Dropdown */}
                        <div className="flex items-center gap-1 bg-[#F8F7FC] border border-purple-900/10 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600">
                            {visibility === "PUBLIC" && <Globe size={14} className="text-[#6D28D9]" />}
                            {visibility === "FOLLOWERS" && <Users size={14} className="text-[#6D28D9]" />}
                            {visibility === "PRIVATE" && <Lock size={14} className="text-[#6D28D9]" />}
                            <select
                                value={visibility}
                                onChange={(e: any) => setVisibility(e.target.value)}
                                className="bg-transparent focus:outline-none cursor-pointer text-slate-700"
                            >
                                <option value="PUBLIC">Public</option>
                                <option value="FOLLOWERS">Followers Only</option>
                                <option value="PRIVATE">Only Me</option>
                            </select>
                        </div>
                    </div>

                    {/* Editor Textarea */}
                    <textarea
                        rows={4}
                        placeholder="Share your thoughts with the Bloggy community..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none resize-none text-base leading-relaxed pt-2"
                    />

                    {/* Code Snippet Input Block */}
                    {showCodeInput && (
                        <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 space-y-2 text-xs font-mono border border-slate-800">
                            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                                <span>Snippet Code Block</span>
                                <button onClick={() => setShowCodeInput(false)} className="hover:text-white">Close</button>
                            </div>
                            <textarea
                                rows={3}
                                placeholder="// Write or paste your code snippet here..."
                                value={codeSnippet}
                                onChange={(e) => setCodeSnippet(e.target.value)}
                                className="w-full bg-transparent border-none focus:outline-none text-emerald-400 placeholder-slate-600 resize-none"
                            />
                        </div>
                    )}

                    {/* Active Topic Tag Chips */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        {selectedTags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-purple-50 text-[#6D28D9] border border-purple-100 rounded-xl text-xs font-bold flex items-center gap-1">
                                #{tag}
                                <button onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))} className="hover:text-rose-600">×</button>
                            </span>
                        ))}
                        <input
                            type="text"
                            placeholder="+ Add tag (Press Enter)"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            className="text-xs bg-transparent border-none focus:outline-none text-slate-600 placeholder-slate-400"
                        />
                    </div>

                </div>

                {/* Toolbar & Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-[#F8F7FC] flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Media Actions */}
                    <div className="flex items-center gap-1 text-slate-500">
                        <button className="p-2 hover:bg-white hover:text-[#6D28D9] rounded-xl transition-all" title="Add Image">
                            <ImageIcon size={18} />
                        </button>
                        <button className="p-2 hover:bg-white hover:text-[#6D28D9] rounded-xl transition-all" title="Attach Document">
                            <FileText size={18} />
                        </button>
                        <button onClick={() => setShowCodeInput(!showCodeInput)} className="p-2 hover:bg-white hover:text-[#6D28D9] rounded-xl transition-all" title="Code Snippet">
                            <Code size={18} />
                        </button>
                        <button className="p-2 hover:bg-white hover:text-[#6D28D9] rounded-xl transition-all" title="Add Poll">
                            <BarChart3 size={18} />
                        </button>
                    </div>

                    {/* Submit Bar */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                        <span className="text-xs text-slate-400 font-semibold">{content.length}/1000</span>
                        <button
                            type="button"
                            onClick={handlePublish}
                            disabled={!content.trim() || isPublishing}
                            className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white flex items-center gap-2 shadow-lg transition-all ${content.trim() && !isPublishing
                                ? "bg-[#6D28D9] hover:bg-purple-800 shadow-purple-500/30 cursor-pointer scale-105"
                                : "bg-slate-300 cursor-not-allowed shadow-none"
                                }`}
                        >
                            <Send size={15} />
                            <span>{isPublishing ? "Publishing..." : "Publish Post"}</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}