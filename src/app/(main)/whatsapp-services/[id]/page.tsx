"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Pause, 
  RefreshCw, 
  QrCode, 
  Battery, 
  Monitor, 
  Activity, 
  Copy, 
  Eye, 
  EyeOff,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Save,
  ArrowRight
} from 'lucide-react';

const Card = ({ title, subtitle, children, extra }: any) => (
  <div className="bg-[#1c1c1e] border border-white/[0.05] p-6 rounded-[24px] h-full">
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

const LogRow = ({ time, event, status, color }: any) => (
  <div className="flex items-center justify-between py-4 border-b border-white/[0.03] last:border-none group hover:bg-white/[0.01] px-2 transition-all cursor-pointer rounded-xl">
    <div className="grid grid-cols-4 w-full items-center">
      <div className="text-[14px] text-white font-medium">{time}</div>
      <div className="text-[14px] text-[#8e8e93] font-mono">{event}</div>
      <div className="flex justify-center">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${color}`}>
          {status}
        </span>
      </div>
      <div className="flex justify-end">
        <ArrowRight size={16} className="text-[#8e8e93] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
      </div>
    </div>
  </div>
);

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [showSecret, setShowSecret] = React.useState(false);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/whatsapp-services" className="flex items-center gap-2 text-[#8e8e93] hover:text-white transition-colors text-[14px] font-medium mb-4 group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-[32px] font-bold tracking-tight text-white">Marketing Bot</h1>
            <span className="px-3 py-1 bg-[#FFCC00]/10 text-[#FFCC00] text-[11px] font-bold rounded-full border border-[#FFCC00]/20 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
              Connecting
            </span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-[14px] hover:bg-white/10 transition-all">
          <Pause size={16} />
          Pause Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scan to Connect */}
        <Card title="Scan to Connect" subtitle="Open WhatsApp on your device and link via QR code.">
          <div className="mt-8 flex flex-col items-center justify-center p-8 bg-black/20 rounded-[20px] border border-white/5 relative overflow-hidden group">
            <div className="relative w-48 h-48 flex items-center justify-center">
               {/* QR Placeholder Animation */}
               <div className="grid grid-cols-3 gap-2 opacity-10">
                 {[...Array(9)].map((_, i) => (
                   <div key={i} className="w-12 h-12 bg-white rounded-md" />
                 ))}
               </div>
               <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                 <RefreshCw size={32} className="text-[#cfbcff] animate-spin-slow" />
                 <span className="text-[12px] font-bold text-white tracking-[0.2em] uppercase">Generating</span>
               </div>
            </div>
          </div>
        </Card>

        {/* Device Info */}
        <div className="lg:col-span-2">
          <Card 
            title="Device Info" 
            subtitle="Current connection status and hardware details."
            extra={<button className="p-2 text-[#8e8e93] hover:text-white transition-colors"><RefreshCw size={18} /></button>}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Status', value: 'Disconnected', icon: Activity, color: 'text-[#FF3B30]' },
                { label: 'Battery', value: '--% (Not linked)', icon: Battery, color: 'text-[#8e8e93]' },
                { label: 'Platform', value: 'Unknown', icon: Monitor, color: 'text-[#8e8e93]' }
              ].map((item, i) => (
                <div key={i} className="bg-black/20 border border-white/5 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 text-[#8e8e93] mb-3">
                    <item.icon size={18} />
                    <span className="text-[12px] font-bold uppercase tracking-wider">{item.label}</span>
                  </div>
                  <div className={`text-[16px] font-bold ${item.color} flex items-center gap-2`}>
                    {item.label === 'Status' && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]" />}
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Credentials */}
        <Card title="API Credentials" subtitle="Use these credentials to authenticate your API requests.">
          <div className="space-y-6 mt-8">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider">Service ID</label>
              <div className="flex gap-2">
                <input 
                  readOnly 
                  value="svc_mkbt_8f92a1b" 
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] font-mono text-white outline-none"
                />
                <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#8e8e93] hover:text-white transition-all">
                  <Copy size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider">API Key</label>
              <div className="flex gap-2">
                <input 
                  type={showApiKey ? 'text' : 'password'}
                  readOnly 
                  value="wavo_sk_test_51MzS2gL8y2w9x8k9z0P1Q2R3S4T5U6V7W8" 
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] font-mono text-white outline-none"
                />
                <button 
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#8e8e93] hover:text-white transition-all"
                >
                  {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#8e8e93] hover:text-white transition-all">
                  <Copy size={18} />
                </button>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button className="flex items-center gap-2 text-[13px] font-bold text-[#cfbcff] hover:text-white transition-colors">
                <RefreshCw size={14} />
                Regenerate Key
              </button>
            </div>
          </div>
        </Card>

        {/* Webhook Settings */}
        <Card 
          title="Webhook Settings" 
          subtitle="Receive real-time event payloads."
          extra={
            <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#cfbcff]"></div>
            </div>
          }
        >
          <div className="space-y-6 mt-8">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider">Callback URL</label>
              <input 
                defaultValue="https://app.acmecorp.com/webhooks/whatsapp" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] font-mono text-white outline-none focus:border-[#cfbcff]/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider">Signing Secret</label>
              <div className="flex gap-2">
                <input 
                  type={showSecret ? 'text' : 'password'}
                  readOnly 
                  value="whsec_8f92a1b02c896541" 
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] font-mono text-white outline-none"
                />
                <button 
                  onClick={() => setShowSecret(!showSecret)}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#8e8e93] hover:text-white transition-all"
                >
                  {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[11px] text-[#8e8e93] font-medium mt-1">Used to verify the payload signature.</p>
            </div>
            <div className="pt-2 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-xl text-[14px] hover:bg-white/90 transition-all">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Logs */}
      <Card title="Recent Logs" subtitle="Latest activity for this service." extra={<button className="text-[13px] font-bold text-[#cfbcff] flex items-center gap-2 hover:text-white transition-all">View All <ArrowRight size={14} /></button>}>
        <div className="mt-6">
          <div className="grid grid-cols-4 w-full px-2 py-3 border-b border-white/[0.05] text-[12px] font-bold text-[#8e8e93] uppercase tracking-widest">
            <div>Timestamp</div>
            <div>Event Type</div>
            <div className="text-center">Status</div>
            <div className="text-right">Details</div>
          </div>
          <div className="divide-y divide-white/[0.01]">
            <LogRow time="10:42:01 AM" event="connection.attempt" status="Failed" color="bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20" />
            <LogRow time="10:35:12 AM" event="webhook.delivery" status="200 OK" color="bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20" />
            <LogRow time="10:35:10 AM" event="message.received" status="Processed" color="bg-white/10 text-white border border-white/20" />
          </div>
        </div>
      </Card>
    </div>
  );
}
