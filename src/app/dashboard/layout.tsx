"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Layers, 
  MessageSquare, 
  Webhook, 
  Key, 
  Settings, 
  LogOut,
  ChevronRight,
  Search,
  Bell
} from 'lucide-react';

const SidebarLink = ({ href, icon: Icon, label, active = false }: { href: string; icon: any; label: string; active?: boolean }) => (
  <Link href={href}>
    <div className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'}`}>
      <div className="flex items-center gap-3">
        <Icon size={20} className={active ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'} />
        <span className="text-sm font-semibold tracking-tight">{label}</span>
      </div>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>}
    </div>
  </Link>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#050505] text-on-surface overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 h-full border-r border-white/5 flex flex-col p-6 shrink-0 bg-[#080808]/50 backdrop-blur-xl relative z-30">
        <div className="mb-10 px-2 flex items-center justify-between">
          <Link href="/dashboard">
            <Image 
              src="/img/logo/fulllogo.png" 
              alt="Wavo Logo" 
              width={100} 
              height={28} 
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
          <div className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase">Beta</div>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <h5 className="px-4 mb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/40">Main Menu</h5>
            <nav className="space-y-1">
              <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Overview" active />
              <SidebarLink href="/dashboard/instances" icon={Layers} label="Instances" />
              <SidebarLink href="/dashboard/messages" icon={MessageSquare} label="Message Logs" />
            </nav>
          </div>

          <div>
            <h5 className="px-4 mb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/40">Configuration</h5>
            <nav className="space-y-1">
              <SidebarLink href="/dashboard/webhooks" icon={Webhook} label="Webhooks" />
              <SidebarLink href="/dashboard/api-keys" icon={Key} label="API Keys" />
            </nav>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-1">
          <SidebarLink href="/dashboard/settings" icon={Settings} label="Settings" />
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:text-red-400 hover:bg-red-400/5 transition-all duration-200">
            <LogOut size={20} />
            <span className="text-sm font-semibold tracking-tight">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 shrink-0 bg-[#050505]/50 backdrop-blur-md">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 w-96 group focus-within:border-primary/50 transition-all">
            <Search size={18} className="text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search instances, messages..." 
              className="bg-transparent border-none text-sm focus:outline-none w-full text-white placeholder:text-on-surface-variant/30 font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-on-surface-variant transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-[#050505]"></span>
            </button>
            <div className="h-8 w-[1px] bg-white/5 mx-2"></div>
            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white tracking-tight">John Doe</p>
                <p className="text-[10px] font-medium text-on-surface-variant/60 uppercase tracking-widest">Developer Plan</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[#a882ff] p-[1px]">
                <div className="w-full h-full rounded-[11px] bg-[#050505] flex items-center justify-center font-bold text-primary text-sm">JD</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
