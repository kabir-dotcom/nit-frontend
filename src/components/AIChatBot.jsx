import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Loader2, Upload } from "lucide-react";

const resolveWebhookUrl = () => {
  const raw = (import.meta.env.VITE_N8N_WEBHOOK_URL || "").trim();
  if (!raw) {
    // Use proxy in dev, fall back to direct cloud URL in prod to avoid 404s.
    return import.meta.env.DEV
      ? "https://kabir2512.app.n8n.cloud/webhook-test/nit-multi-analyzer"
      : "https://kabir2512.app.n8n.cloud/webhook/nit-multi-analyzer";
  }
  const base = raw.replace(/\/$/, "");
  return base.includes("/webhook/") ? base : `${base}/webhook/nit-multi-analyzer`;
};

const N8N_WEBHOOK_URL = resolveWebhookUrl();


// Clean HTML escape
const escapeHtml = (text = "") =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Format messages with <br/>
const formatMessageContent = (text = "") =>
  escapeHtml(text.trim()).replace(/\n/g, "<br/>");

// Extract JSON or plain text from server
const extractResponseText = (raw = "") => {
  const trimmed = raw.trim();
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === "string") return parsed;
    if (parsed?.message?.content) return parsed.message.content;
    if (parsed?.output) return parsed.output;
    return trimmed;
  } catch (_) {
    return trimmed;
  }
};

const AIChatBot = () => {
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 <b>Welcome!</b> I’m your <span style='color:#1F8720;font-weight:600'>Natural Immunotherapy (NIT)</span> assistant.<br/>Ask me anything or upload your PDF/Image report.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  // Refs
  const fileInputRef = useRef();
  const chatWindowRef = useRef();

  // Auto-scroll
  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

  // File selection
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      !file.type.startsWith("image/") &&
      file.type !== "application/pdf"
    ) {
      alert("Only PDF or images allowed.");
      return;
    }

    setPreviewFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const clearFile = () => {
    setPreviewFile(null);
    setPreviewURL("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (sending) return;

    const userText = input.trim();
    const hasFile = previewFile !== null;

    if (!userText && !hasFile) return;

    // Push user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userText ? formatMessageContent(userText) : "",
        attachment:
          hasFile && previewURL
            ? { url: previewURL, name: previewFile.name, type: previewFile.type }
            : null,
      },
      {
        role: "assistant",
        content:
          "<span style='color:#3A3A3A'><i>⏳ Medha AI is thinking...</i></span>",
        loading: true,
      },
    ]);

    setSending(true);

    const form = new FormData();
    form.append("text", userText);
    if (hasFile) form.append("file", previewFile);

    setInput("");
    clearFile();

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        body: form,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Request failed with ${res.status}${
            errorText ? `: ${errorText}` : ""
          }`
        );
      }

      const contentType = res.headers.get("content-type") || "";
      const raw =
        contentType.includes("application/json") && typeof res.json === "function"
          ? JSON.stringify(await res.json())
          : await res.text();

      const parsed = extractResponseText(raw);
      const safeContent =
        typeof parsed === "string" && parsed.trim()
          ? parsed
          : "⚠️ No response received from assistant. Please try again.";

      setMessages((prev) =>
        prev.map((m, i) =>
          m.loading
            ? {
                ...m,
                loading: false,
                content: formatMessageContent(safeContent),
              }
            : m
        )
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.loading
            ? {
                ...m,
                loading: false,
                content:
                  "⚠️ <b>Could not reach the assistant.</b><br/>" +
                  (err instanceof Error ? escapeHtml(err.message) : "Network issue or CORS blocked."),
              }
            : m
        )
      );
    }

    setSending(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-700 to-green-900 text-white shadow-lg hover:scale-110 transition"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-96 h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col border border-green-200 animate-fadeIn">
          {/* Header */}
          <div className="bg-green-700 text-white p-4 rounded-t-3xl flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              💬 NIT Assistant
            </h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatWindowRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-50 to-white"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 max-w-[75%] rounded-2xl text-sm shadow-md ${
                    msg.role === "user"
                      ? "bg-green-700 text-white"
                      : "bg-white border border-green-200 text-black"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: msg.content }} />

                  {msg.attachment && msg.attachment.type.startsWith("image/") && (
                    <img
                      src={msg.attachment.url}
                      className="mt-2 rounded-xl max-h-40 border"
                    />
                  )}

                  {msg.attachment && msg.attachment.type === "application/pdf" && (
                    <a
                      href={msg.attachment.url}
                      target="_blank"
                      className="mt-2 block underline text-blue-600"
                    >
                      📄 {msg.attachment.name}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* File Preview */}
          {previewFile && (
            <div className="p-3 border-t bg-gray-50 flex items-center justify-between">
              <span className="text-sm font-semibold">
                📎 {previewFile.name}
              </span>
              <button
                onClick={clearFile}
                className="text-red-600 text-xs font-bold"
              >
                Remove
              </button>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="p-2 bg-green-600 text-white rounded-full"
            >
              <Upload />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleFileSelect}
            />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-xl bg-white"
              placeholder="Type your message..."
            />

            <button
              type="submit"
              disabled={sending}
              className="p-2 bg-green-700 text-white rounded-full hover:bg-green-800"
            >
              {sending ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
