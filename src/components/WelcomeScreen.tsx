import { MessageSquare, Image, Calculator, Code2, Sparkles, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import type { Mode } from "@/pages/Index";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.jpg";

interface WelcomeScreenProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
  onSendMessage: (msg: string) => void;
}

const modes = [
  {
    id: "chat" as Mode,
    label: "General Chat",
    description: "Conversational AI for any topic",
    icon: MessageSquare,
    color: "text-mode-chat",
    border: "border-mode-chat/30 hover:border-mode-chat",
    bg: "hover:bg-mode-chat/5",
    glow: "hover:shadow-[0_0_20px_hsl(var(--mode-chat)/0.15)]",
    suggestions: ["Explain quantum computing", "Help me write an email", "What's the meaning of life?"],
  },
  {
    id: "image" as Mode,
    label: "Image Generation",
    description: "Create stunning visuals from text",
    icon: Image,
    color: "text-mode-image",
    border: "border-mode-image/30 hover:border-mode-image",
    bg: "hover:bg-mode-image/5",
    glow: "hover:shadow-[0_0_20px_hsl(var(--mode-image)/0.15)]",
    suggestions: ["A futuristic city at night", "Abstract digital art", "A serene mountain landscape"],
  },
  {
    id: "math" as Mode,
    label: "Math Solver",
    description: "Solve equations step-by-step",
    icon: Calculator,
    color: "text-mode-math",
    border: "border-mode-math/30 hover:border-mode-math",
    bg: "hover:bg-mode-math/5",
    glow: "hover:shadow-[0_0_20px_hsl(var(--mode-math)/0.15)]",
    suggestions: ["Solve: 2x² + 5x - 3 = 0", "Integrate sin(x)cos(x)", "Explain Euler's identity"],
  },
  {
    id: "code" as Mode,
    label: "Programming",
    description: "Code generation & debugging",
    icon: Code2,
    color: "text-mode-code",
    border: "border-mode-code/30 hover:border-mode-code",
    bg: "hover:bg-mode-code/5",
    glow: "hover:shadow-[0_0_20px_hsl(var(--mode-code)/0.15)]",
    suggestions: ["Build a React component", "Debug my Python code", "Explain Big O notation"],
  },
];

const features = [
  { icon: Zap, label: "Lightning Fast", desc: "Instant responses" },
  { icon: Shield, label: "Private & Secure", desc: "Your data is safe" },
  { icon: Globe, label: "Multilingual", desc: "50+ languages" },
];

export default function WelcomeScreen({ currentMode, onModeChange, onSendMessage }: WelcomeScreenProps) {
  const activeModeData = modes.find((m) => m.id === currentMode)!;

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="relative max-w-3xl mx-auto text-center px-6 pt-12 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-xs text-primary font-medium mb-6 animate-fade-up">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Advanced AI Models
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="bg-gradient-to-r from-primary via-mode-image to-mode-code bg-clip-text text-transparent">
              NexusAI
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-3 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Your all-in-one intelligent assistant
          </p>
          <div className="flex items-center justify-center gap-6 mt-5 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="hidden sm:inline">{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-10">
        {/* Mode Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {modes.map((mode, i) => {
            const Icon = mode.icon;
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                className={cn(
                  "flex flex-col items-start gap-3 p-4 rounded-2xl border transition-all duration-300 text-left animate-fade-up",
                  mode.border, mode.bg, mode.glow,
                  isActive ? "bg-card shadow-md" : "bg-card/50"
                )}
                style={{ animationDelay: `${0.25 + i * 0.07}s` }}
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isActive ? "bg-muted" : "bg-muted/60")}>
                  <Icon className={cn("w-5 h-5", mode.color)} />
                </div>
                <div>
                  <p className={cn("text-sm font-semibold", isActive ? mode.color : "text-foreground")}>{mode.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{mode.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Suggestions */}
        <div className="animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Try asking...
          </p>
          <div className="grid gap-2">
            {activeModeData.suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => onSendMessage(suggestion)}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-card/80 transition-all duration-200 group text-left"
              >
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{suggestion}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
