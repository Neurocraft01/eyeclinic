"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "Thank you for your message. Our team will get back to you shortly.";
      if (userMessage.toLowerCase().includes("appointment")) {
        botResponse = "You can book an appointment by clicking the 'Book Appointment' button in the navigation bar.";
      } else if (userMessage.toLowerCase().includes("hours")) {
        botResponse = "We are open Monday to Friday from 9 AM to 6 PM, and Saturdays from 10 AM to 2 PM.";
      } else if (userMessage.toLowerCase().includes("location")) {
        botResponse = "We are located at 123 Vision Street, Medical District.";
      }

      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-24 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-secondary transition-transform hover:scale-110 flex items-center justify-center"
          aria-label="Open Chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Visionary Assistant</h3>
            <button onClick={toggleChat} className="hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 h-80 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.isUser
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white p-2 rounded-md hover:bg-secondary transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
