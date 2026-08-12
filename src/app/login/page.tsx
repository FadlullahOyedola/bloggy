import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import LoginClient from "./login-client";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
            <Suspense fallback={
                <div className="flex items-center justify-center p-12">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                </div>
            }>
                <LoginClient />
            </Suspense>
        </div>
    );
}