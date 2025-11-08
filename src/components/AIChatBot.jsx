import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! I’m your Natural Immunotherapy assistant. Ask me anything about your body, immunity, or recovery." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef(null);
  const pendingRequestRef = useRef(null);
  const lastPayloadRef = useRef(null);

  // Scroll to latest message when chat opens or messages change
  useEffect(() => {
    if (!isOpen) return;
    const container = messagesRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => () => {
    if (pendingRequestRef.current) {
      pendingRequestRef.current.abort("Component unmounted.");
      pendingRequestRef.current = null;
    }
  }, []);

  const toggleChat = () => {
    if (isOpen && pendingRequestRef.current) {
      pendingRequestRef.current.abort("Chat closed by user.");
      pendingRequestRef.current = null;
    }
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || pendingRequestRef.current) {
      if (pendingRequestRef.current) {
        console.warn("Chat request already in flight; skipping new submission.");
      }
      return;
    }

    const userMessage = { role: "user", content: trimmed };
    const placeholderId = `assistant-${Date.now()}`;
    const conversation = [...messages, userMessage];
    const payload = { messages: conversation };

    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: "assistant", content: "Thinking…", id: placeholderId },
    ]);
    setInput("");
    setIsLoading(true);
    lastPayloadRef.current = payload;
    console.info("AIChatBot request pending", payload);

    const controller = new AbortController();
    pendingRequestRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = await res.json();

      // ✅ Always provide fallback reply
      const botReply =
        data.reply?.trim() ||
        "Your question seems health-related. Focus on detoxification, balanced vitamins, hydration, and proper cellular nutrition as part of Natural Immunotherapy.";

      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? { ...message, content: botReply }
            : message
        )
      );
      console.info("AIChatBot request resolved", { payload, reply: botReply });
    } catch (error) {
      const wasAborted = error.name === "AbortError";
      const fallbackContent = wasAborted
        ? "That request was cancelled. Ask again whenever you’re ready."
        : "It seems the server connection was interrupted. But here’s a Natural Immunotherapy tip: strengthen your immunity through detox, hydration, and balanced micronutrients.";

      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? {
                ...message,
                content: fallbackContent,
              }
            : message
        )
      );

      if (wasAborted) {
        console.warn("AIChatBot request was aborted intentionally.", {
          payload: lastPayloadRef.current,
        });
      } else {
        console.error("Chatbot fetch error:", error, {
          payload: lastPayloadRef.current,
        });
        console.info("Replaying failed payload for verification:", lastPayloadRef.current);
      }
    } finally {
      setIsLoading(false);
      if (pendingRequestRef.current === controller) {
        pendingRequestRef.current = null;
      }
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1F8720] to-[#165F14] text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7BFE7A]"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-40 flex h-[420px] w-80 flex-col overflow-hidden rounded-3xl border-2 border-[#186A17] bg-[#F2FFE2] shadow-[0_20px_45px_rgba(22,95,20,0.25)] md:h-[460px] md:w-96 lg:h-[500px] lg:w-[28rem]">
          <header className="flex items-center justify-between bg-gradient-to-r from-[#1F8720] to-[#165F14] px-4 py-3 text-white">
            <p className="text-sm font-semibold">NIT AI Chat</p>
            <button
              type="button"
              onClick={toggleChat}
              aria-label="Close chat"
              className="rounded-full p-1 transition hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {/* Messages Area */}
          <div
            ref={messagesRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[#F2FFE2] px-4 py-4 text-sm text-slate-800"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`max-w-[80%] rounded-3xl border px-3 py-2 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#1F8720] to-[#165F14] text-white border-[#186A17] shadow-lg"
                      : "bg-white text-slate-900 border-[#7BFE7A] shadow"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <form onSubmit={handleSubmit} className="border-t border-[#186A17]/40 bg-[#ECFF8F] px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask something..."
                className="flex-1 rounded-2xl border-2 border-[#7BFE7A] bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-[#186A17] focus:outline-none focus:ring-2 focus:ring-[#7BFE7A]/70 disabled:cursor-not-allowed disabled:bg-slate-100"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-br from-[#1F8720] to-[#165F14] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
