"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  Download, 
  RefreshCw, 
  Copy, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Terminal,
  Clock,
  Filter,
  Smartphone,
  Plus
} from 'lucide-react';
import { toast } from '@/lib/toast';

const LogsSkeleton = () => (
  <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden min-h-0 animate-pulse">
    <div className="bg-[#1c1c1e] border border-white/[0.05] rounded-[32px] flex flex-col overflow-hidden p-8 space-y-6">
      <div className="h-8 bg-white/5 rounded-xl w-full" />
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="h-16 bg-white/5 rounded-2xl w-full" />
      ))}
    </div>
    <div className="bg-[#1c1c1e] border border-white/[0.05] rounded-[32px] flex flex-col overflow-hidden p-8 space-y-8">
      <div className="h-10 bg-white/5 rounded-xl w-3/4" />
      <div className="h-32 bg-white/5 rounded-2xl w-full" />
      <div className="h-48 bg-white/5 rounded-2xl w-full" />
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    '200 OK': 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20',
    '202 Accpt': 'bg-[#FFCC00]/10 text-[#FFCC00] border-[#FFCC00]/20',
    '400 Bad Req': 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20',
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border ${colors[status] || 'bg-white/10 text-white border-white/20'}`}>
      {status}
    </span>
  );
};

const MethodBadge = ({ method }: { method: string }) => {
  const colors: Record<string, string> = {
    'POST': 'text-[#FFCC00]',
    'GET': 'text-[#cfbcff]',
    'DELETE': 'text-[#FF3B30]',
  };
  return (
    <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-white/5 ${colors[method] || 'text-[#8e8e93]'}`}>
      {method}
    </span>
  );
};

const CodeBlock = ({ label, code, status }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h4 className="text-[14px] font-bold text-white flex items-center gap-2">
        {label} {status && <span className="text-[#34C759] text-[12px]">({status})</span>}
      </h4>
      <div className="flex gap-4 text-[12px] font-bold text-[#8e8e93]">
        <button 
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(code, null, 2));
            toast.info("Copied", `${label} copied to clipboard.`);
          }}
          className="hover:text-white transition-colors"
        >
          Copy
        </button>
        <button className="hover:text-white transition-colors">JSON</button>
      </div>
    </div>
    <div className="bg-[#0c0c0e] border border-white/[0.05] rounded-[24px] p-6 overflow-x-auto custom-scrollbar shadow-inner">
      <pre className="text-[13px] font-mono leading-relaxed text-[#8e8e93]">
        <code>{JSON.stringify(code, null, 2)}</code>
      </pre>
    </div>
  </div>
);

