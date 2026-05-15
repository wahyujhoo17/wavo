"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Send, 
  AlertCircle, 
  ShieldCheck,
  MoreHorizontal,
  Plus,
  Calendar,
  CheckCircle2,
  Circle,
  ArrowDownLeft,
  ArrowUpRight,
  Zap
} from 'lucide-react';

const Sparkline = ({ color }: { color: string }) => (
  <svg width="60" height="30" viewBox="0 0 60 30" fill="none" className="ml-2">
    <motion.path
      d="M0 20 Q 10 5, 20 15 T 40 10 T 60 25"
      stroke={color}
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  </svg>
);

const StatCard = ({ title, value, subValue, icon: Icon, color, trend }: { title: string; value: string; subValue?: string; icon: any; color: string; trend?: string }) => (
  <div className="bg-[#1c1c1e] border border-white/[0.05] p-5 rounded-[20px] relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <div className="text-[#8e8e93] text-[13px] font-medium tracking-tight uppercase">{title}</div>
      <div className="p-2 bg-white/5 rounded-lg text-white">
        <Icon size={18} />
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <div className="text-3xl font-bold tracking-tight text-white">{value}</div>
        {subValue && <div className="text-[13px] font-medium text-[#8e8e93] mt-1">{subValue}</div>}
        {trend && <div className={`text-[12px] font-bold mt-1 ${trend.startsWith('+') ? 'text-[#34C759]' : 'text-[#8e8e93]'}`}>{trend}</div>}
      </div>
      <Sparkline color={color} />
    </div>
  </div>
);

const ActivityRow = ({ title, detail, time, icon: Icon, iconBg }: { title: string; detail: string; time: string; icon: any; iconBg: string }) => (
  <div className="flex items-center justify-between py-5 border-b border-white/[0.03] last:border-none group cursor-pointer hover:bg-white/[0.01] px-2 rounded-2xl transition-all">
    <div className="flex items-center gap-5">
      <div className={`w-11 h-11 rounded-full flex items-center justify-center ${iconBg} shadow-sm group-hover:scale-105 transition-transform`}>
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <div className="text-[15px] font-bold text-white tracking-tight leading-none mb-1.5">{title}</div>
        <div className="text-[13px] font-medium text-[#8e8e93] leading-none">{detail}</div>
      </div>
    </div>
    <div className="text-[11px] font-bold text-[#8e8e93]/50 uppercase tracking-[0.1em]">{time}</div>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-white">Welcome back, Developer</h1>
          <p className="text-[#8e8e93] text-[15px] font-medium mt-1">Here's an overview of your WhatsApp API infrastructure.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1c1c1e] border border-white/[0.05] text-[#8e8e93] px-4 py-2.5 rounded-xl font-bold text-[13px] hover:text-white transition-all shadow-sm">
          <Calendar size={16} />
          Last 30 Days
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Active Devices" value="3/5" icon={Smartphone} color="#cfbcff" />
        <StatCard title="Messages Sent" value="12.4k" trend="+12% this month" icon={Send} color="#cfbcff" />
        <StatCard title="Failed Requests" value="42" trend="-5 from last week" icon={AlertCircle} color="#ff3b30" />
        <StatCard title="API Health" value="99.9%" subValue="• Operational" icon={ShieldCheck} color="#34c759" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[28px] relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[19px] font-bold tracking-tight text-white">Message Analytics</h3>
              <button className="text-[#8e8e93] hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="h-[280px] w-full relative mt-10">
              {/* Fake Chart Illustration */}
              <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y2="1">
                    <stop offset="0%" stopColor="#cfbcff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#cfbcff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0 150 Q 100 160, 200 130 T 400 140 T 600 100 T 800 50 L 800 200 L 0 200 Z"
                  fill="url(#chartGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <motion.path
                  d="M0 150 Q 100 160, 200 130 T 400 140 T 600 100 T 800 50"
                  stroke="#cfbcff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[28px] shadow-lg">
            <h3 className="text-[19px] font-bold tracking-tight text-white mb-6">Recent Activity</h3>
            <div className="space-y-0.5">
              <ActivityRow 
                title="Incoming Message" 
                detail="from: +1 (555) 819-2834" 
                time="2 MIN AGO" 
                icon={ArrowDownLeft} 
                iconBg="bg-[#cfbcff]" 
              />
              <ActivityRow 
                title="Webhook Triggered" 
                detail="POST /api/v1/callback" 
                time="15 MIN AGO" 
                icon={Zap} 
                iconBg="bg-[#ffcc00]" 
              />
              <ActivityRow 
                title="API Rate Limit Hit" 
                detail="Device ID: 8A9B2C" 
                time="1 HR AGO" 
                icon={AlertCircle} 
                iconBg="bg-[#ff3b30]" 
              />
            </div>
          </div>
        </div>

        {/* Quick Start Card */}
        <div className="space-y-6">
          <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[24px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />
            
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Zap size={24} fill="currentColor" fillOpacity="0.2" />
            </div>
            
            <h3 className="text-[20px] font-bold tracking-tight text-white mb-3">Quick Start</h3>
            <p className="text-[14px] text-[#8e8e93] font-medium leading-relaxed mb-8">
              You haven't fully utilized your current plan. Set up a new WhatsApp service instance in minutes.
            </p>
            
            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-primary" />
                <span className="text-[14px] font-bold text-white/80">Create Instance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-primary" />
                <span className="text-[14px] font-bold text-white/80">Scan QR Code</span>
              </div>
              <div className="flex items-center gap-3">
                <Circle size={18} className="text-[#8e8e93]/30" />
                <span className="text-[14px] font-bold text-[#8e8e93]">Send first message</span>
              </div>
            </div>
            
            <button className="w-full bg-[#cfbcff] text-[#381e72] py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_25px_rgba(207,188,255,0.15)]">
              <Plus size={18} />
              Create Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
