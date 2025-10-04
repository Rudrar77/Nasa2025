import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Bot, User, Volume2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import PageHeader from '@/components/PageHeader';
import useTTS from '@/hooks/useTTS';
import { useSpeechRecognition } from 'react-speech-kit';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AiChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hello! I'm your space guide. Ask me anything about the cosmos!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const { speak, stop: stopTTS, speaking } = useTTS();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setInputValue(result);
    },
  });

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isThinking) return;

    const userMessage: Message = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // --- Backend API Call Simulation ---
    // In a real application, you would make an API call to your backend here.
    // Your backend would then securely call the Gemini API with your key.
    // For demonstration, we'll simulate a response.
    console.log("Sending to AI (mock):", text);
    
    // The system prompt tells the AI to act as a space expert.
    const systemPrompt = "You are a friendly and enthusiastic space guide for all ages. Your knowledge covers astronomy, space exploration, and cosmology. Keep your answers concise, exciting, and easy to understand. Start your response with a space-themed emoji.";

    // This is a mock response. Replace this with your actual API call.
    const getMockResponse = (question: string): string => {
        question = question.toLowerCase();
        if (question.includes("sun")) return "☀️ The Sun is a giant star at the center of our solar system! It's so big that one million Earths could fit inside it.";
        if (question.includes("black hole")) return "🕳️ A black hole is a place in space where gravity pulls so much that even light can't get out. It's like a cosmic vacuum cleaner!";
        if (question.includes("mars")) return "🔴 Mars is the 'Red Planet'! It's red because of rusty iron in the ground. Scientists are very interested in exploring it for signs of past life.";
        if (question.includes("aurora")) return "🌌 Auroras, or the Northern and Southern Lights, are beautiful light shows in the sky caused by particles from the sun interacting with Earth's magnetic field.";
        return "🚀 That's a great question! The universe is vast and full of wonders. Tell me what else you're curious about!";
    }

    setTimeout(() => {
      const aiResponseText = getMockResponse(text);
      const aiMessage: Message = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
      speak(aiMessage.text, { rate: 0.9, pitch: 1.05 });
    }, 1500 + Math.random() * 1000);
    // --- End of Simulation ---

  }, [isThinking, speak]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleMicToggle = () => {
    if (listening) {
      stop();
    } else {
      setInputValue(''); // Clear input before listening
      listen({ lang: 'en-US' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space p-4 sm:p-6 flex flex-col">
      <PageHeader
        title="AI Space Guide"
        subtitle="Ask me anything about space, from planets to black holes!"
      />
      <Card className="flex-1 flex flex-col bg-glass/30 backdrop-blur-md border-glass overflow-hidden">
        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground">
                        <Bot size={20} />
                      </div>
                    )}
                    <div
                      className={`max-w-md p-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-secondary-foreground">
                        <User size={20} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground">
                    <Bot size={20} />
                  </div>
                  <div className="max-w-md p-3 rounded-2xl bg-muted rounded-bl-none flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-glass">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder={listening ? "Listening..." : "Ask about space..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                disabled={isThinking || listening}
                className="flex-1 bg-background/50"
              />
              <Button
                size="icon"
                onClick={handleMicToggle}
                disabled={isThinking}
                variant={listening ? 'destructive' : 'outline'}
              >
                {listening ? <Square size={20} /> : <Mic size={20} />}
              </Button>
              <Button size="icon" onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isThinking}>
                <Send size={20} />
              </Button>
            </div>
            {speaking && (
                <Button variant="outline" size="sm" onClick={stopTTS} className="mt-2 w-full">
                    <Volume2 className="w-4 h-4 mr-2" /> Stop Narration
                </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiChatPage;