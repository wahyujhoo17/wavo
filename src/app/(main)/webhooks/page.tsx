"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Copy, 
  Zap, 
  Activity
} from 'lucide-react';
import { toast } from '@/lib/toast';

const WebhooksSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
    {/* Left Column */}
    <div className="lg:col-span-2 space-y-8">
      {/* Endpoint Config Skeleton */}
      <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] space-y-8">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-white/5 rounded-lg w-1/3" />
          <div className="h-12 bg-white/5 rounded-2xl w-32" />
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="h-3 bg-white/5 rounded w-24" />
            <div className="h-14 bg-white/5 rounded-2xl w-full" />
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-white/5 rounded w-24" />
            <div className="h-14 bg-white/5 rounded-2xl w-full" />
          </div>
        </div>
      </div>

      {/* Events Card Skeleton */}
      <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] space-y-8">
        <div className="h-6 bg-white/5 rounded-lg w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-[100px] bg-white/5 rounded-[24px] w-full" />
          ))}
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-8">
      {/* Test Connection Skeleton */}
      <div className="bg-[#1c1c1e] border border-white/[0.05] p-10 rounded-[40px] flex flex-col items-center space-y-6">
        <div className="w-20 h-20 rounded-[28px] bg-white/5" />
        <div className="h-6 bg-white/5 rounded-lg w-1/2" />
        <div className="h-20 bg-white/5 rounded-2xl w-full" />
        <div className="h-14 bg-white/5 rounded-2xl w-full" />
      </div>

      {/* Deliveries Skeleton */}
      <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] space-y-6">
        <div className="flex justify-between">
          <div className="h-6 bg-white/5 rounded-lg w-1/3" />
          <div className="h-4 bg-white/5 rounded-lg w-16" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-white/5 rounded-2xl w-full" />
          ))}
        </div>
      </div>
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

const EventCheckbox = ({ title, description, defaultChecked = false }: any) => {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <label 
      className={`flex gap-4 p-5 rounded-[24px] border transition-all group cursor-pointer ${
        checked ? 'bg-[#cfbcff]/5 border-[#cfbcff]/20' : 'bg-black/20 border-white/5 hover:border-white/10'
      }`}
    >
      <div className="pt-1">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => {
            setChecked(e.target.checked);
            toast.info(e.target.checked ? "Event Subscribed" : "Event Unsubscribed", title);
          }}
          className="w-5 h-5 rounded-lg border-white/10 bg-white/5 accent-[#cfbcff] cursor-pointer" 
        />
      </div>
      <div>
        <h4 className={`text-[15px] font-bold transition-colors ${checked ? 'text-white' : 'text-[#8e8e93]'}`}>{title}</h4>
        <p className="text-[12px] text-[#8e8e93]/60 leading-relaxed mt-1.5 font-medium">{description}</p>
      </div>
    </label>
  );
};

