import { Sun, Moon, Menu, MessageSquare, Image, Calculator, Code2 } from "lucide-react";
import type { Mode } from "@/pages/Index";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  isDark: boolean;
  onToggleDark: () => void;
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const modes: { id: Mode; label: string; icon: typeof MessageSquare; color: string; bg: string }[] = [
  { id: "chat", label: "Chat", icon: MessageSquare, color: "text-mode-chat", bg: "bg-mode-chat/10 border-mode-chat/30" },
  { id: "image", label: "Image Gen", icon: Image, color: "text-mode-image", bg: "bg-mode-image/10 border-mode-image/30" },
  { id: "math", label: "Math", icon: Calculator, color: "text-mode-math", bg: "bg-mode-math/10 border-mode-math/30" },
  { id: "code", label: "Code", icon: Code2, color: "text-mode-code", bg: "bg-mode-code/10 border-mode-code/30" },
];

export default function ChatHeader({
  isDark,
  onToggleDark,
  currentMode,
  onModeChange,
  onToggleSidebar,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mode Tabs */}
      <div className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-thin">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 whitespace-nowrap",
                isActive
                  ? cn(mode.bg, mode.color, "shadow-sm")
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? mode.color : "")} />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={onToggleDark}
        className={cn(
          "relative p-2 rounded-xl border transition-all duration-300",
        isDark
            ? "bg-secondary border-border text-primary hover:bg-muted"
            : "bg-secondary border-border text-mode-math hover:bg-muted"
        )}
      >
        <div className="relative w-5 h-5">
          <Sun
            className={cn(
              "absolute inset-0 w-5 h-5 transition-all duration-300",
              isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            )}
          />
          <Moon
            className={cn(
              "absolute inset-0 w-5 h-5 transition-all duration-300",
              isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
            )}
          />
        </div>
      </button>
    </header>
  );
}
