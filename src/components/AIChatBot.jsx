import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const N8N_WEBHOOK_URL = "https://kabir2512.app.n8n.cloud/webhook/8c602cb2-b41f-4b82-a94b-3b90998a6dbc/chat";

const escapeHtml = (text = "") =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatMessageContent = (text = "") => {
  const normalized = text.replace(/\\n/g, "\n").trim();
  return escapeHtml(normalized).replace(/(\r\n|\r|\n)/g, "<br/>");
};

const extractResponseText = (rawText = "") => {
  const trimmed = rawText.trim();
  if (!trimmed) return "";

  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === "string") {
      return parsed;
    }
    if (parsed && typeof parsed === "object") {
      if (typeof parsed.output === "string" && parsed.output.trim()) {
        return parsed.output;
      }
      const fallbackValue = Object.values(parsed).find(
        (value) => typeof value === "string" && value.trim()
      );
      if (fallbackValue) {
        return fallbackValue;
      }
    }
  } catch {
    // Not JSON; fall through to return raw trimmed text.
  }

  return trimmed;
};

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: formatMessageContent(
        "👋 Hi! I’m your Natural Immunotherapy assistant. Ask me anything about your body, immunity, or recovery."
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef(null);
  const pendingRequestRef = useRef(null);
  const lastPayloadRef = useRef(null);
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    if (!isOpen || !selectedFile) return;
    const container = messagesRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [selectedFile, isOpen]);

  const toggleChat = () => {
    if (isOpen && pendingRequestRef.current) {
      pendingRequestRef.current.abort("Chat closed by user.");
      pendingRequestRef.current = null;
    }
    setIsOpen((prev) => !prev);
  };

  const resetFileSelection = () => {
    setSelectedFile(null);
    setFilePreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      resetFileSelection();
      return;
    }

    const isAllowedType =
      file.type.startsWith("image/") || file.type === "application/pdf";
    if (!isAllowedType) {
      console.warn(
        "Unsupported file type selected. Only images or PDF files are allowed."
      );
      resetFileSelection();
      return;
    }

    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setFilePreviewUrl(previewUrl);
  };

  const handleRemoveFile = () => {
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    resetFileSelection();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    const fileToUpload = selectedFile;
    const hasAttachment = Boolean(fileToUpload);
    if ((!trimmed && !hasAttachment) || isLoading || pendingRequestRef.current) {
      if (pendingRequestRef.current) {
        console.warn("Chat request already in flight; skipping new submission.");
      }
      return;
    }

    const attachmentPreviewUrl = hasAttachment ? filePreviewUrl : "";
    const userMessage = {
      role: "user",
      content: trimmed ? formatMessageContent(trimmed) : "",
      attachments: hasAttachment
        ? [
            {
              type: fileToUpload.type === "application/pdf" ? "pdf" : "image",
              url: attachmentPreviewUrl,
              name: fileToUpload.name,
            },
          ]
        : undefined,
    };
    const placeholderId = `assistant-${Date.now()}`;
    const statusText = hasAttachment ? "Uploading…" : "Thinking…";
    const payloadSummary = {
      chatInput: trimmed,
      hasFile: hasAttachment,
      fileName: fileToUpload?.name,
    };

    const formData = new FormData();
    formData.append("chatInput", trimmed);
    if (hasAttachment) {
      formData.append("file", fileToUpload);
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: "assistant", content: formatMessageContent(statusText), id: placeholderId },
    ]);
    setInput("");
    if (hasAttachment) {
      resetFileSelection();
    }
    setIsLoading(true);
    lastPayloadRef.current = payloadSummary;
    console.info("AIChatBot request pending", payloadSummary);

    const controller = new AbortController();
    pendingRequestRef.current = controller;

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      const rawResponse = await res.text();

      if (!res.ok) {
        throw new Error(`Webhook responded with status ${res.status}`);
      }

      let botReply = extractResponseText(rawResponse);

      if (!botReply) {
        botReply = "The server sent an empty reply. Please try asking your question again.";
      }

      const formattedBotReply = formatMessageContent(botReply);

      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? { ...message, content: formattedBotReply }
            : message
        )
      );
      console.info("AIChatBot request resolved", { payload: payloadSummary, reply: botReply });
    } catch (error) {
      const wasAborted = error.name === "AbortError";
      const isNetworkError = error instanceof TypeError;
      const fallbackContent = wasAborted
        ? "That request was cancelled. Ask again whenever you’re ready."
        : isNetworkError
        ? "I couldn’t reach the chat server. Please check your internet connection or allow access to the Natural Immunotherapy webhook, then ask again."
        : "It seems the server connection was interrupted. But here’s a Natural Immunotherapy tip: strengthen your immunity through detox, hydration, and balanced micronutrients.";

      const fallbackHtml = formatMessageContent(fallbackContent);

      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? {
                ...message,
                content: fallbackHtml,
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
                <div
                  className={`max-w-[80%] rounded-3xl border px-3 py-2 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#1F8720] to-[#165F14] text-white border-[#186A17] shadow-lg"
                      : "bg-white text-slate-900 border-[#7BFE7A] shadow"
                  }`}
                >
                  {message.content ? (
                    <div dangerouslySetInnerHTML={{ __html: message.content }} />
                  ) : null}
                  {message.attachments?.length ? (
                    <div className={`${message.content ? "mt-2" : ""} space-y-2`}>
                      {message.attachments.map((attachment, attachmentIndex) =>
                        attachment.type === "image" && attachment.url ? (
                          <img
                            key={`${attachment.name}-${attachmentIndex}`}
                            src={attachment.url}
                            alt={attachment.name || "Uploaded file"}
                            className="max-h-48 w-full rounded-2xl border border-white/20 object-cover"
                          />
                        ) : (
                          <a
                            key={`${attachment.name || "document"}-${attachmentIndex}`}
                            href={attachment.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm ${
                              message.role === "user"
                                ? "border-white/40 bg-white/10 text-white"
                                : "border-[#186A17]/30 bg-[#f7ffe7] text-slate-900"
                            }`}
                          >
                            <span aria-hidden="true">📄</span>
                            <span className="truncate">
                              {attachment.name || "View document"}
                            </span>
                          </a>
                        )
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {selectedFile && !isLoading && (
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-3xl border border-[#186A17] bg-gradient-to-br from-[#1F8720] to-[#165F14] px-3 py-2 text-white shadow-lg">
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-wide">
                    <span>Attachment ready</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="rounded-full border border-white/30 px-2 py-0.5 text-[0.65rem] font-semibold transition hover:bg-white/15"
                      aria-label="Remove selected attachment"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-semibold">{selectedFile.name}</p>
                  {selectedFile.type.startsWith("image/") && filePreviewUrl ? (
                    <img
                      src={filePreviewUrl}
                      alt={selectedFile.name}
                      className="mt-3 max-h-48 w-full rounded-2xl border border-white/40 object-cover"
                    />
                  ) : (
                    <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-3 py-2 text-sm">
                      <span aria-hidden="true">📄</span>
                      <div className="text-left">
                        <p>PDF ready to send</p>
                        {filePreviewUrl ? (
                          <a
                            href={filePreviewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs underline underline-offset-2"
                          >
                            Preview
                          </a>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Input Field */}
          <form onSubmit={handleSubmit} className="border-t border-[#186A17]/40 bg-[#ECFF8F] px-4 py-3">
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              className="sr-only"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-[#7BFE7A] bg-white text-lg transition hover:border-[#186A17] hover:text-[#186A17] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Attach an image or PDF"
                disabled={isLoading}
              >
                🖼️
              </button>
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
                disabled={isLoading || (!input.trim() && !selectedFile)}
              >
                {isLoading
                  ? lastPayloadRef.current?.hasFile
                    ? "Uploading…"
                    : "Sending…"
                  : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
