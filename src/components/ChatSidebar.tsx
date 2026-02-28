import { MessageSquare, Image, Calculator, Code2, Plus, ChevronLeft, Sparkles, Trash2 } from "lucide-react";
import type { ChatSession } from "@/pages/Index";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const modeIcons = {
  chat: MessageSquare,
  image: Image,
  math: Calculator,
  code: Code2,
};

const modeColors = {
  chat: "text-mode-chat",
  image: "text-mode-image",
  math: "text-mode-math",
  code: "text-mode-code",
};

export default function ChatSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  isOpen,
}: ChatSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-72" : "w-0"
      )}
    >
      <div className="flex flex-col h-full min-w-72">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center glow-primary">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-sidebar-foreground tracking-tight">NexusAI</h1>
            <p className="text-xs text-muted-foreground">Intelligent Assistant</p>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="px-3 py-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all duration-200 glow-primary group"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-1">
          {sessions.length === 0 ? (
            <div className="text-center py-10 px-4">
              <MessageSquare className="w-8 h-8 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">No chats yet. Start a new conversation!</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">Recent</p>
              {sessions.map((session) => {
                const Icon = modeIcons[session.mode];
                const colorClass = modeColors[session.mode];
                return (
                  <button
                    key={session.id}
                    onClick={() => onSelectSession(session.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group",
                      activeSessionId === session.id
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 flex-shrink-0", colorClass)} />
                    <span className="text-sm truncate flex-1">{session.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-mode-image flex items-center justify-center text-xs font-bold text-primary-foreground">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">User</p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
