import { useState, useRef, KeyboardEvent } from "react";
import { SendHorizontal, Paperclip, Mic, Sparkles } from "lucide-react";
import type { Mode } from "@/pages/Index";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  currentMode: Mode;
  disabled: boolean;
}

const modePlaceholders: Record<Mode, string> = {
  chat: "Ask NexusAI anything...",
  image: "Describe the image you want to generate...",
  math: "Enter a math problem or equation to solve...",
  code: "Describe the code you need or paste a snippet to analyze...",
};

const modeGradients: Record<Mode, string> = {
  chat: "from-mode-chat to-primary",
  image: "from-mode-image to-primary",
  math: "from-mode-math to-mode-code",
  code: "from-mode-code to-primary",
};

export default function ChatInput({ onSend, currentMode, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
    }
  };

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="relative glass-strong rounded-2xl shadow-lg transition-all duration-200 focus-within:shadow-xl focus-within:border-primary/40">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={modePlaceholders[currentMode]}
            rows={1}
            className="w-full resize-none bg-transparent px-5 py-4 pr-32 text-sm text-foreground placeholder:text-muted-foreground outline-none leading-relaxed min-h-[56px] max-h-[160px] scrollbar-thin"
          />

          {/* Actions */}
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={handleSend}
              disabled={!value.trim() || disabled}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200",
                value.trim()
                  ? `bg-gradient-to-br ${modeGradients[currentMode]} text-primary-foreground hover:opacity-90 glow-primary shadow-md`
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 px-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-muted-foreground/60" />
            <span className="text-xs text-muted-foreground/60">Press Enter to send, Shift+Enter for newline</span>
          </div>
          <span className="text-xs text-muted-foreground/40">{value.length}/4000</span>
        </div>
      </div>
    </div>
  );
}
