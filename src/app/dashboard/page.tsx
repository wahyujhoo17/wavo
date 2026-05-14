"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Users, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  ExternalLink,
  Plus
} from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }: { title: string; value: string; change: string; icon: any; color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}/10 text-${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <div className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
        {change}
      </div>
    </div>
    <p className="text-sm font-medium text-on-surface-variant/60 mb-1">{title}</p>
    <h3 className="text-3xl font-bold text-white tracking-tighter">{value}</h3>
  </motion.div>
);

const InstanceRow = ({ name, id, status, messages }: { name: string; id: string; status: 'online' | 'offline'; messages: string }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-on-surface-variant group-hover:text-primary transition-colors">
        {name.substring(0, 2).toUpperCase()}
      </div>
      <div>
        <h5 className="font-bold text-white tracking-tight">{name}</h5>
        <p className="text-[11px] font-medium text-on-surface-variant/40 font-mono tracking-wider">{id}</p>
      </div>
    </div>
    <div className="flex items-center gap-12">
      <div className="text-right hidden md:block">
        <p className="text-sm font-bold text-white">{messages}</p>
        <p className="text-[10px] font-medium text-on-surface-variant/40 uppercase tracking-widest">Messages</p>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></div>
        <span className={`text-xs font-bold uppercase tracking-widest ${status === 'online' ? 'text-emerald-500' : 'text-red-500'}`}>
          {status}
        </span>
      </div>
      <button className="p-2 text-on-surface-variant hover:text-white transition-colors">
        <MoreHorizontal size={20} />
      </button>
    </div>
  </div>
);

export default function OverviewPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter mb-2">System Overview</h1>
          <p className="text-on-surface-variant font-medium">Monitoring your WhatsApp API infrastructure in real-time.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)]">
          <Plus size={18} />
          New Instance
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Messages" value="1.2M" change="+12.5%" icon={Send} color="primary" />
        <StatCard title="Active Instances" value="14" change="+2" icon={Layers} color="emerald-400" />
        <StatCard title="Avg. Latency" value="142ms" change="-12ms" icon={Activity} color="amber-400" />
        <StatCard title="Success Rate" value="99.9%" change="0.0%" icon={CheckCircle2} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Active Instances Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-xl font-bold text-white tracking-tight">Active Instances</h4>
            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View All <ExternalLink size={12} />
            </button>
          </div>
          <div className="glass-card rounded-[2rem] border border-white/5 bg-white/[0.01] p-4">
            <div className="space-y-1">
              <InstanceRow name="Marketing Team" id="WAVO-INS-7812" status="online" messages="42.8k" />
              <InstanceRow name="Customer Support" id="WAVO-INS-2109" status="online" messages="128.4k" />
              <InstanceRow name="System Alerts" id="WAVO-INS-0042" status="online" messages="12.1k" />
              <InstanceRow name="Verification Bot" id="WAVO-INS-9921" status="offline" messages="85.2k" />
            </div>
          </div>
        </div>

        {/* System Health / Quick Actions */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white tracking-tight px-2">System Health</h4>
          <div className="glass-card rounded-[2rem] border border-white/5 bg-white/[0.01] p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-sm font-bold text-white/80">CPU Usage</span>
                <span className="text-xs font-bold text-emerald-400">24%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[24%]" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-sm font-bold text-white/80">Memory (RAM)</span>
                <span className="text-xs font-bold text-amber-400">62%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[62%]" />
              </div>
            </div>

            <div className="pt-4">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">System Update</p>
                  <p className="text-[13px] text-on-surface-variant font-medium leading-tight">Wavo Engine v2.1-beta is now available for manual upgrade.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
