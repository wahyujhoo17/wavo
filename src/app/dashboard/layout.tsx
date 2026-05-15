"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Smartphone, 
  Key, 
  Webhook, 
  ClipboardList, 
  FileText, 
  Settings, 
  HelpCircle,
  LogOut,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';

const SidebarLink = ({ href, icon: Icon, label, active = false, minimized = false }: { href: string; icon: any; label: string; active?: boolean; minimized?: boolean }) => (
  <Link href={href}>
    <div className={`flex items-center gap-3.5 transition-all duration-200 group relative h-12 ${active ? 'text-white' : 'text-[#8e8e93] hover:text-white'} ${minimized ? 'justify-center px-0' : 'px-6'}`}>
      {active && (
        <motion.div 
          layoutId="sidebar-active-indicator"
          className="absolute left-0 w-[3px] h-6 bg-primary rounded-r-full"
        />
      )}
      <Icon size={20} className={active ? 'text-primary' : 'text-[#8e8e93] group-hover:text-white transition-colors'} />
      {!minimized && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[15px] font-medium tracking-tight whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
      {minimized && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-[#1c1c1e] text-white text-[12px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/5">
          {label}
        </div>
      )}
    </div>
  </Link>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isMinimized ? 80 : 280 }}
        className={`
          fixed inset-y-0 left-0 z-50 bg-[#0c0c0e] border-r border-white/[0.05] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className={`px-6 pt-6 pb-12 flex items-center ${isMinimized ? 'justify-center px-0' : 'justify-between'}`}>
          <Link href="/dashboard" className={`relative block transition-all duration-300 ${isMinimized ? 'w-10 h-10' : 'w-[140px] h-[40px]'}`}>
            <Image 
              src={isMinimized ? "/img/logo/logo.png" : "/img/logo/fulllogo.png"}
              alt="Wavo Logo" 
              fill
              sizes={isMinimized ? "40px" : "140px"}
              className="object-contain"
              priority
            />
          </Link>
          
          {/* Toggle Button - Now positioned on the border */}
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className={`
              absolute -right-3 top-12 w-6 h-6 rounded-full bg-[#1c1c1e] border border-white/10 text-[#8e8e93] hover:text-white flex items-center justify-center transition-all z-[60] shadow-xl
              lg:flex hidden
            `}
          >
            {isMinimized ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" active={pathname === '/dashboard'} minimized={isMinimized} />
          <SidebarLink href="/dashboard/services" icon={Smartphone} label="WhatsApp Services" active={pathname === '/dashboard/services'} minimized={isMinimized} />
          <SidebarLink href="/dashboard/api-keys" icon={Key} label="API Keys" active={pathname === '/dashboard/api-keys'} minimized={isMinimized} />
          <SidebarLink href="/dashboard/webhooks" icon={Webhook} label="Webhooks" active={pathname === '/dashboard/webhooks'} minimized={isMinimized} />
          <SidebarLink href="/dashboard/logs" icon={ClipboardList} label="Logs" active={pathname === '/dashboard/logs'} minimized={isMinimized} />
          <SidebarLink href="/dashboard/docs" icon={FileText} label="Documentation" active={pathname === '/dashboard/docs'} minimized={isMinimized} />
          <SidebarLink href="/dashboard/settings" icon={Settings} label="Settings" active={pathname === '/dashboard/settings'} minimized={isMinimized} />
        </nav>

        <div className={`p-6 space-y-6 ${isMinimized ? 'px-4' : ''}`}>
          {!isMinimized ? (
            <button className="w-full bg-[#cfbcff] text-[#381e72] py-3.5 rounded-xl font-bold text-[15px] shadow-[0_0_20px_rgba(207,188,255,0.2)] hover:opacity-90 transition-all">
              Upgrade Plan
            </button>
          ) : (
            <button className="w-full h-12 bg-[#cfbcff] text-[#381e72] flex items-center justify-center rounded-xl font-bold hover:opacity-90 transition-all group relative">
              <Plus size={20} />
              <div className="absolute left-full ml-4 px-2 py-1 bg-[#cfbcff] text-[#381e72] text-[12px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Upgrade
              </div>
            </button>
          )}
          
          <div className="pt-6 border-t border-white/[0.05] space-y-1">
            <Link href="/dashboard/help" className={`flex items-center gap-3.5 py-3 text-[#8e8e93] hover:text-white transition-all group relative ${isMinimized ? 'justify-center px-0' : 'px-2'}`}>
              <HelpCircle size={20} className="group-hover:text-white transition-colors" />
              {!isMinimized && <span className="text-[15px] font-medium">Help</span>}
              {isMinimized && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-[#1c1c1e] text-white text-[12px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/5">
                  Help
                </div>
              )}
            </Link>
            <button 
              onClick={() => router.push('/login')}
              className={`w-full flex items-center gap-3.5 py-3 text-[#8e8e93] hover:text-white transition-all group relative ${isMinimized ? 'justify-center px-0' : 'px-2'}`}
            >
              <LogOut size={20} className="group-hover:text-white transition-colors" />
              {!isMinimized && <span className="text-[15px] font-medium">Sign Out</span>}
              {isMinimized && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-[#1c1c1e] text-white text-[12px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/5">
                  Sign Out
                </div>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Top Header */}
        <header className="h-[72px] border-b border-white/[0.05] flex items-center justify-between px-8 shrink-0 bg-[#0a0a0c]/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#8e8e93] hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-3 bg-[#1c1c1e] border border-white/[0.05] rounded-xl px-4 py-2 w-[400px] group focus-within:border-primary/50 transition-all">
              <Search size={18} className="text-[#8e8e93] group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none text-[14px] focus:outline-none w-full text-white placeholder:text-[#8e8e93]/40 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-[14px] font-bold text-white relative after:absolute after:bottom-[-26px] after:left-0 after:w-full after:h-[2px] after:bg-primary">
              Dashboard
            </Link>
            <Link href="/docs" className="text-[14px] font-bold text-[#8e8e93] hover:text-white transition-colors">
              Docs
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0c]">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
