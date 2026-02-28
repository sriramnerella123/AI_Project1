import { useState, useRef, useEffect } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import WelcomeScreen from "@/components/WelcomeScreen";

export type Mode = "chat" | "image" | "math" | "code";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  mode: Mode;
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  mode: Mode;
  createdAt: Date;
}

const SAMPLE_RESPONSES: Record<Mode, string[]> = {
  chat: [
    "I'm NexusAI, your intelligent assistant. I can help you with a wide range of topics — from brainstorming ideas to answering complex questions. What would you like to explore today?",
    "That's a great question! Let me think through this carefully. The key insight here is that combining multiple perspectives often leads to the most robust solutions. Here's my analysis...",
    "Absolutely! I'd be happy to dive deeper into that topic. There are several fascinating dimensions to consider here...",
  ],
  image: [
    "🎨 **Image Generation Mode Active**\n\nI can help you create stunning visuals! Describe what you'd like to generate:\n- **Style**: Photorealistic, digital art, watercolor, 3D render...\n- **Subject**: Landscapes, portraits, abstract, architectural...\n- **Mood**: Cinematic, dreamy, vibrant, minimal...\n\n*Your prompt has been processed and queued for generation.*",
    "✨ **Generating your image...**\n\nBased on your description, I'm crafting: a high-resolution concept with carefully balanced composition, dynamic lighting, and rich color palette. The generation model is applying artistic style transfer and upscaling for maximum quality.",
  ],
  math: [
    "📐 **Mathematical Analysis**\n\nLet me solve this step by step:\n\n**Given:** The equation you provided\n\n**Step 1:** Identify the variables and constants\n**Step 2:** Apply the appropriate theorem\n**Step 3:** Simplify and solve\n\n$$\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$\n\n**Result:** The solution converges to the expected value with high precision.",
    "🔢 **Calculation Complete**\n\nUsing advanced numerical methods:\n- Applied **Gaussian elimination** for matrix operations\n- Used **Newton-Raphson** for iterative approximation\n- Verified with **symbolic computation**\n\n**Answer:** The expression evaluates to approximately **42.7831**",
  ],
  code: [
    "💻 **Code Analysis & Generation**\n\nHere's a clean, optimized implementation:\n\n```typescript\n// Efficient solution with O(n log n) complexity\nfunction processData<T>(items: T[], comparator: (a: T, b: T) => number): T[] {\n  return [...items]\n    .sort(comparator)\n    .filter((item, index, arr) => \n      index === 0 || comparator(item, arr[index - 1]) !== 0\n    );\n}\n\n// Usage example\nconst sorted = processData(data, (a, b) => a.id - b.id);\nconsole.log('Processed:', sorted.length, 'items');\n```\n\n**Complexity:** O(n log n) time, O(n) space\n**Features:** Generic types, immutable operations, duplicate filtering",
    "🚀 **Code Review Complete**\n\nI've analyzed your code and found several optimization opportunities:\n\n1. **Performance:** Replace nested loops with a hash map (O(n²) → O(n))\n2. **Readability:** Extract magic numbers into named constants\n3. **Safety:** Add input validation and error boundaries\n4. **Testing:** 3 edge cases need coverage\n\nHere's the refactored version with all improvements applied...",
  ],
};

const generateResponse = (mode: Mode): string => {
  const responses = SAMPLE_RESPONSES[mode];
  return responses[Math.floor(Math.random() * responses.length)];
};

export default function Index() {
  const [isDark, setIsDark] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<Mode>("chat");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      mode: currentMode,
      createdAt: new Date(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    let sessionId = activeSessionId;

    if (!sessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
        messages: [],
        mode: currentMode,
        createdAt: new Date(),
      };
      setSessions((prev) => [newSession, ...prev]);
      sessionId = newSession.id;
      setActiveSessionId(sessionId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      mode: currentMode,
      timestamp: new Date(),
    };

    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      mode: currentMode,
      timestamp: new Date(),
      isTyping: true,
    };

    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              title: s.messages.length === 0 ? content.slice(0, 35) + (content.length > 35 ? "..." : "") : s.title,
              messages: [...s.messages, userMessage, typingMessage],
            }
          : s
      )
    );

    setTimeout(() => {
      const aiResponse = generateResponse(currentMode);
      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: aiResponse,
        mode: currentMode,
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                messages: s.messages
                  .filter((m) => !m.isTyping)
                  .concat(aiMessage),
              }
            : s
        )
      );
    }, 1800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewChat={createNewSession}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatHeader
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          currentMode={currentMode}
          onModeChange={setCurrentMode}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="flex-1 overflow-hidden relative">
          {!activeSession || activeSession.messages.length === 0 ? (
            <WelcomeScreen
              currentMode={currentMode}
              onModeChange={setCurrentMode}
              onSendMessage={sendMessage}
            />
          ) : (
            <ChatMessages
              messages={activeSession.messages}
              messagesEndRef={messagesEndRef}
            />
          )}
        </main>

        <ChatInput
          onSend={sendMessage}
          currentMode={currentMode}
          disabled={false}
        />
      </div>
    </div>
  );
}
