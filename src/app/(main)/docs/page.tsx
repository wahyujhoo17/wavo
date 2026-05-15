"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Info, 
  Copy, 
  Check, 
  MessageSquare, 
  LifeBuoy, 
  ArrowLeft, 
  ArrowRight,
  BookOpen,
  Code2,
  Terminal
} from 'lucide-react';

const CodeBlock = ({ language, code }: { language: string, code: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.05] rounded-xl overflow-hidden my-6 group">
      <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#8e8e93]" />
          <span className="text-[11px] font-bold text-[#8e8e93] uppercase tracking-widest">{language}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-[#8e8e93] hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider"
        >
          {copied ? <Check size={14} className="text-[#34C759]" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-6 overflow-x-auto custom-scrollbar">
        <pre className="text-[13px] font-mono leading-relaxed text-[#8e8e93]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function DocumentationPage() {
  const webhookCode = `const crypto = require('crypto');
const express = require('express');
const app = express();

/* Use raw body parser to get the exact payload sent */
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-devos-signature'];
  const webhookSecret = process.env.WEBHOOK_SECRET;

  const hmac = crypto.createHmac('sha256', webhookSecret);
  const digest = hmac.update(req.body).digest('hex');

  if (signature === digest) {
    /* Signature is valid */
    const payload = JSON.parse(req.body);
    console.log('Valid event received:', payload.type);
    res.status(200).send('OK');
  } else {
    /* Invalid signature, possible tampering */
    res.status(401).send('Invalid Signature');
  }
});`;

  const payloadReceived = `{
  "id": "evt_2kxyz890",
  "type": "message.received",
  "created_at": 1678888400,
  "data": {
    "message_id": "msg_abc123",
    "from": "+1234567890",
    "body": "Hello, support!",
    "type": "text"
  }
}`;

  const payloadStatus = `{
  "id": "evt_3Pmnc123",
  "type": "message.status.delivered",
  "created_at": 1678888415,
  "data": {
    "message_id": "msg_def456",
    "to": "+1234567890",
    "status": "delivered",
    "timestamp": 1678888414
  }
}`;

  return (
    <div className="flex min-h-screen">
      {/* Main Doc Content */}
      <div className="flex-1 max-w-[1000px] p-6 md:p-12 mx-auto overflow-hidden">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-[12px] md:text-[13px] font-medium text-[#8e8e93] mb-8">
          <span>Documentation</span>
          <ChevronRight size={14} className="shrink-0" />
          <span>Core Concepts</span>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-white">Webhooks</span>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-10 md:mb-12">
          <h1 className="text-[32px] md:text-[48px] font-bold tracking-tight text-white leading-tight">Webhooks</h1>
          <p className="text-[16px] md:text-[18px] text-[#8e8e93] leading-relaxed max-w-[800px]">
            Webhooks allow you to build or set up integrations that subscribe to certain events on DeVOS WhatsApp. When one of those events is triggered, we'll send a HTTP POST payload to the webhook's configured URL.
          </p>
        </div>

        {/* Section: Introduction */}
        <section id="introduction" className="space-y-6 mb-10 md:mb-12">
          <h2 className="text-[24px] md:text-[28px] font-bold text-white border-b border-white/[0.05] pb-3 mb-6">Introduction</h2>
          <p className="text-[14px] md:text-[15px] text-[#8e8e93] leading-relaxed">
            Instead of requiring you to pull information via our API, webhooks push information to your endpoint as it happens. This is significantly more efficient for both your systems and ours, especially for high-volume message processing.
          </p>

          <div className="bg-[#cfbcff]/10 border border-[#cfbcff]/20 p-5 md:p-6 rounded-2xl flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[#cfbcff]/10 flex items-center justify-center text-[#cfbcff] shrink-0">
              <Info size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-[14px] md:text-[15px] font-bold text-white">Webhook Delivery Guarantees</h4>
              <p className="text-[13px] md:text-[14px] text-[#8e8e93] leading-relaxed">
                DeVOS employs an exponential backoff strategy for webhook delivery. If your server returns a non-2xx status code, we will retry delivering the payload up to 5 times over a 24-hour period.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Verifying Signatures */}
        <section id="verifying-signatures" className="space-y-6 mb-10 md:mb-12">
          <h2 className="text-[24px] md:text-[28px] font-bold text-white border-b border-white/[0.05] pb-3 mb-6">Verifying Signatures</h2>
          <p className="text-[14px] md:text-[15px] text-[#8e8e93] leading-relaxed">
            To ensure that a webhook payload was actually sent by DeVOS and wasn't tampered with during transit, we sign all webhook events. We include a <code className="bg-white/5 px-1.5 py-0.5 rounded text-[#cfbcff]">x-devos-signature</code> header with every request.
          </p>
          <CodeBlock language="NODE.JS (EXPRESS)" code={webhookCode} />
        </section>

        {/* Section: Event Payloads */}
        <section id="event-payloads" className="space-y-6 mb-10 md:mb-12">
          <h2 className="text-[24px] md:text-[28px] font-bold text-white border-b border-white/[0.05] pb-3 mb-6">Event Payloads</h2>
          <p className="text-[14px] md:text-[15px] text-[#8e8e93] leading-relaxed">
            Every webhook payload contains a standard envelope with a <code className="bg-white/5 px-1.5 py-0.5 rounded text-[#cfbcff]">type</code> field Identifying the event. Below are examples of common event types.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FFCC00]" />
                <span className="text-[12px] md:text-[13px] font-bold font-mono text-white">message.received</span>
              </div>
              <div className="bg-[#0c0c0e] border border-white/[0.05] rounded-xl p-4 overflow-x-auto custom-scrollbar">
                <pre className="text-[12px] font-mono leading-relaxed text-[#8e8e93]"><code>{payloadReceived}</code></pre>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#cfbcff]" />
                <span className="text-[12px] md:text-[13px] font-bold font-mono text-white">message.status.delivered</span>
              </div>
              <div className="bg-[#0c0c0e] border border-white/[0.05] rounded-xl p-4 overflow-x-auto custom-scrollbar">
                <pre className="text-[12px] font-mono leading-relaxed text-[#8e8e93]"><code>{payloadStatus}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Expected Responses */}
        <section id="expected-responses" className="space-y-6 mb-10 md:mb-12">
          <h2 className="text-[24px] md:text-[28px] font-bold text-white border-b border-white/[0.05] pb-3 mb-6">Expected Responses</h2>
          <p className="text-[14px] md:text-[15px] text-[#8e8e93] leading-relaxed mb-6">
            Your endpoint must respond with a standard HTTP status code to acknowledge receipt of the webhook.
          </p>
          <div className="bg-[#1c1c1e] border border-white/[0.05] rounded-xl overflow-hidden shadow-inner overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                  <th className="px-6 py-4 text-[11px] md:text-[12px] font-bold text-[#8e8e93] uppercase tracking-widest">Status Code</th>
                  <th className="px-6 py-4 text-[11px] md:text-[12px] font-bold text-[#8e8e93] uppercase tracking-widest">Meaning & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                <tr>
                  <td className="px-6 py-4">
                    <span className="text-[10px] md:text-[11px] font-bold px-2 py-1 bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20 rounded-lg uppercase tracking-wider">200 OK</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[13px] md:text-[14px] font-bold text-white mb-1">Successful Receipt</p>
                    <p className="text-[12px] md:text-[13px] text-[#8e8e93]">Acknowledges successful delivery. No further retries will be attempted.</p>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[10px] md:text-[11px] font-bold px-2 py-1 bg-[#FFCC00]/10 text-[#FFCC00] border border-[#FFCC00]/20 rounded-lg uppercase tracking-wider">400, 401, 404</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[13px] md:text-[14px] font-bold text-white mb-1">Client Errors</p>
                    <p className="text-[12px] md:text-[13px] text-[#8e8e93]">Indicates an issue with your endpoint. Retries will follow schedule.</p>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="text-[10px] md:text-[11px] font-bold px-2 py-1 bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20 rounded-lg uppercase tracking-wider">5xx Error</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[13px] md:text-[14px] font-bold text-white mb-1">Endpoint Failure</p>
                    <p className="text-[12px] md:text-[13px] text-[#8e8e93]">Your server failed. DeVOS will retry the delivery automatically.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Nav */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 md:pt-12 border-t border-white/[0.05] mt-12 mb-8">
          <button className="flex flex-col items-center sm:items-start gap-2 group w-full sm:w-auto">
            <span className="text-[11px] md:text-[12px] font-bold text-[#8e8e93] uppercase tracking-widest">Previous</span>
            <span className="flex items-center gap-2 text-white font-bold group-hover:text-[#cfbcff] transition-colors">
              <ArrowLeft size={16} />
              Authentication
            </span>
          </button>
          <button className="flex flex-col items-center sm:items-end gap-2 group text-right w-full sm:w-auto">
            <span className="text-[11px] md:text-[12px] font-bold text-[#8e8e93] uppercase tracking-widest">Next</span>
            <span className="flex items-center gap-2 text-white font-bold group-hover:text-[#cfbcff] transition-colors">
              Message Templates
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>

      {/* Right Table of Contents */}
      <div className="hidden xl:block w-[300px] border-l border-white/[0.05] p-12 shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="space-y-10">
          <div className="space-y-4">
            <h5 className="text-[11px] font-bold text-[#8e8e93] uppercase tracking-[0.2em]">On this page</h5>
            <nav className="flex flex-col gap-4">
              {['Introduction', 'Verifying Signatures', 'Event Payloads', 'Expected Responses'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-[13px] font-bold text-[#8e8e93] hover:text-white transition-colors border-l-2 border-transparent pl-4 hover:border-white/20"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-10 border-t border-white/[0.05]">
            <h5 className="text-[11px] font-bold text-[#8e8e93] uppercase tracking-[0.2em]">Need Help?</h5>
            <div className="space-y-4">
              <button className="flex items-center gap-3 text-[13px] font-bold text-[#8e8e93] hover:text-white transition-colors">
                <MessageSquare size={16} />
                Community Forums
              </button>
              <button className="flex items-center gap-3 text-[13px] font-bold text-[#8e8e93] hover:text-white transition-colors">
                <LifeBuoy size={16} />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
