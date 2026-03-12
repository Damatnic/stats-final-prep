"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "How do I know when to use Z vs T?",
    "Explain the 5 steps of hypothesis testing",
    "What's the difference between individual and sample mean?",
    "Help me with a confidence interval problem",
    "When do I use chi-square goodness of fit?",
    "What are Type I and Type II errors?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">AI Stats Tutor</h1>
        <p className="text-gray-400">Ask any statistics question. Get step-by-step help.</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto card mb-4 p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">?</div>
            <h2 className="text-xl font-bold mb-2">Ask me anything about statistics!</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              I can help with problems, explain concepts, walk through formulas,
              and give you TI-84 commands. Just type your question below.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="px-3 py-2 bg-[#1e293b] hover:bg-[#334155] rounded-lg text-sm text-gray-300 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-[#3B82F6] text-white"
                      : "bg-[#1e293b] text-gray-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1e293b] rounded-lg p-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse delay-200"></div>
                    <span className="ml-2">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="warning-box mb-4">
          <p className="text-[#ef4444]">{error}</p>
          {error.includes("API key") && (
            <p className="text-gray-400 text-sm mt-2">
              Add ANTHROPIC_API_KEY to Vercel environment variables to enable the AI tutor.
            </p>
          )}
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question here... (Enter to send, Shift+Enter for new line)"
          className="flex-1 bg-[#1e293b] border border-[#334155] rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-[#3B82F6]"
          rows={3}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="px-6 bg-[#3B82F6] hover:bg-[#2563eb] disabled:bg-[#334155] disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
        >
          Send
        </button>
      </div>

      {/* Tips */}
      <div className="mt-4 text-gray-500 text-sm">
        <p>Tips: Paste your exact problem for help. Ask for TI-84 commands. Request step-by-step solutions.</p>
      </div>
    </div>
  );
}
