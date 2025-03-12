import React, { useState, useRef, useEffect } from "react";

const AIChatInterface = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: trimmedQuestion,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setQuestion("");
    setIsLoading(true);

    setTimeout(() => {
      const mockResponses = [
        "That's an interesting question! Let me think about it.",
        "AI is processing your query with advanced algorithms.",
        "Hmm, fascinating. Here's my perspective...",
        "Breaking down your question into key components...",
        "Analyzing the context and preparing a comprehensive response.",
      ];

      const randomResponse =
        mockResponses[Math.floor(Math.random() * mockResponses.length)];

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-[#24252b] text-white font-serif">
      {/* Top Navigation Bar */}
      <nav className="bg-[#1a1b1f] border-b border-gray-700">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-white">ExamAce</h1>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center">
        {/* Main Chat Area */}
        <div className="w-3/4 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-6">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome to ExamAce</h2>
                  <p className="text-gray-300 text-lg">Ask me anything, and I'll help you find answers</p>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`group relative max-w-[85%] px-6 py-4 rounded-2xl ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-[#1a1b1f] text-white shadow-sm border border-gray-700"
                    }`}
                  >
                    {message.type === "ai" && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">EA</span>
                        </div>
                        <span className="text-xs text-gray-300">ExamAce</span>
                      </div>
                    )}
                    <div className={`text-[15px] leading-relaxed ${message.type === "user" ? "" : "text-white"}`}>
                      {message.content}
                    </div>
                    <div className={`mt-2 text-xs ${message.type === "user" ? "text-blue-100" : "text-gray-400"}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1b1f] text-white rounded-2xl px-6 py-4 max-w-[85%] shadow-sm border border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">EA</span>
                      </div>
                      <span className="text-xs text-gray-300">ExamAce</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      </div>
                      <span className="text-[15px] text-gray-300">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700 bg-[#1a1b1f] p-4">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (question.trim()) handleSubmit(e);
                    }
                  }}
                  placeholder="Ask anything..."
                  className="w-full resize-none p-4 pr-12 border border-gray-700 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-[15px] placeholder-gray-400 bg-[#24252b] text-white
                           min-h-[56px] max-h-[200px]"
                  required
                />
                <button
                  type="submit"
                  disabled={!question.trim()}
                  className="absolute right-3 bottom-[13px] bg-blue-600 text-white p-2 rounded-lg
                           hover:bg-blue-700 transition-colors duration-200
                           disabled:bg-gray-700 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;


