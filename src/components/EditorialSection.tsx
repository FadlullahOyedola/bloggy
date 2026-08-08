"use client";

import React from "react";
import { Bookmark, Heart, Share2, CheckCircle2, ArrowUpRight } from "lucide-react";

export function EditorialSection() {
    const AUTHORS = [
        {
            name: "Dr. Elena Rostova",
            role: "AI Ethics & Discourse Researcher",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
            followers: "42.8k",
            articles: 86
        },
        {
            name: "Marcus Vance",
            role: "Lead Systems Architect",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
            followers: "18.2k",
            articles: 34
        },
        {
            name: "Sarah Chen",
            role: "Principal Product Designer",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            followers: "29.1k",
            articles: 51
        }
    ];

    return (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

            {/* SECTION 6: EDITOR'S PICKS */}
            <div>
                <div className="mb-12">
                    <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">Handpicked Stories</span>
                    <h2 className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white mt-1">
                        Editor's Picks
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Featured Large Card (8 Cols) */}
                    <div className="lg:col-span-8 group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300">
                        <div className="relative h-80 sm:h-96 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                                alt="Main Pick"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full shadow-lg">
                                ⭐ Primary Feature
                            </span>
                        </div>
                        <div className="p-8 sm:p-10">
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 mb-3">
                                <span>Critical Discourse Analysis</span> • <span>12 min read</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                                Socio-Cognitive CDA: Deconstructing Ideological Frameworks in Media
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6">
                                An analysis of van Dijk's socio-cognitive approach to understanding power dynamics, mental models, and discourse manipulation across contemporary digital communications.
                            </p>
                            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Elena" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Dr. Elena Rostova</p>
                                        <p className="text-xs text-slate-400">Published Aug 05, 2026</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700">
                                    Read Story <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Stacked Cards (4 Cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        {[1, 2].map((item) => (
                            <div key={item} className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                                        Featured Pick
                                    </span>
                                    <h4 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white mt-3 group-hover:text-blue-600 transition-colors leading-snug">
                                        Designing Systemic Component Architecture for Enterprise Scale
                                    </h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-3">
                                        Structuring UI element tokens, spacing standards, and layout frameworks for frictionless developer handoffs.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                                    <span className="text-xs text-slate-400">6 min read</span>
                                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                        <Bookmark className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* SECTION 8: FEATURED AUTHORS */}
            <div>
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">Global Writers</span>
                        <h2 className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white mt-1">
                            Featured Authors
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {AUTHORS.map((author, index) => (
                        <div key={index} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center group">
                            <div className="relative mb-4">
                                <img src={author.avatar} alt={author.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-600/20 group-hover:scale-105 transition-transform" />
                                <CheckCircle2 className="w-5 h-5 text-blue-600 bg-white dark:bg-slate-900 rounded-full absolute bottom-0 right-0" />
                            </div>
                            <h3 className="text-xl font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">{author.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">{author.role}</p>

                            <div className="flex items-center justify-center gap-6 w-full py-3 bg-slate-50 dark:bg-white/5 rounded-2xl mb-6 text-xs font-semibold">
                                <div>
                                    <p className="text-slate-900 dark:text-white font-bold text-sm">{author.followers}</p>
                                    <p className="text-slate-400">Followers</p>
                                </div>
                                <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10" />
                                <div>
                                    <p className="text-slate-900 dark:text-white font-bold text-sm">{author.articles}</p>
                                    <p className="text-slate-400">Articles</p>
                                </div>
                            </div>

                            <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white font-bold py-2.5 rounded-2xl text-xs transition-colors">
                                Follow Author
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}