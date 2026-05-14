"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Code2, ShieldCheck, ChevronDown, Check, Github as GithubIcon } from 'lucide-react';

const Github = ({ size = 18, ...props }: { size?: number; [key: string]: any }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/[0.04] transition-all">
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface-variant/80 shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="text-sm font-bold text-white mb-1 tracking-tight">{title}</h4>
      <p className="text-[13px] text-on-surface-variant/50 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  </div>
);

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] flex items-center justify-center font-sans">
      <div className="w-full max-w-[1100px] h-[780px] flex rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl shadow-black/50 mx-6">
        
        {/* Left Side: Brand Section */}
        <div className="hidden lg:flex w-[45%] bg-[#0f0f12] p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-20">
              <span className="text-xl font-bold text-white tracking-tight">Wavo API</span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tighter">
              Build the future of <br />communication.
            </h1>
            <p className="text-on-surface-variant/60 text-lg mb-12 leading-relaxed max-w-[360px] font-medium">
              Access the most powerful WhatsApp API infrastructure designed for high-concurrency developer environments.
            </p>

            <div className="space-y-4 max-w-[400px]">
              <FeatureCard 
                icon={Code2} 
                title="RESTful Architecture" 
                description="Standardized endpoints for seamless integration with any tech stack."
              />
              <FeatureCard 
                icon={ShieldCheck} 
                title="Enterprise Encryption" 
                description="End-to-end security protocols for sensitive enterprise data."
              />
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f0f12] bg-white/10 overflow-hidden">
                  <Image 
                    src={`https://i.pravatar.cc/100?img=${i+10}`} 
                    alt="User" 
                    width={32} 
                    height={32} 
                  />
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-on-surface-variant/40 tracking-tight uppercase">Joined by 10k+ developers globally</span>
          </div>

          {/* Background Decor */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
        </div>

        {/* Right Side: Register Form */}
        <div className="w-full lg:w-[55%] bg-[#14141a] p-12 overflow-y-auto custom-scrollbar">
          <div className="max-w-[420px] mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create an account</h1>
            <p className="text-on-surface-variant/60 text-[15px] mb-8 font-medium">
              Start building with Wavo API in seconds.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                <Github size={18} />
                Github
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                <GoogleIcon />
                Google
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/40">
                <span className="bg-[#14141a] px-4">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-on-surface-variant/40 uppercase tracking-widest block px-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Ada Lovelace"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary/40 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-on-surface-variant/40 uppercase tracking-widest block px-1">Work Email</label>
                <input 
                  type="email" 
                  placeholder="ada@devos.io"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary/40 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-on-surface-variant/40 uppercase tracking-widest block px-1">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary/40 transition-all font-medium"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-on-surface-variant/40 uppercase tracking-widest block px-1">Developer Role</label>
                <div className="relative">
                  <select className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary/40 transition-all font-medium appearance-none">
                    <option>Backend Engineer</option>
                    <option>Frontend Engineer</option>
                    <option>Full Stack Developer</option>
                    <option>DevOps / SRE</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="flex items-start gap-3 px-1 py-1 pt-2">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-primary cursor-pointer mt-0.5" />
                <p className="text-[11px] font-medium text-on-surface-variant/60 leading-normal">
                  I agree to the <Link href="#" className="text-white hover:text-primary transition-colors">Terms of Service</Link> and <Link href="#" className="text-white hover:text-primary transition-colors">Privacy Policy</Link>. I also consent to receiving developer updates.
                </p>
              </div>

              <button className="w-full bg-[#c6b4ff] text-background py-4 rounded-xl font-bold text-sm hover:bg-[#b5a0f8] transition-all shadow-lg shadow-[#c6b4ff]/10 mt-2">
                Create Developer Account
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs font-medium text-on-surface-variant/40">
                Already have an account? <Link href="/login" className="text-white hover:text-primary font-bold">Sign In</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
