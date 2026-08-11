"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { loginAdmin } from "@/lib/services/authService";
import { Lock, Mail, Sparkles, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { user, error } = await loginAdmin(email, password);

    if (error) {
      setErrorMsg(error);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-[#07111F] text-white flex items-center justify-center p-4">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/2 translate-x-1/2 w-96 h-96 bg-[#4A7DFF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#0C1829] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-3">
          <BrandLogo size="lg" className="justify-center" />
          <h1 className="text-2xl font-bold text-white pt-2">تسجيل دخول لوحة التحكم</h1>
          <p className="text-xs text-[#B8C3D9]">أدخل بيانات المسؤول لإدارة أكاديمية أنس القرآن</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#B8C3D9] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#7EC8FF]" />
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              placeholder="admin@anasquran.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4A7DFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#B8C3D9] mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#7EC8FF]" />
              كلمة المرور
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4A7DFF]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#4A7DFF] to-[#6E5BFF] hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري التحقق...</span>
              </>
            ) : (
              <>
                <span>دخول لوحة التحكم</span>
                <Sparkles className="w-4 h-4 text-[#D8B15B]" />
              </>
            )}
          </button>
        </form>

        <p className="text-[11px] text-center text-[#7E8C9E]">
          محمية عبر Supabase Authentication • أنس القرآن
        </p>
      </div>
    </main>
  );
}
