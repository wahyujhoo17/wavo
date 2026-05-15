"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Copy, 
  Play, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ShieldCheck,
  Bell,
  Activity,
  ChevronRight
} from 'lucide-react';

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

const EventCheckbox = ({ title, description, defaultChecked = false }: any) => (
  <label className="flex gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 cursor-pointer hover:border-white/10 transition-all group">
    <div className="pt-1">
      <input type="checkbox" defaultChecked={defaultChecked} className="w-5 h-5 rounded-lg border-white/10 bg-white/5 accent-[#cfbcff] cursor-pointer" />
    </div>
    <div>
      <h4 className="text-[14px] font-bold text-white group-hover:text-[#cfbcff] transition-colors">{title}</h4>
      <p className="text-[12px] text-[#8e8e93] leading-relaxed mt-1">{description}</p>
    </div>
  </label>
);

const DeliveryRow = ({ id, time, status, statusColor }: any) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-all cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
      <div>
        <p className="text-[13px] font-mono text-white font-medium">{id}</p>
        <p className="text-[11px] text-[#8e8e93] font-medium">{time}</p>
      </div>
    </div>
    <div className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider border ${
      status === '200 OK' ? 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20' : 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20'
    }`}>
      {status}
    </div>
  </div>
);

export default function WebhooksPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight text-white">Webhooks</h1>
          <p className="text-[#8e8e93] text-[15px] font-medium mt-1 max-w-[600px]">
            Configure webhooks to receive real-time HTTP POST notifications about events occurring in your WhatsApp API integration.
          </p>
        </div>
        <div className="px-4 py-2 bg-[#34C759]/10 border border-[#34C759]/20 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
          <span className="text-[11px] font-bold text-[#34C759] uppercase tracking-wider">System Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card 
            title="Endpoint Configuration" 
            extra={
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-[13px] hover:bg-white/10 transition-all">
                <Save size={16} />
                Save Changes
              </button>
            }
          >
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider">Payload URL</label>
                <div className="flex bg-black/40 border border-white/10 rounded-xl overflow-hidden group focus-within:border-[#cfbcff]/50 transition-all">
                  <div className="bg-white/5 px-4 py-3 text-[12px] font-bold text-[#8e8e93] border-r border-white/5 flex items-center">POST</div>
                  <input 
                    defaultValue="https://api.example.com/v1/whatsapp/webhook" 
                    className="flex-1 bg-transparent px-4 py-3 text-[14px] font-mono text-white outline-none"
                  />
                </div>
                <p className="text-[11px] text-[#8e8e93] font-medium">The URL where DeVOS will send HTTP POST requests.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider">Signing Secret</label>
                <div className="flex gap-2">
                  <input 
                    type="password"
                    readOnly 
                    value="whsec_8f92a1b02c89654178921bb" 
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] font-mono text-white outline-none"
                  />
                  <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#8e8e93] hover:text-white transition-all">
                    <Copy size={18} />
                  </button>
                </div>
                <p className="text-[11px] text-[#8e8e93] font-medium">Used to verify that webhooks are sent by DeVOS. Keep this secret safe.</p>
              </div>
            </div>
          </Card>

          <Card title="Subscribed Events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <EventCheckbox 
                title="Message Received" 
                description="Triggered when an incoming message is received from a user."
                defaultChecked={true}
              />
              <EventCheckbox 
                title="Message Status" 
                description="Updates when a message is Sent, Delivered, or Read."
                defaultChecked={true}
              />
              <EventCheckbox 
                title="Service Status" 
                description="Notifications about WhatsApp API connection health."
              />
              <EventCheckbox 
                title="System Alerts" 
                description="Critical alerts regarding your DeVOS account usage."
                defaultChecked={true}
              />
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="flex flex-col items-center text-center py-10">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#8e8e93] mb-6">
              <Play size={28} className="ml-1" />
            </div>
            <h3 className="text-[20px] font-bold text-white mb-2">Test Connection</h3>
            <p className="text-[14px] text-[#8e8e93] font-medium leading-relaxed mb-8 px-4">
              Send a sample JSON payload to your configured URL to verify connectivity.
            </p>
            <button className="w-full py-3.5 bg-[#00c896] text-black font-bold rounded-xl text-[15px] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,200,150,0.2)]">
              <Zap size={18} fill="currentColor" />
              Test Webhook
            </button>
          </Card>

          <Card 
            title="Recent Deliveries" 
            extra={<button className="text-[12px] font-bold text-[#cfbcff] hover:text-white transition-all">View All</button>}
          >
            <div className="space-y-2 mt-4">
              <DeliveryRow id="evt_89xK2mP" time="Just now" status="200 OK" statusColor="bg-[#34C759]" />
              <DeliveryRow id="evt_72mN4qR" time="5m ago" status="500 ERR" statusColor="bg-[#FF3B30]" />
              <DeliveryRow id="evt_31pL9wT" time="12m ago" status="200 OK" statusColor="bg-[#34C759]" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
