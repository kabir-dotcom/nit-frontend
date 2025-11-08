import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! I’m your Natural Immunotherapy assistant. Ask me anything about your body, immunity, or recovery." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState({
    phase: "idle",
    detail: "Ask something to begin.",
    payload: null,
  });
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
      setRequestStatus({
        phase: "cancelled",
        detail: "Last request was cancelled when the chat closed.",
        payload: lastPayloadRef.current ? JSON.stringify(lastPayloadRef.current, null, 2) : null,
      });
    }
    setIsOpen((prev) => !prev);
  };

  const stringifyPayload = (payload) => {
    try {
      return JSON.stringify(payload, null, 2);
    } catch {
      return "Payload could not be serialized.";
    }
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
    setRequestStatus({
      phase: "pending",
      detail: "Sending your request…",
      payload: stringifyPayload(payload),
    });
    console.info("AIChatBot request pending", payload);

    const controller = new AbortController();
    pendingRequestRef.current = controller;

    try {
      // ✅ Fetch from backend directly
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
      setRequestStatus({
        phase: "success",
        detail: "Response received.",
        payload: null,
      });
      console.info("AIChatBot request resolved", { payload, reply: botReply });
    } catch (error) {
      const payloadSnapshot = stringifyPayload(lastPayloadRef.current);
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

      setRequestStatus({
        phase: wasAborted ? "cancelled" : "error",
        detail: wasAborted
          ? "Request cancelled."
          : "Request failed. Payload snapshot is shown below.",
        payload: wasAborted ? payloadSnapshot : payloadSnapshot,
      });
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
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-40 flex h-[400px] w-80 flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl">
          <header className="flex items-center justify-between bg-emerald-600 px-4 py-3 text-white">
            <p className="text-sm font-semibold">NIT AI Chat</p>
            <button
              type="button"
              onClick={toggleChat}
              aria-label="Close chat"
              className="rounded-full p-1 transition hover:bg-emerald-500/30"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {/* Request State */}
          <div className="border-b border-emerald-100 bg-emerald-50/70 px-4 py-2 text-xs">
            <p
              className={`font-medium ${
                requestStatus.phase === "pending"
                  ? "text-amber-600"
                  : requestStatus.phase === "success"
                  ? "text-emerald-700"
                  : requestStatus.phase === "error"
                  ? "text-red-600"
                  : requestStatus.phase === "cancelled"
                  ? "text-slate-500"
                  : "text-slate-600"
              }`}
            >
              {requestStatus.detail}
            </p>
            {requestStatus.phase === "error" && requestStatus.payload && (
              <pre className="mt-1 max-h-24 overflow-auto rounded bg-white/80 p-2 text-[10px] text-slate-700">
                {requestStatus.payload}
              </pre>
            )}
          </div>

          {/* Messages Area */}
          <div
            ref={messagesRef}
            className="flex-1 space-y-3 overflow-y-auto bg-emerald-50 px-4 py-4 text-sm text-slate-800"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    message.role === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-slate-800 shadow ring-1 ring-emerald-100"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <form onSubmit={handleSubmit} className="border-t border-emerald-100 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask something..."
                className="flex-1 rounded-xl border border-emerald-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
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
