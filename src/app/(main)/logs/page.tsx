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
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    '200 OK': 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20',
    '202 Accpt': 'bg-[#FFCC00]/10 text-[#FFCC00] border-[#FFCC00]/20',
    '400 Bad Req': 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider border ${colors[status] || 'bg-white/10 text-white border-white/20'}`}>
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
    <span className={`text-[11px] font-bold font-mono ${colors[method] || 'text-[#8e8e93]'}`}>
      {method}
    </span>
  );
};

const CodeBlock = ({ label, code, status }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <h4 className="text-[13px] font-bold text-white flex items-center gap-2">
        {label} {status && <span className="text-[#34C759]">({status})</span>}
      </h4>
      <div className="flex gap-4 text-[11px] font-bold text-[#8e8e93]">
        <button className="hover:text-white transition-colors">Copy</button>
        <button className="hover:text-white transition-colors">JSON</button>
      </div>
    </div>
    <div className="bg-[#0c0c0e] border border-white/[0.05] rounded-xl p-4 overflow-x-auto custom-scrollbar">
      <pre className="text-[12px] font-mono leading-relaxed text-[#8e8e93]">
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
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-bold text-[13px] border ${
          isOpen ? 'bg-white/10 text-white border-white/20' : 'bg-[#1c1c1e] border-white/[0.05] text-[#8e8e93] hover:text-white'
        }`}
      >
        <Icon size={16} />
        {selected || label}
        <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 mt-2 w-48 bg-[#1c1c1e] border border-white/10 rounded-xl shadow-2xl z-[100] py-1 overflow-hidden"
          >
            {options.map((option: string) => (
              <button 
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2.5 text-[13px] transition-colors text-left ${
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
  const [filters, setFilters] = React.useState({
    time: 'Last 1 Hour',
    status: 'All Status',
    method: 'All Methods'
  });

  const logs = [
    { id: 1, status: '200 OK', method: 'POST', endpoint: '/v1/messages/send', traceId: 'req_9a8b7c6d5e4f', ip: '192.168.1.104', agent: 'DeVOS-Node-SDK/2.1.0', auth: 'Bearer Token' },
    { id: 2, status: '200 OK', method: 'GET', endpoint: '/v1/contacts/status?id=1234', traceId: 'req_1a2b3c4d5e6f', ip: '192.168.1.105', agent: 'Mozilla/5.0', auth: 'Bearer Token' },
    { id: 3, status: '400 Bad Req', method: 'POST', endpoint: '/v1/templates/create', traceId: 'req_f5e4d3c2b1a0', ip: '192.168.1.106', agent: 'PostmanRuntime/7.29.2', auth: 'Bearer Token' },
    { id: 4, status: '200 OK', method: 'GET', endpoint: '/v1/webhooks/health', traceId: 'req_z9y8x7w6v5u4', ip: '192.168.1.107', agent: 'DeVOS-Uptime/1.0', auth: 'Bearer Token' },
    { id: 5, status: '202 Accpt', method: 'POST', endpoint: '/v1/messages/bulk', traceId: 'req_a1b2c3d4e5f6', ip: '192.168.1.108', agent: 'DeVOS-Node-SDK/2.1.0', auth: 'Bearer Token' },
  ];

  const mockRequest = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "1234567890",
    type: "text",
    text: {
      preview_url: false,
      body: "Hello from DeVOS API Logs!"
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
    if (!selectedLog) setSelectedLog(logs[0]);
  }, []);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight text-white">API Traffic Logs</h1>
          <p className="text-[#8e8e93] text-[15px] font-medium mt-1">
            Real-time monitoring and inspection of all API requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-[13px] hover:bg-white/10 transition-all">
            <Download size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#cfbcff] text-[#381e72] rounded-xl font-bold text-[13px] hover:opacity-90 transition-all">
            <RefreshCw size={16} className="animate-spin-slow" />
            Live: Polling
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-[#1c1c1e] border border-white/[0.05] rounded-xl px-4 py-2.5 focus-within:border-[#cfbcff]/50 transition-all">
          <Search size={18} className="text-[#8e8e93]" />
          <input 
            type="text" 
            placeholder="Search trace ID or endpoint..." 
            className="bg-transparent border-none text-[14px] focus:outline-none w-full text-white placeholder:text-[#8e8e93]/40 font-medium"
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

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden min-h-0">
        {/* Left Column: List */}
        <div className="bg-[#1c1c1e] border border-white/[0.05] rounded-[24px] flex flex-col overflow-hidden">
          <div className="grid grid-cols-[100px_80px_1fr] px-6 py-4 border-b border-white/[0.05] text-[11px] font-bold text-[#8e8e93] uppercase tracking-widest">
            <div>Status</div>
            <div>Method</div>
            <div>Endpoint</div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {logs.map((log) => (
              <div 
                key={log.id} 
                onClick={() => setSelectedLog(log)}
                className={`grid grid-cols-[100px_80px_1fr] items-center px-6 py-4 border-b border-white/[0.03] cursor-pointer transition-all hover:bg-white/[0.02] ${selectedLog?.id === log.id ? 'bg-white/[0.03] border-l-2 border-l-[#cfbcff]' : ''}`}
              >
                <div><StatusBadge status={log.status} /></div>
                <div><MethodBadge method={log.method} /></div>
                <div className="text-[13px] font-mono text-[#8e8e93] truncate group-hover:text-white transition-colors">{log.endpoint}</div>
              </div>
            ))}
          </div>
          <div className="p-4 px-6 border-t border-white/[0.05] flex items-center justify-between">
            <span className="text-[12px] text-[#8e8e93] font-medium">Showing 1 to 5 of 1,240 requests</span>
            <div className="flex items-center gap-4">
              <button className="p-1.5 text-[#8e8e93] hover:text-white transition-colors border border-white/5 rounded-lg"><ChevronLeft size={18} /></button>
              <span className="text-[12px] font-bold text-white">Page 1 / 25</span>
              <button className="p-1.5 text-[#8e8e93] hover:text-white transition-colors border border-white/5 rounded-lg"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>

        {/* Right Column: Detail */}
        <div className="bg-[#1c1c1e] border border-white/[0.05] rounded-[24px] flex flex-col overflow-hidden relative">
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
                <div className="p-6 border-b border-white/[0.05] flex items-center justify-between bg-black/10">
                  <div className="flex items-center gap-3">
                    <MethodBadge method={selectedLog.method} />
                    <h2 className="text-[15px] font-mono font-bold text-white truncate max-w-[300px]">{selectedLog.endpoint}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-[#8e8e93] hover:text-white transition-colors"><Copy size={18} /></button>
                    <button className="p-2 text-[#8e8e93] hover:text-white transition-colors"><X size={18} /></button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-6 p-5 bg-black/20 rounded-2xl border border-white/5">
                    {[
                      { label: 'Trace ID', value: selectedLog.traceId },
                      { label: 'IP Address', value: selectedLog.ip },
                      { label: 'User Agent', value: selectedLog.agent },
                      { label: 'Auth Method', value: selectedLog.auth }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-[11px] font-bold text-[#8e8e93] uppercase tracking-wider">{item.label}</p>
                        <p className="text-[13px] font-mono text-white truncate">{item.value}</p>
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
    </div>
  );
}
