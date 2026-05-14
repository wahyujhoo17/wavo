"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#a882ff]/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="flex justify-center mb-10">
          <Link href="/">
            <Image 
              src="/img/logo/fulllogo.png" 
              alt="Wavo Logo" 
              width={140} 
              height={40} 
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
        </div>

        <div className="glass-card rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white tracking-tighter mb-3">Welcome back</h1>
            <p className="text-on-surface-variant text-sm font-medium">Log in to your Wavo account</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-all font-medium"
              />
            </div>

            <button className="w-full bg-white text-background py-4 rounded-2xl font-bold text-base hover:bg-primary transition-all shadow-glow-primary mt-4">
              Sign In
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-on-surface-variant font-medium">
              Don't have an account? {' '}
              <Link href="/register" className="text-primary font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-xs text-on-surface-variant/40 font-medium">
          By continuing, you agree to Wavo's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </main>
  );
}
