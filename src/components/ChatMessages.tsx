import { useRef, RefObject } from "react";
import type { Message } from "@/pages/Index";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
  messagesEndRef: RefObject<HTMLDivElement>;
}

const modeLabel: Record<string, string> = {
  chat: "AI Chat",
  image: "Image Gen",
  math: "Math Solver",
  code: "Code AI",
};

const modeBadgeStyle: Record<string, string> = {
  chat: "bg-mode-chat/10 text-mode-chat",
  image: "bg-mode-image/10 text-mode-image",
  math: "bg-mode-math/10 text-mode-math",
  code: "bg-mode-code/10 text-mode-code",
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span className="typing-dot w-2 h-2 rounded-full bg-primary inline-block" />
      <span className="typing-dot w-2 h-2 rounded-full bg-primary inline-block" />
      <span className="typing-dot w-2 h-2 rounded-full bg-primary inline-block" />
    </div>
  );
}

function CodeBlock({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const lines = part.split("\n");
          const lang = lines[0].replace("```", "").trim();
          const code = lines.slice(1, -1).join("\n");
          return (
            <div key={i} className="my-3 rounded-xl overflow-hidden border border-border">
              <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                <span className="text-xs font-mono text-muted-foreground">{lang || "code"}</span>
                <span className="text-xs text-muted-foreground">NexusAI</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground bg-card">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
        return (
          <span key={i} className="whitespace-pre-wrap">
            {part.replace(/\*\*(.*?)\*\*/g, "$1")}
          </span>
        );
      })}
    </>
  );
}

export default function ChatMessages({ messages, messagesEndRef }: ChatMessagesProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4 animate-fade-up",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1",
                message.role === "user"
                  ? "gradient-primary"
                  : "bg-muted border border-border"
              )}
            >
              {message.role === "user" ? (
                <User className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Bot className="w-4 h-4 text-muted-foreground" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={cn("flex flex-col gap-1 max-w-[75%]", message.role === "user" ? "items-end" : "items-start")}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-muted-foreground font-medium">
                  {message.role === "user" ? "You" : "NexusAI"}
                </span>
                {message.role === "assistant" && !message.isTyping && (
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", modeBadgeStyle[message.mode])}>
                    {modeLabel[message.mode]}
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card border border-border text-card-foreground rounded-tl-sm"
                )}
              >
                {message.isTyping ? (
                  <TypingIndicator />
                ) : (
                  <CodeBlock content={message.content} />
                )}
              </div>

              <span className="text-xs text-muted-foreground/60">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
