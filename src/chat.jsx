import React, { useState, useRef, useEffect } from "react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [temp, setTemp] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleApi = async (e) => {
    e.preventDefault();
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          json: () =>
            Promise.resolve({
              answer:
                "Deadlock is a situation where two or more processes are blocked indefinitely, waiting for each other to release resources that they need. [1, 2] This creates a cyclical dependency where no process can proceed.\n\n" +
                "*Definition:* A set of processes is deadlocked if each process in the set is waiting for an event that only another process in the set can cause...\n\n" +
                "*Necessary conditions:* Mutual exclusion, Hold and wait, No preemption, Circular wait...\n\n" +
                "*Example:* Two processes wanting to record a document on a CD. Process A acquires the scanner, Process B acquires the CD recorder. A then requests the CD recorder (blocked), and B requests the scanner (blocked). Both are now deadlocked.",
            }),
        });
      }, 600);
    });

    const result = await response.json();
    console.log(result.answer);
    setTemp(result.answer);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      // Make API request
      const response = await fetch("API Endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      // Add API response to messages
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            data.response ||
            "I'm ExamAce, your educational assistant. How can I help you with your studies today?",
        },
      ]);
    } catch (error) {
      console.error("Error fetching from API:", error);
      // Add fallback response in case of error
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting to my knowledge base. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] bg-[#24252b] text-white font-serif m-0">
      {/* Header */}
      <header className="bg-[#1a1b1f] border-b border-gray-700 py-2 px-4 h-[8vh]">
        <div className="w-[95%] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-white font-semibold text-xl">ExamAce</div>
          </div>
        </div>
      </header>

      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-4 h-[74vh]">
        <div className="w-[95%] mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 space-y-4 mt-8">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white text-xl font-bold">EA</span>
              </div>
              <p className="text-2xl font-medium text-white">
                Welcome to ExamAce
              </p>
              {/* <p className="text-center max-w-md text-gray-300 text-base">
                I'm your educational assistant, ready to help you learn,
                understand, and excel in your studies.
              </p> */}
              <p className="text-center max-w-md text-gray-300 text-base">
                {temp ||
                  "I'm your educational assistant, ready to help you learn , understand, and excel in your studies."}
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-5 py-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-[#1a1b1f] border border-gray-700 text-white"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            EA
                          </span>
                        </div>
                        <span className="text-sm text-gray-300">ExamAce</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1b1f] text-white rounded-xl px-5 py-3 max-w-[85%] border border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          EA
                        </span>
                      </div>
                      <span className="text-sm text-gray-300">ExamAce</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      </div>
                      <span className="text-[15px] text-gray-300">
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-700 p-3 h-[8vh]">
        <div className="w-[95%] mx-auto">
          <form onSubmit={handleApi} className="flex flex-col">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask anything..."
                className="w-full resize-none p-3 pr-12 border border-gray-700 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         text-[15px] placeholder-gray-400 bg-[#24252b] text-white
                         min-h-[48px] max-h-[96px]"
                rows="1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                className="absolute right-2 bottom-[10px] bg-blue-600 text-white p-2 rounded-lg
                         hover:bg-blue-700 transition-colors duration-200
                         disabled:bg-gray-700 disabled:cursor-not-allowed"
                disabled={inputValue.trim() === "" || isLoading}
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
  );
};

export default ChatInterface;
