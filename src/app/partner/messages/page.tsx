"use client";

import { useState } from "react";
import { Send, Search, ArrowLeft } from "lucide-react";

const CONVERSATIONS = [
  { id: "c1", customer: "TechFlow GmbH", lastMessage: "When will the X2 Ultra be delivered?", time: "2h ago", unread: 2, robot: "X2 Ultra", online: true },
  { id: "c2", customer: "AutoLine AG", lastMessage: "We'd like to extend the rental by 7 days", time: "5h ago", unread: 1, robot: "H1 Pro", online: false },
  { id: "c3", customer: "MediBot Inc.", lastMessage: "Thank you, the robot is performing great!", time: "1d ago", unread: 0, robot: "X2 Ultra #2", online: true },
  { id: "c4", customer: "LogiCorp", lastMessage: "Can we upgrade to the annual plan?", time: "2d ago", unread: 0, robot: "RX-500", online: false },
  { id: "c5", customer: "EventPro", lastMessage: "Invoice received, thanks.", time: "5d ago", unread: 0, robot: "T3 Companion", online: false },
];

const MOCK_MESSAGES: Record<string, { id: string; sender: string; text: string; time: string }[]> = {
  c1: [
    { id: "m1", sender: "customer", text: "Hi, we placed an order for the X2 Ultra last week. Can you give us an update on delivery?", time: "Yesterday, 4:15 PM" },
    { id: "m2", sender: "partner", text: "Hello! Your X2 Ultra is currently being configured with the requested skills. It will ship tomorrow from our Berlin facility.", time: "Yesterday, 4:30 PM" },
    { id: "m3", sender: "customer", text: "Great, what's the estimated delivery time to Munich?", time: "Today, 9:10 AM" },
    { id: "m4", sender: "partner", text: "Standard delivery to Munich is 1-2 business days. You should receive it by Thursday at the latest.", time: "Today, 9:25 AM" },
    { id: "m5", sender: "customer", text: "When will the X2 Ultra be delivered?", time: "Today, 2:30 PM" },
  ],
  c2: [
    { id: "m1", sender: "customer", text: "The H1 Pro has been excellent for our assembly line. We'd like to extend the rental by 7 days.", time: "Today, 8:00 AM" },
    { id: "m2", sender: "partner", text: "Glad to hear it's working well! I can extend your rental right away. The additional 7 days will be at your current daily rate of €749/day.", time: "Today, 8:15 AM" },
    { id: "m3", sender: "customer", text: "We'd like to extend the rental by 7 days", time: "Today, 10:30 AM" },
  ],
  c3: [
    { id: "m1", sender: "customer", text: "Hi, we received the X2 Ultra #2 yesterday. Quick question — when will the SLAM Navigation skill be activated?", time: "Mar 24, 10:30 AM" },
    { id: "m2", sender: "partner", text: "Hello! The SLAM Navigation skill will be activated within 2 hours — our team is configuring it remotely right now.", time: "Mar 24, 10:45 AM" },
    { id: "m3", sender: "customer", text: "Perfect. Also, we noticed the battery indicator shows 92% — is that normal for a new unit?", time: "Mar 24, 11:02 AM" },
    { id: "m4", sender: "partner", text: "Yes, completely normal. We ship at 90-95% charge for safety. It will reach 100% after the first full charge cycle.", time: "Mar 24, 11:15 AM" },
    { id: "m5", sender: "customer", text: "Thank you, the robot is performing great!", time: "Mar 25, 9:00 AM" },
  ],
};

export default function PartnerMessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeConversation = CONVERSATIONS.find((c) => c.id === selectedChat);
  const messages = selectedChat ? MOCK_MESSAGES[selectedChat] ?? [] : [];
  const totalUnread = CONVERSATIONS.reduce((s, c) => s + c.unread, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {selectedChat && (
            <button
              onClick={() => setSelectedChat(null)}
              className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-[#111] transition-all"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <h1 className="text-[28px] font-bold tracking-[-0.03em]">Messages</h1>
            <p className="text-[14px] text-[#888] mt-1">
              {selectedChat
                ? `${activeConversation?.customer} · ${activeConversation?.robot}`
                : `${CONVERSATIONS.length} conversations${totalUnread > 0 ? ` · ${totalUnread} unread` : ""}`
              }
            </p>
          </div>
        </div>
        {activeConversation && (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${activeConversation.online ? "bg-[#22c55e]" : "bg-[#444]"}`} />
            <span className="font-mono text-[11px] text-[#888]">{activeConversation.online ? "Online" : "Offline"}</span>
          </div>
        )}
      </div>

      {/* Conversation list view */}
      {!selectedChat && (
        <div className="space-y-3">
          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] rounded-xl text-[14px] text-[#f0f0f8] placeholder:text-[#444] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
            />
          </div>

          {CONVERSATIONS.filter((c) =>
            !searchQuery || c.customer.toLowerCase().includes(searchQuery.toLowerCase()) || c.robot.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedChat(conv.id)}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] transition-all text-left"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#151515] border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-[13px] font-bold text-[#888]">
                  {conv.customer.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                {conv.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#22c55e] border-2 border-[#0a0a0a]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-[15px] font-medium text-[#f0f0f8]">{conv.customer}</span>
                  <span className="font-mono text-[11px] text-[#444] shrink-0">{conv.time}</span>
                </div>
                <span className="font-mono text-[11px] text-[#555] block mb-1">{conv.robot}</span>
                <p className="text-[13px] text-[#888] truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-6 h-6 rounded-full bg-[#7e1c26] flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Chat view */}
      {selectedChat && (
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] overflow-hidden flex flex-col" style={{ height: "calc(100vh - 240px)", minHeight: "400px" }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "partner" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[65%] px-4 py-3 rounded-2xl ${
                  msg.sender === "partner"
                    ? "bg-[#7e1c26] text-white rounded-br-md"
                    : "bg-[#151515] text-[#f0f0f8] border border-[rgba(255,255,255,0.07)] rounded-bl-md"
                }`}>
                  <p className="text-[13px] leading-relaxed">{msg.text}</p>
                  <span className={`font-mono text-[10px] block mt-1.5 ${
                    msg.sender === "partner" ? "text-white/50" : "text-[#444]"
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.07)]">
            <div className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] placeholder:text-[#333] outline-none focus:border-[#7e1c26] transition-colors"
                onKeyDown={(e) => { if (e.key === "Enter" && newMessage.trim()) setNewMessage(""); }}
              />
              <button className="px-5 py-3 rounded-xl bg-[#7e1c26] hover:bg-[#962330] text-white transition-all">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
