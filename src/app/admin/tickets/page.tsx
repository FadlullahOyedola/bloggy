"use client";

import { useState, useEffect } from "react";
import {
    MessageSquare,
    CheckCircle2,
    Clock,
    Send,
    AlertCircle,
    Filter,
    Search,
    User,
    Mail,
    Phone,
    RefreshCw
} from "lucide-react";

interface SupportTicket {
    id: string;
    ticketId: string;
    name: string;
    email: string;
    phone?: string;
    category: string;
    priority: "low" | "normal" | "urgent";
    subject: string;
    message: string;
    environment?: string;
    handle?: string;
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    adminResponse?: string;
    createdAt: string;
}

export default function AdminTicketsPage() {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
    const [replyText, setReplyText] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [isSending, setIsSending] = useState(false);

    // Fetch tickets from database
    const fetchTickets = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/tickets");
            const data = await res.json();
            if (data.tickets) setTickets(data.tickets);
        } catch (err) {
            console.error("Failed to fetch tickets:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    // Submit response & update status in Neon database
    const handleSendResponse = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTicket || !replyText.trim()) return;

        setIsSending(true);
        try {
            const res = await fetch(`/api/admin/tickets/${selectedTicket.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    adminResponse: replyText,
                    status: "RESOLVED"
                })
            });

            if (res.ok) {
                setReplyText("");
                fetchTickets();
                setSelectedTicket(null);
            }
        } catch (err) {
            console.error("Failed to update ticket:", err);
        } finally {
            setIsSending(false);
        }
    };

    const filteredTickets = tickets.filter(t =>
        statusFilter === "ALL" ? true : t.status === statusFilter
    );

    return (
        <div className="min-h-screen bg-[#F8F7FC] p-6 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Bar */}
                <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-purple-900/5 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-black font-serif text-slate-900">Support Ticket Management</h1>
                        <p className="text-xs text-slate-500">View, manage, and answer incoming platform support tickets.</p>
                    </div>
                    <button
                        onClick={fetchTickets}
                        className="p-3 bg-purple-50 text-[#6D28D9] rounded-2xl hover:bg-purple-100 transition-colors flex items-center gap-2 text-xs font-bold cursor-pointer"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh Tickets
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Tickets Feed */}
                    <div className="lg:col-span-5 space-y-3">
                        <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-purple-900/5 text-xs">
                            <Filter size={16} className="text-[#6D28D9]" />
                            {["ALL", "OPEN", "RESOLVED"].map((st) => (
                                <button
                                    key={st}
                                    onClick={() => setStatusFilter(st)}
                                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${statusFilter === st
                                        ? "bg-[#6D28D9] text-white"
                                        : "text-slate-500 hover:bg-slate-100"
                                        }`}
                                >
                                    {st}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
                            {filteredTickets.map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => {
                                        setSelectedTicket(t);
                                        setReplyText(t.adminResponse || "");
                                    }}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${selectedTicket?.id === t.id
                                        ? "bg-white border-[#6D28D9] shadow-md shadow-purple-500/10"
                                        : "bg-white border-purple-900/5 hover:border-purple-200"
                                        }`}
                                >
                                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                                        <span className="font-mono text-[#6D28D9]">{t.ticketId}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase ${t.status === "OPEN" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                                            }`}>
                                            {t.status}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{t.subject}</h4>
                                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{t.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Active Ticket Response Drawer */}
                    <div className="lg:col-span-7">
                        {selectedTicket ? (
                            <div className="bg-white p-6 rounded-3xl border border-purple-900/5 shadow-xl space-y-6">
                                <div className="border-b pb-4 flex items-center justify-between">
                                    <div>
                                        <span className="font-mono text-xs font-bold text-[#6D28D9]">{selectedTicket.ticketId}</span>
                                        <h2 className="text-xl font-black text-slate-900">{selectedTicket.subject}</h2>
                                    </div>
                                    <span className="px-3 py-1 bg-purple-50 text-[#6D28D9] font-bold text-xs rounded-full">
                                        Category: {selectedTicket.category}
                                    </span>
                                </div>

                                {/* Sender Metadata */}
                                <div className="grid grid-cols-2 gap-3 bg-[#F8F7FC] p-4 rounded-2xl text-xs font-medium text-slate-700">
                                    <div className="flex items-center gap-2"><User size={14} /> {selectedTicket.name}</div>
                                    <div className="flex items-center gap-2"><Mail size={14} /> {selectedTicket.email}</div>
                                    {selectedTicket.phone && <div className="flex items-center gap-2"><Phone size={14} /> {selectedTicket.phone}</div>}
                                    {selectedTicket.environment && <div>Env: {selectedTicket.environment}</div>}
                                </div>

                                {/* User Message */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-extrabold uppercase text-slate-400">User Message:</h4>
                                    <p className="bg-slate-50 p-4 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                                        {selectedTicket.message}
                                    </p>
                                </div>

                                {/* Response Form */}
                                <form onSubmit={handleSendResponse} className="space-y-3 pt-2">
                                    <h4 className="text-xs font-extrabold uppercase text-slate-400">Your Response:</h4>
                                    <textarea
                                        rows={5}
                                        required
                                        placeholder="Type your official support resolution..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white resize-none font-medium"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full py-3.5 bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-xs rounded-2xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Send size={16} />
                                        <span>{isSending ? "Updating Database..." : "Send Reply & Resolve Ticket"}</span>
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-white p-12 rounded-3xl border border-purple-900/5 text-center text-slate-400 space-y-2">
                                <MessageSquare size={32} className="mx-auto text-purple-300" />
                                <p className="text-xs font-bold">Select a support ticket from the feed to view details and respond.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}