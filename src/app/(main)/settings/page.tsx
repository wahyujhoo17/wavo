"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Key, 
  Plus, 
  Copy, 
  Trash2, 
  ChevronDown,
  ArrowRight,
  Activity
} from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/lib/toast';

const SettingsSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
    {/* Left Column */}
    <div className="lg:col-span-2 space-y-8">
      {/* Profile Card Skeleton */}
      <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/5" />
          <div className="space-y-2">
            <div className="h-6 bg-white/5 rounded-lg w-40" />
            <div className="h-4 bg-white/5 rounded-lg w-56" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="h-3 bg-white/5 rounded w-20" />
            <div className="h-14 bg-white/5 rounded-2xl w-full" />
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-white/5 rounded w-20" />
            <div className="h-14 bg-white/5 rounded-2xl w-full" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-white/5 rounded w-20" />
          <div className="h-14 bg-white/5 rounded-2xl w-full" />
        </div>
        <div className="flex justify-end pt-4">
          <div className="h-14 bg-white/5 rounded-2xl w-40" />
        </div>
      </div>

      {/* Security Card Skeleton */}
      <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] space-y-8">
        <div className="h-6 bg-white/5 rounded-lg w-1/3" />
        <div className="h-24 bg-white/5 rounded-[24px] w-full" />
        <div className="space-y-4">
          <div className="h-20 bg-white/5 rounded-[24px] w-full" />
          <div className="h-20 bg-white/5 rounded-[24px] w-full" />
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-8">
      <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] space-y-8">
        <div className="h-6 bg-white/5 rounded-lg w-1/2" />
        <div className="space-y-6">
          {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl w-full" />)}
        </div>
      </div>
      <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] space-y-6">
        <div className="h-6 bg-white/5 rounded-lg w-1/3" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl w-full" />)}
        </div>
      </div>
      <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] h-64" />
    </div>
  </div>
);

const Card = ({ title, subtitle, children, extra, className = "" }: any) => (
  <div className={`bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] shadow-xl ${className}`}>
    <div className="flex justify-between items-start mb-8">
      <div>
        <h3 className="text-[20px] font-bold text-white tracking-tight">{title}</h3>
        {subtitle && <p className="text-[14px] text-[#8e8e93] font-medium mt-1.5">{subtitle}</p>}
      </div>
      {extra}
    </div>
    {children}
  </div>
);