const FilterDropdown = ({ label, icon: Icon, options, selected, onSelect }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all font-bold text-[14px] border ${
          isOpen ? 'bg-white/10 text-white border-white/20' : 'bg-[#1c1c1e] border-white/[0.05] text-[#8e8e93] hover:text-white'
        }`}
      >
        <Icon size={18} />
        {selected || label}
        <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 mt-3 w-56 bg-[#1c1c1e] border border-white/10 rounded-[24px] shadow-2xl z-[100] py-2 overflow-hidden backdrop-blur-xl"
          >
            {options.map((option: string) => (
              <button 
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-5 py-3 text-[13px] transition-colors text-left ${
                  selected === option ? 'bg-primary/10 text-primary font-bold' : 'text-[#8e8e93] hover:bg-white/5 hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function LogsPage() {
  const [selectedLog, setSelectedLog] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filters, setFilters] = React.useState({
    time: 'Last 1 Hour',
    status: 'All Status',
    method: 'All Methods'
  });

  const logs = [
    { id: 1, status: '200 OK', method: 'POST', endpoint: '/v1/messages/send', traceId: 'req_9a8b7c6d5e4f', ip: '192.168.1.104', agent: 'Wavo-Node-SDK/2.1.0', auth: 'Bearer Token' },
    { id: 2, status: '200 OK', method: 'GET', endpoint: '/v1/contacts/status?id=1234', traceId: 'req_1a2b3c4d5e6f', ip: '192.168.1.105', agent: 'Mozilla/5.0', auth: 'Bearer Token' },
    { id: 3, status: '400 Bad Req', method: 'POST', endpoint: '/v1/templates/create', traceId: 'req_f5e4d3c2b1a0', ip: '192.168.1.106', agent: 'PostmanRuntime/7.29.2', auth: 'Bearer Token' },
    { id: 4, status: '200 OK', method: 'GET', endpoint: '/v1/webhooks/health', traceId: 'req_z9y8x7w6v5u4', ip: '192.168.1.107', agent: 'Wavo-Uptime/1.0', auth: 'Bearer Token' },
    { id: 5, status: '202 Accpt', method: 'POST', endpoint: '/v1/messages/bulk', traceId: 'req_a1b2c3d4e5f6', ip: '192.168.1.108', agent: 'Wavo-Node-SDK/2.1.0', auth: 'Bearer Token' },
  ];

  const mockRequest = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "1234567890",
    type: "text",
    text: {
      preview_url: false,
      body: "Hello from Wavo API Logs!"
    }
  };

  const mockResponse = {
    messaging_product: "whatsapp",
    contacts: [
      {
        input: "1234567890",
        wa_id: "1234567890"
      }
    ],
    messages: [
      {
        id: "wamid.HBgLMTIzNDU2Nzg5MAVAg..."
      }
    ]
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSelectedLog(logs[0]);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleExport = () => {
    toast.success("Export Started", "Your CSV export is being generated.");
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-10 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight text-white">API Traffic Logs</h1>
          <p className="text-[#8e8e93] text-[16px] font-medium mt-1">
            Real-time monitoring and deep inspection of all API traffic.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2.5 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-[14px] hover:bg-white/10 transition-all"
          >
            <Download size={18} />
            Export CSV
          </button>
          <button className="flex items-center gap-2.5 px-6 py-3 bg-[#cfbcff] text-[#381e72] rounded-2xl font-bold text-[14px] hover:opacity-90 transition-all shadow-[0_0_25px_rgba(207,188,255,0.2)]">
            <RefreshCw size={18} className="animate-spin-slow" />
            Live: Polling
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-4 bg-[#1c1c1e] border border-white/[0.05] rounded-2xl px-5 py-3.5 focus-within:border-[#cfbcff]/40 focus-within:bg-black/20 transition-all shadow-xl">
          <Search size={20} className="text-[#8e8e93]" />
          <input 
            type="text" 
            placeholder="Search trace ID, endpoint, or IP..." 
            className="bg-transparent border-none text-[15px] focus:outline-none w-full text-white placeholder:text-[#8e8e93]/40 font-medium"
          />
        </div>
        
        <FilterDropdown 
          label="Time" 
          icon={Clock} 
          selected={filters.time}
          options={['Last 15 Mins', 'Last 1 Hour', 'Last 24 Hours', 'Last 7 Days', 'All Time']}
          onSelect={(val: string) => setFilters({...filters, time: val})}
        />
        <FilterDropdown 
          label="Status" 
          icon={Filter} 
          selected={filters.status}
          options={['All Status', '200 OK', '202 Accepted', '400 Bad Request', '401 Unauthorized', '500 Internal Error']}
          onSelect={(val: string) => setFilters({...filters, status: val})}
        />
        <FilterDropdown 
          label="Methods" 
          icon={Terminal} 
          selected={filters.method}
          options={['All Methods', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH']}
          onSelect={(val: string) => setFilters({...filters, method: val})}
        />
      </div>

      {isLoading ? (
        <LogsSkeleton />
      ) : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden min-h-0">
          {/* Left Column: List */}
          <div className="bg-[#1c1c1e] border border-white/[0.05] rounded-[32px] flex flex-col overflow-hidden shadow-2xl h-full">
            <div className="hidden md:grid grid-cols-[110px_90px_1fr] px-8 py-5 border-b border-white/[0.05] text-[11px] font-bold text-[#8e8e93] uppercase tracking-[0.2em]">
              <div>Status</div>
              <div>Method</div>
              <div>Endpoint</div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  className={`
                    flex flex-col md:grid md:grid-cols-[110px_90px_1fr] items-start md:items-center 
                    px-6 py-5 md:px-8 md:py-5 border-b border-white/[0.03] cursor-pointer transition-all 
                    hover:bg-white/[0.02] group relative
                    ${selectedLog?.id === log.id ? 'bg-white/[0.04] md:border-l-4 md:border-l-[#cfbcff]' : 'md:border-l-4 md:border-l-transparent'}
                  `}
                >
                  {/* Mobile Layout: Status & Method Row */}
                  <div className="flex items-center justify-between w-full md:w-auto mb-3 md:mb-0">
                    <div className="md:w-[110px]"><StatusBadge status={log.status} /></div>
                    <div className="md:hidden"><MethodBadge method={log.method} /></div>
                  </div>
                  
                  {/* Desktop Method */}
                  <div className="hidden md:block md:w-[90px]"><MethodBadge method={log.method} /></div>
                  
                  {/* Endpoint & Trace ID (Mobile specific) */}
                  <div className="w-full">
                    <div className="text-[14px] md:text-[14px] font-mono text-white md:text-[#8e8e93] truncate group-hover:text-white transition-colors">
                      {log.endpoint}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 md:hidden">
                      <span className="text-[10px] font-bold text-[#8e8e93]/40 uppercase tracking-wider">Trace:</span>
                      <span className="text-[11px] font-mono text-[#8e8e93]">{log.traceId}</span>
                    </div>
                  </div>

                  {/* Active Indicator for Mobile */}
                  {selectedLog?.id === log.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cfbcff] md:hidden" />
                  )}
                </div>
              ))}
            </div>
            <div className="p-5 px-6 md:px-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between bg-black/10 gap-4">
              <span className="text-[12px] md:text-[13px] text-[#8e8e93] font-medium text-center md:text-left">
                Showing <span className="text-white font-bold">1 to 5</span> of 1,240 requests
              </span>
              <div className="flex items-center gap-4">
                <button className="p-2 text-[#8e8e93] hover:text-white transition-colors border border-white/10 rounded-xl bg-white/5"><ChevronLeft size={20} /></button>
                <span className="text-[13px] font-bold text-white tracking-wide">1 / 25</span>
                <button className="p-2 text-[#8e8e93] hover:text-white transition-colors border border-white/10 rounded-xl bg-white/5"><ChevronRight size={20} /></button>
              </div>
            </div>
          </div>

          {/* Right Column: Detail */}
          <div className={`
            bg-[#1c1c1e] border border-white/[0.05] rounded-[32px] flex flex-col overflow-hidden relative shadow-2xl
            fixed inset-0 z-[100] lg:relative lg:inset-auto lg:z-0
            transition-transform duration-300 ease-in-out
            ${selectedLog ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
            <AnimatePresence mode="wait">
              {selectedLog && (
                <motion.div 
                  key={selectedLog.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Detail Header */}
                  <div className="p-6 md:p-8 border-b border-white/[0.05] flex items-center justify-between bg-black/20">
                    <div className="flex items-center gap-4">
                      {/* Mobile Back Button */}
                      <button 
                        onClick={() => setSelectedLog(null)}
                        className="lg:hidden p-2 -ml-2 text-[#8e8e93] hover:text-white"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <div className="w-10 h-10 rounded-xl bg-white/5 items-center justify-center hidden md:flex">
                        <MethodBadge method={selectedLog.method} />
                      </div>
                      <h2 className="text-[15px] md:text-[16px] font-mono font-bold text-white truncate max-w-[200px] md:max-w-[320px]">{selectedLog.endpoint}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(selectedLog.traceId);
                          toast.info("Trace ID Copied", selectedLog.traceId);
                        }}
                        className="p-3 text-[#8e8e93] hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      >
                        <Copy size={20} />
                      </button>
                      <button 
                        onClick={() => setSelectedLog(null)}
                        className="p-3 text-[#8e8e93] hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 md:space-y-10 custom-scrollbar">
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 bg-black/30 rounded-[28px] border border-white/5 shadow-inner">
                      {[
                        { label: 'Trace ID', value: selectedLog.traceId },
                        { label: 'IP Address', value: selectedLog.ip },
                        { label: 'User Agent', value: selectedLog.agent },
                        { label: 'Auth Method', value: selectedLog.auth }
                      ].map((item, i) => (
                        <div key={i} className="space-y-1 md:space-y-2">
                          <p className="text-[10px] md:text-[11px] font-bold text-[#8e8e93] uppercase tracking-[0.2em]">{item.label}</p>
                          <p className="text-[13px] md:text-[14px] font-mono text-white truncate font-medium">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bodies */}
                    <CodeBlock label="Request Body" code={mockRequest} />
                    <CodeBlock label="Response Body" status={selectedLog.status} code={mockResponse} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
