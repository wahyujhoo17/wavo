"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Briefcase, 
  Shield, 
  Key, 
  Plus, 
  Copy, 
  Trash2, 
  ExternalLink,
  Users,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Activity
} from 'lucide-react';
import Image from 'next/image';

const Card = ({ title, subtitle, children, extra, className = "" }: any) => (
  <div className={`bg-[#1c1c1e] border border-white/[0.05] p-6 rounded-[24px] ${className}`}>
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-[18px] font-bold text-white tracking-tight">{title}</h3>
        {subtitle && <p className="text-[13px] text-[#8e8e93] font-medium mt-1">{subtitle}</p>}
      </div>
      {extra}
    </div>
    {children}
  </div>
);

const UsageBar = ({ label, current, max, color }: any) => {
  const percentage = (current / max) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[12px] font-bold">
        <span className="text-[#8e8e93] uppercase tracking-wider">{label}</span>
        <span className="text-white">{current.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
};

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* User Profile */}
          <Card title="User Profile" subtitle="Update your photo and personal details.">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#2c2c2e]">
                  <Image 
                    src="https://avatar.vercel.sh/alex" 
                    alt="User Avatar"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <User size={20} className="text-white" />
                </button>
              </div>
              <div className="space-y-1">
                <h4 className="text-[16px] font-bold text-white">Alex Rivera</h4>
                <p className="text-[13px] text-[#8e8e93]">alex.rivera@devos.io</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider">Full Name</label>
                <input 
                  defaultValue="Alex Rivera"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-[14px] outline-none focus:border-primary/40 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider">Email Address</label>
                <input 
                  defaultValue="alex.rivera@devos.io"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-[14px] outline-none focus:border-primary/40 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider">Developer Role</label>
              <div className="relative">
                <select className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-[14px] outline-none appearance-none cursor-pointer focus:border-primary/40 transition-all">
                  <option>Full Stack Developer</option>
                  <option>Backend Engineer</option>
                  <option>Frontend Specialist</option>
                  <option>DevOps Lead</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e8e93] pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-8 py-3 bg-[#cfbcff] text-[#381e72] rounded-xl font-bold text-[14px] hover:opacity-90 transition-all shadow-[0_0_20px_rgba(207,188,255,0.2)]">
                Save Changes
              </button>
            </div>
          </Card>

          {/* Security & API */}
          <Card 
            title="Security & API" 
            subtitle="Manage your credentials and access tokens."
            extra={
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-[13px] hover:bg-white/10 transition-all">
                <Plus size={16} />
                Create New Key
              </button>
            }
          >
            <div className="mt-8 space-y-6">
              <div className="p-5 bg-black/20 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#cfbcff]/10 flex items-center justify-center text-[#cfbcff]">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white">Two-Factor Authentication</h4>
                    <p className="text-[12px] text-[#8e8e93]">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#cfbcff]"></div>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-widest">Active API Keys</h5>
                {[
                  { key: 'sk_prod_••••••••••••4f2a', date: 'Aug 24, 2023' },
                  { key: 'sk_test_••••••••••••92k1', date: 'Jan 12, 2024' }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-black/20 border border-white/5 rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <Key size={18} className="text-[#8e8e93]" />
                      <div>
                        <p className="text-[13px] font-mono text-white font-medium">{item.key}</p>
                        <p className="text-[11px] text-[#8e8e93]">Created {item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-[#8e8e93] hover:text-white transition-colors"><Copy size={16} /></button>
                      <button className="p-2 text-[#ff3b30]/60 hover:text-[#ff3b30] transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Usage Stats (formerly Pro Plan) */}
          <Card title="Usage" subtitle="Overview of your current resource consumption.">
            <div className="space-y-6 mt-4">
              <div className="flex justify-between items-center bg-[#cfbcff]/10 p-3 rounded-xl border border-[#cfbcff]/20">
                <span className="text-[11px] font-bold text-[#cfbcff] uppercase tracking-wider">Pro Plan</span>
                <span className="text-[18px] font-bold text-white">$49/month</span>
              </div>
              
              <UsageBar 
                label="Messages Sent" 
                current={8420} 
                max={10000} 
                color="bg-[#cfbcff]"
              />
              <UsageBar 
                label="API Requests" 
                current={42100} 
                max={50000} 
                color="bg-[#FFCC00]"
              />
              
              <div className="pt-4 flex flex-col gap-3">
                <div className="flex justify-between text-[12px] font-medium">
                  <span className="text-[#8e8e93]">Daily Usage Limit</span>
                  <span className="text-[#34C759]">84% used</span>
                </div>
                <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-[13px] hover:bg-white/10 transition-all">
                  Manage Subscription
                </button>
              </div>
            </div>
          </Card>

          {/* Team Members */}
          <Card 
            title="Team Members" 
            extra={<button className="text-[12px] font-bold text-[#cfbcff] hover:text-white transition-all">Invite Member</button>}
          >
            <div className="space-y-4 mt-4">
              {[
                { name: 'James Chen', email: 'james@devos.io', role: 'ADMIN', avatar: 'james' },
                { name: 'Sarah Smith', email: 'sarah@devos.io', role: 'DEVELOPER', avatar: 'sarah' },
                { name: 'Michael K.', email: 'Pending Invite', role: '', avatar: 'mk' }
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/5 overflow-hidden">
                      <Image src={`https://avatar.vercel.sh/${member.avatar}`} width={36} height={36} alt={member.name} />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white">{member.name}</p>
                      <p className="text-[11px] text-[#8e8e93]">{member.email}</p>
                    </div>
                  </div>
                  {member.role ? (
                    <span className="text-[9px] font-bold px-2 py-1 bg-white/5 text-[#8e8e93] rounded border border-white/5">
                      {member.role}
                    </span>
                  ) : (
                    <button className="p-1.5 text-[#8e8e93] opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronDown size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Scale Card */}
          <div className="bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e] p-6 rounded-[24px] border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            <h3 className="text-[16px] font-bold text-white mb-2">Need more scale?</h3>
            <p className="text-[13px] text-[#8e8e93] leading-relaxed mb-6">
              Enterprise plans offer unlimited messages and dedicated support.
            </p>
            <button className="flex items-center gap-2 text-[13px] font-bold text-white group-hover:gap-3 transition-all">
              Contact Sales <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