const UsageBar = ({ label, current, max, color }: any) => {
  const percentage = (current / max) * 100;
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-[12px] font-bold">
        <span className="text-[#8e8e93] uppercase tracking-[0.15em]">{label}</span>
        <span className="text-white">{current.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden p-[2px]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    toast.success("Profile Updated", "Your changes have been saved successfully.");
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.info("Copied to Clipboard", "API key has been copied successfully.");
  };

  const renderContent = () => {
    if (isLoading) return <SettingsSkeleton />;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card title="User Profile" subtitle="Update your photo and personal details.">
            <div className="flex items-center gap-6 mb-10">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 p-1.5">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#2c2c2e]">
                  <Image 
                    src="https://avatar.vercel.sh/alex" 
                    alt="User Avatar"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <User size={24} className="text-white" />
                </button>
              </div>
              <div className="space-y-1">
                <h4 className="text-[20px] font-bold text-white">Alex Rivera</h4>
                <p className="text-[14px] text-[#8e8e93] font-medium">alex.rivera@devos.io</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider px-1">Full Name</label>
                <input 
                  defaultValue="Alex Rivera"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white text-[15px] outline-none focus:border-primary/40 transition-all font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider px-1">Email Address</label>
                <input 
                  defaultValue="alex.rivera@devos.io"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white text-[15px] outline-none focus:border-primary/40 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider px-1">Developer Role</label>
              <div className="relative">
                <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white text-[15px] outline-none appearance-none cursor-pointer focus:border-primary/40 transition-all font-medium">
                  <option>Full Stack Developer</option>
                  <option>Backend Engineer</option>
                  <option>Frontend Specialist</option>
                  <option>DevOps Lead</option>
                </select>
                <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8e8e93] pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/[0.03]">
              <button 
                onClick={handleSave}
                className="px-10 py-4 bg-[#cfbcff] text-[#381e72] rounded-2xl font-bold text-[15px] hover:opacity-90 transition-all shadow-[0_0_30px_rgba(207,188,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </Card>

          <Card 
            title="Security & API" 
            subtitle="Manage your credentials and access tokens."
            extra={
              <button 
                onClick={() => toast.success("New Key", "Generated SK_PROD_...")}
                className="flex items-center gap-2.5 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-[14px] hover:bg-white/10 transition-all"
              >
                <Plus size={18} />
                New Key
              </button>
            }
          >
            <div className="mt-4 space-y-6">
              <div className="p-6 bg-black/20 rounded-[24px] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#cfbcff]/10 flex items-center justify-center text-[#cfbcff] shadow-inner">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-white">Two-Factor Authentication</h4>
                    <p className="text-[13px] text-[#8e8e93] font-medium">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-12 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[19px] after:w-[19px] after:transition-all peer-checked:bg-[#cfbcff]"></div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h5 className="text-[11px] font-bold text-[#8e8e93] uppercase tracking-[0.25em] px-1">Active API Keys</h5>
                {[
                  { key: 'sk_prod_52x9...4f2a', date: 'Aug 24, 2023' },
                  { key: 'sk_test_11k0...92k1', date: 'Jan 12, 2024' }
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-black/20 border border-white/5 rounded-[24px] flex items-center justify-between group hover:bg-black/30 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#8e8e93] group-hover:text-white transition-colors">
                        <Key size={18} />
                      </div>
                      <div>
                        <p className="text-[14px] font-mono text-white font-bold tracking-tight">{item.key}</p>
                        <p className="text-[12px] text-[#8e8e93] font-medium">Created {item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleCopy(item.key)}
                        className="p-2.5 bg-white/5 text-[#8e8e93] hover:text-white hover:bg-white/10 rounded-xl transition-all"
                      >
                        <Copy size={16} />
                      </button>
                      <button className="p-2.5 bg-white/5 text-[#ff3b30]/60 hover:text-[#ff3b30] hover:bg-[#ff3b30]/10 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <Card title="Resource Usage" subtitle="Consumption of your current plan.">
            <div className="space-y-8 mt-6">
              <UsageBar label="Messages Sent" current={8420} max={10000} color="bg-[#cfbcff]" />
              <UsageBar label="API Requests" current={42100} max={50000} color="bg-[#FFCC00]" />
              <UsageBar label="Daily Usage" current={840} max={1000} color="bg-[#34C759]" />
              <div className="pt-6 border-t border-white/[0.03]">
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-[14px] hover:bg-white/10 transition-all shadow-xl">
                  Manage Subscription
                </button>
              </div>
            </div>
          </Card>

          <Card 
            title="Team" 
            extra={<button className="text-[13px] font-bold text-[#cfbcff] hover:underline transition-all">Invite</button>}
          >
            <div className="space-y-5 mt-4">
              {[
                { name: 'James Chen', email: 'james@devos.io', role: 'ADMIN', avatar: 'james' },
                { name: 'Sarah Smith', email: 'sarah@devos.io', role: 'DEV', avatar: 'sarah' },
                { name: 'Michael K.', email: 'Pending', role: '', avatar: 'mk' }
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between group p-2 hover:bg-white/[0.02] rounded-2xl transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 overflow-hidden border border-white/10">
                      <Image src={`https://avatar.vercel.sh/${member.avatar}`} width={40} height={40} alt={member.name} />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-white leading-none">{member.name}</p>
                      <p className="text-[11px] text-[#8e8e93] mt-1.5 font-medium">{member.email}</p>
                    </div>
                  </div>
                  {member.role ? (
                    <span className="text-[9px] font-bold px-2 py-1 bg-white/5 text-[#8e8e93] rounded-lg border border-white/5 uppercase tracking-widest">
                      {member.role}
                    </span>
                  ) : (
                    <ChevronDown size={14} className="text-[#8e8e93]" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="bg-gradient-to-br from-[#1c1c1e] to-[#0c0c0e] p-8 rounded-[32px] border border-white/[0.05] relative overflow-hidden group shadow-2xl">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Activity size={24} />
            </div>
            <h3 className="text-[18px] font-bold text-white mb-2">Need more scale?</h3>
            <p className="text-[14px] text-[#8e8e93] leading-relaxed mb-8 font-medium">
              Enterprise plans offer unlimited messages and 24/7 dedicated support.
            </p>
            <button className="flex items-center gap-2 text-[14px] font-bold text-[#cfbcff] hover:gap-3 transition-all">
              Contact Sales <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-10">
      <div className="mb-10">
        <h1 className="text-[32px] font-bold tracking-tight text-white">Settings</h1>
        <p className="text-[#8e8e93] text-[16px] font-medium mt-1">
          Manage your account preferences, security settings, and API integrations.
        </p>
      </div>
      {renderContent()}
    </div>
  );
}
