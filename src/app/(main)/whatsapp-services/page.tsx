"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  MoreVertical, 
  Smartphone, 
  Zap, 
  Globe, 
  Trash2,
  CheckCircle2,
  QrCode,
  Clock,
  RefreshCw,
  LogOut,
  Eye,
  Edit3
} from 'lucide-react';
import Image from 'next/image';

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ServiceCard = ({ name, id, status, statusText, details, actionLabel, actionIcon: ActionIcon, isQR = false }: any) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const statusColor = status === 'connected' ? 'text-[#34C759]' : status === 'qr' ? 'text-[#FFCC00]' : 'text-[#FF3B30]';
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = () => {
    router.push(`/whatsapp-services/${id}`);
  };

  return (
    <div 
      onClick={handleNavigate}
      className="bg-[#1c1c1e] border border-white/[0.05] p-6 rounded-[24px] relative group hover:border-white/10 transition-all shadow-lg cursor-pointer"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#8e8e93]">
            {isQR ? <RefreshCw size={22} className="animate-spin-slow" /> : <WhatsAppIcon size={24} />}
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-white tracking-tight">{name}</h3>
            <p className="text-[13px] text-[#8e8e93] font-medium">{id}</p>
          </div>
        </div>
        <div className="relative" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-[#8e8e93] hover:text-white transition-colors p-1"
          >
            <MoreVertical size={20} />
          </button>
          
          <AnimatePresence>
            {showDropdown && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-[#2c2c2e] border border-white/10 rounded-xl shadow-2xl z-[100] py-1 overflow-hidden"
              >
                <button 
                  onClick={handleNavigate}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-white hover:bg-white/5 transition-colors text-left"
                >
                  <Eye size={16} className="text-[#8e8e93]" />
                  View Details
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-white hover:bg-white/5 transition-colors text-left">
                  <Edit3 size={16} className="text-[#8e8e93]" />
                  Edit Service
                </button>
                <div className="h-[1px] bg-white/5 my-1" />
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#ff3b30] hover:bg-[#ff3b30]/10 transition-colors text-left">
                  <Trash2 size={16} />
                  Delete Service
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-[13px] font-medium">
          <span className="text-[#8e8e93]">Status</span>
          <span className={`flex items-center gap-1.5 font-bold ${statusColor}`}>
            {status === 'connected' && <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />}
            {statusText}
          </span>
        </div>

        {isQR ? (
          <div className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/5">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1 shrink-0">
               <QrCode size={48} className="text-black" />
            </div>
            <p className="text-[12px] text-[#8e8e93] font-medium leading-relaxed">
              Scan with WhatsApp to link device. Expires in <span className="text-white font-bold">45s</span>.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {details.map((detail: any, i: number) => (
              <div key={i} className="flex justify-between items-center text-[13px] font-medium">
                <span className="text-[#8e8e93]">{detail.label}</span>
                <span className="text-white font-bold">{detail.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button className={`flex-1 py-3 px-4 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 ${
          status === 'connected' ? 'bg-white/5 text-white hover:bg-white/10' : 
          status === 'qr' ? 'bg-[#cfbcff] text-[#381e72] hover:opacity-90' :
          'bg-white/5 text-white hover:bg-white/10'
        }`}>
          {ActionIcon && <ActionIcon size={18} />}
          {actionLabel}
        </button>
      </div>
    </div>
  );
};
import { toast } from '@/lib/toast';

const SkeletonCard = () => (
  <div className="bg-[#1c1c1e] border border-white/[0.05] p-8 rounded-[32px] space-y-6 relative overflow-hidden">
    <div className="flex justify-between items-start">
      <div className="w-14 h-14 rounded-2xl bg-white/5 animate-pulse" />
      <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
    </div>
    <div className="space-y-3">
      <div className="h-6 bg-white/5 rounded-lg w-1/2 animate-pulse" />
      <div className="h-4 bg-white/5 rounded-lg w-3/4 animate-pulse" />
    </div>
    <div className="pt-6 border-t border-white/[0.05] flex justify-between">
      <div className="h-4 bg-white/5 rounded-lg w-1/4 animate-pulse" />
      <div className="h-4 bg-white/5 rounded-lg w-1/4 animate-pulse" />
    </div>
  </div>
);

export default function WhatsAppServicesPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasData, setHasData] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreate = () => {
    setIsModalOpen(false);
    toast.success("Instance Created", "WhatsApp service initialized. You can now scan the QR code.");
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight text-white">WhatsApp Services</h1>
          <p className="text-[#8e8e93] text-[15px] font-medium mt-1">
            Manage your WhatsApp API instances, check connection status, and monitor message volume.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00c896] text-[#000] px-6 py-3 rounded-xl font-bold text-[15px] flex items-center gap-2 hover:opacity-90 transition-all shadow-[0_0_25px_rgba(0,200,150,0.2)]"
        >
          <Plus size={20} />
          Create New Service
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[500px] bg-[#1c1c1e] border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00c896]/10 rounded-full blur-3xl" />
                
                <div className="relative">
                  <h2 className="text-[24px] font-bold text-white mb-2">Create New Service</h2>
                  <p className="text-[14px] text-[#8e8e93] mb-8">Initialize a new WhatsApp instance for your application.</p>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider block px-1">Service Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Support Bot"
                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00c896]/40 transition-all"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider block px-1">Device Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00c896]/40 transition-all"
                      />
                    </div>

                    <div className="pt-4 flex gap-4">
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-3.5 px-6 rounded-xl font-bold text-[14px] text-[#8e8e93] bg-white/5 hover:bg-white/10 transition-all"
                      >
                        Cancel
                      </button>
                      <button className="flex-1 py-3.5 px-6 rounded-xl font-bold text-[14px] text-black bg-[#00c896] hover:opacity-90 transition-all">
                        Create Instance
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : !hasData ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 bg-[#1c1c1e] border border-white/[0.05] rounded-[40px] text-center"
        >
          <div className="w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center text-[#8e8e93] mb-8">
            <Smartphone size={48} />
          </div>
          <h3 className="text-[22px] font-bold text-white mb-2">No Services Connected</h3>
          <p className="text-[#8e8e93] max-w-[420px] mb-10 leading-relaxed font-medium">
            Start by creating your first WhatsApp service instance to enable API messaging and real-time event monitoring.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2.5 text-[#00c896] font-bold text-[15px] hover:underline"
          >
            <Plus size={20} strokeWidth={3} />
            Connect Your First Device
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            name="Marketing Bot"
            id="srv_mk_9821"
            status="connected"
            statusText="• Connected"
            details={[
              { label: 'Number', value: '+1 (555) 819-2834' },
              { label: 'Volume (Cycle)', value: '12,485 msg' }
            ]}
            actionLabel="Disconnect"
            actionIcon={LogOut}
            showDelete={true}
            onAction={() => toast.success("Success", "Marketing Bot disconnected.")}
          />

          <ServiceCard 
            name="Support Channel"
            id="srv_sp_4412"
            status="qr"
            statusText="QR Ready"
            isQR={true}
            actionLabel="Connect"
            showDelete={true}
            onAction={() => toast.info("Status", "Opening QR Scan interface...")}
          />

          <ServiceCard 
            name="Legacy Integration"
            id="srv_lg_1802"
            status="disconnected"
            statusText="Disconnected"
            details={[
              { label: 'Last Active', value: '2 days ago' },
              { label: 'Volume (Cycle)', value: '42 msg' }
            ]}
            actionLabel="Reconnect"
            showDelete={true}
            onAction={() => toast.error("Error", "Failed to reconnect. Please re-scan.")}
          />
        </div>
      )}
    </div>
  );
}