const DeliveryRow = ({ id, time, status, statusColor }: any) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.02] transition-all cursor-pointer group border border-transparent hover:border-white/5">
    <div className="flex items-center gap-4">
      <div className={`w-2 h-2 rounded-full ${statusColor} shadow-[0_0_10px_currentColor]`} />
      <div>
        <p className="text-[14px] font-mono text-white font-bold tracking-tight">{id}</p>
        <p className="text-[12px] text-[#8e8e93] font-medium mt-0.5">{time}</p>
      </div>
    </div>
    <div className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border ${
      status === '200 OK' ? 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20' : 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20'
    }`}>
      {status}
    </div>
  </div>
);

export default function WebhooksPage() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    toast.success("Webhook Saved", "Configuration has been updated and propagated.");
  };

  const handleTest = () => {
    toast.info("Sending Test Payload...", "Verify your server logs for the request.");
    setTimeout(() => {
      toast.success("Test Success", "HTTP 200 OK received from endpoint.");
    }, 1500);
  };

  const handleCopySecret = () => {
    navigator.clipboard.writeText("whsec_8f92a1b02c89654178921bb");
    toast.info("Secret Copied", "Webhook signing secret is now in your clipboard.");
  };

  const renderContent = () => {
    if (isLoading) return <WebhooksSkeleton />;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card 
            title="Endpoint Configuration" 
            extra={
              <button 
                onClick={handleSave}
                className="flex items-center gap-2.5 px-6 py-3 bg-[#cfbcff] text-[#381e72] rounded-2xl font-bold text-[14px] hover:opacity-90 transition-all shadow-[0_0_20px_rgba(207,188,255,0.2)]"
              >
                <Save size={18} />
                Save Changes
              </button>
            }
          >
            <div className="space-y-8 mt-4">
              <div className="space-y-3">
                <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider px-1">Payload URL</label>
                <div className="flex bg-black/40 border border-white/5 rounded-2xl overflow-hidden group focus-within:border-[#cfbcff]/40 transition-all shadow-inner">
                  <div className="bg-white/5 px-5 py-4 text-[13px] font-bold text-[#8e8e93] border-r border-white/5 flex items-center">POST</div>
                  <input 
                    defaultValue="https://api.wavo.io/v1/webhook" 
                    className="flex-1 bg-transparent px-5 py-4 text-[15px] font-mono text-white outline-none font-medium"
                  />
                </div>
                <p className="text-[12px] text-[#8e8e93]/60 font-medium px-1">The URL where Wavo will send real-time event notifications.</p>
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider px-1">Signing Secret</label>
                <div className="flex gap-3">
                  <input 
                    type="password"
                    readOnly 
                    value="whsec_8f92a1b02c89654178921bb" 
                    className="flex-1 bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-[15px] font-mono text-white outline-none font-medium shadow-inner"
                  />
                  <button 
                    onClick={handleCopySecret}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[#8e8e93] hover:text-white transition-all shadow-xl"
                  >
                    <Copy size={20} />
                  </button>
                </div>
                <p className="text-[12px] text-[#8e8e93]/60 font-medium px-1">Verify that requests are legitimate using this secret. <span className="text-[#cfbcff] cursor-pointer hover:underline">Learn more</span></p>
              </div>
            </div>
          </Card>
          <Card title="Subscribed Events" subtitle="Select which events trigger a webhook notification.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <EventCheckbox title="Message Received" description="Triggered when an incoming message is received from a contact." defaultChecked={true} />
              <EventCheckbox title="Message Status" description="Updates when a message is Sent, Delivered, or Read." defaultChecked={true} />
              <EventCheckbox title="Service Status" description="Notifications about WhatsApp API connection health changes." />
              <EventCheckbox title="System Alerts" description="Critical notifications regarding account usage and quotas." defaultChecked={true} />
            </div>
          </Card>
        </div>
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#1c1c1e] to-[#0c0c0e] border border-white/[0.05] rounded-[40px] flex flex-col items-center text-center p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-1000" />
            <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center text-[#8e8e93] mb-8 border border-white/5 shadow-xl group-hover:scale-110 transition-transform duration-500">
              <Zap size={32} className="text-[#00c896]" fill="currentColor" />
            </div>
            <h3 className="text-[22px] font-bold text-white mb-3 tracking-tight">Test Connectivity</h3>
            <p className="text-[15px] text-[#8e8e93] font-medium leading-relaxed mb-10 px-2">Send a sample JSON payload to your server to ensure your endpoint is reachable.</p>
            <button onClick={handleTest} className="w-full py-4 bg-[#00c896] text-black font-bold rounded-2xl text-[15px] flex items-center justify-center gap-2.5 hover:opacity-90 transition-all shadow-[0_0_30px_rgba(0,200,150,0.25)] hover:scale-[1.02] active:scale-[0.98]">
              <Activity size={18} /> Ping Endpoint
            </button>
          </div>
          <Card title="Recent Deliveries" extra={<button className="text-[13px] font-bold text-[#cfbcff] hover:underline transition-all">History</button>}>
            <div className="space-y-3 mt-4">
              <DeliveryRow id="evt_89xK2mP" time="Just now" status="200 OK" statusColor="bg-[#34C759]" />
              <DeliveryRow id="evt_72mN4qR" time="5m ago" status="500 ERR" statusColor="bg-[#FF3B30]" />
              <DeliveryRow id="evt_31pL9wT" time="12m ago" status="200 OK" statusColor="bg-[#34C759]" />
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight text-white">Webhooks</h1>
          <p className="text-[#8e8e93] text-[16px] font-medium mt-1 max-w-[640px] leading-relaxed">
            Configure real-time HTTP POST notifications to stay updated on message delivery, status changes, and system alerts.
          </p>
        </div>
        <div className="px-5 py-2.5 bg-[#34C759]/10 border border-[#34C759]/20 rounded-2xl flex items-center gap-2.5 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-[#34C759] animate-pulse shadow-[0_0_12px_#34C759]" />
          <span className="text-[11px] font-bold text-[#34C759] uppercase tracking-[0.2em]">Live Status: Active</span>
        </div>
      </div>
      {renderContent()}
    </div>
  );
}
