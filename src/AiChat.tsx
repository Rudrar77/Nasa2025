import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Plus, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// OpenRouter API configuration
const OPENROUTER_API_KEY = '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';
const YOUR_SITE_URL = 'https://nasa2025.space';
const YOUR_SITE_NAME = 'NASA 2025 Space Explorer';

const AiChatPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load conversations from localStorage on component mount
  useEffect(() => {
    const savedConversations = localStorage.getItem('space-chat-conversations');
    if (savedConversations) {
      const parsedConversations = JSON.parse(savedConversations).map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setConversations(parsedConversations);
      
      // Load the most recent conversation
      if (parsedConversations.length > 0) {
        const mostRecent = parsedConversations.sort((a: Conversation, b: Conversation) => 
          b.updatedAt.getTime() - a.updatedAt.getTime()
        )[0];
        setCurrentConversationId(mostRecent.id);
        setMessages(mostRecent.messages);
      } else {
        // Create first conversation if none exist
        createNewConversation();
      }
    } else {
      // Create first conversation if no saved data
      createNewConversation();
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('space-chat-conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Space Chat',
      messages: [
        {
          id: '1',
          content: "Hello! I'm your space exploration assistant. Ask me anything about astronomy, space missions, planets, stars, or space weather!",
          isBot: true,
          timestamp: new Date(),
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setMessages(newConversation.messages);
    setInput('');
    setError(null);
  };

  const updateConversationTitle = (conversationId: string, firstUserMessage: string) => {
    const title = firstUserMessage.length > 30 
      ? firstUserMessage.substring(0, 30) + '...' 
      : firstUserMessage;
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, title } 
          : conv
      )
    );
  };

  const switchConversation = (conversationId: string) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setCurrentConversationId(conversationId);
      setMessages(conversation.messages);
      setInput('');
      setError(null);
    }
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    
    if (currentConversationId === conversationId) {
      const remainingConversations = conversations.filter(conv => conv.id !== conversationId);
      if (remainingConversations.length > 0) {
        const nextConversation = remainingConversations[0];
        setCurrentConversationId(nextConversation.id);
        setMessages(nextConversation.messages);
      } else {
        createNewConversation();
      }
    }
  };

  const updateCurrentConversation = (newMessages: Message[]) => {
    if (!currentConversationId) return;

    setMessages(newMessages);
    setConversations(prev =>
      prev.map(conv =>
        conv.id === currentConversationId
          ? { ...conv, messages: newMessages, updatedAt: new Date() }
          : conv
      )
    );
  };

  const isSpaceRelated = (question: string): boolean => {
    const spaceKeywords = [
      'space', 'astronomy', 'planet', 'star', 'galaxy', 'universe', 'cosmos',
      'solar system', 'moon', 'sun', 'mars', 'jupiter', 'saturn', 'neptune',
      'uranus', 'venus', 'mercury', 'pluto', 'asteroid', 'comet', 'meteor',
      'nebula', 'black hole', 'nasa', 'iss', 'spacecraft', 'rocket', 'satellite',
      'orbit', 'gravity', 'light year', 'telescope', 'hubble', 'webb', 'voyager',
      'apollo', 'mission', 'astronaut', 'cosmonaut', 'space station',
      'solar wind', 'radiation', 'eclipse', 'constellation', 'milky way',
      'exoplanet', 'habitable zone', 'dark matter', 'dark energy',
      'space weather', 'aurora', 'solar flare', 'coronal mass ejection',
      'cme', 'magnetosphere', 'ionosphere', 'atmospheric', 'stratosphere',
      'spacex', 'blue origin', 'artemis', 'perseverance', 'curiosity',
      'james webb', 'kepler', 'cassini', 'juno', 'new horizons'
    ];
    
    const lowerQuestion = question.toLowerCase();
    return spaceKeywords.some(keyword => lowerQuestion.includes(keyword));
  };

  const callOpenRouterAPI = async (question: string): Promise<string> => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': YOUR_SITE_URL,
          'X-Title': YOUR_SITE_NAME,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
          messages: [
            {
              role: 'system',
              content: 'You are an expert space and astronomy assistant. Provide accurate, engaging, and educational information about space, astronomy, space missions, planets, stars, and space weather. Keep responses informative but conversational, suitable for space enthusiasts of all levels.'
            },
            {
              role: 'user',
              content: question,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
          top_p: 0.9,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenRouter API Error:', response.status, errorData);
        
        if (response.status === 400) {
          throw new Error('Invalid request. Please try rephrasing your question.');
        } else if (response.status === 401) {
          throw new Error('API authentication failed. Please check the API key.');
        } else if (response.status === 403) {
          throw new Error('Access forbidden. API key may not have proper permissions.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again in a moment.');
        } else {
          throw new Error(`API request failed with status: ${response.status}`);
        }
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content.trim();
      } else if (data.error) {
        throw new Error(data.error.message || 'API returned an error');
      } else {
        console.error('Unexpected API response:', data);
        throw new Error('Received unexpected response format from AI service');
      }
    } catch (error) {
      console.error('OpenRouter API error:', error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Failed to connect to AI service');
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    updateCurrentConversation(newMessages);

    // Update conversation title if this is the first user message
    const isFirstUserMessage = messages.filter(msg => !msg.isBot).length === 0;
    if (isFirstUserMessage && currentConversationId) {
      updateConversationTitle(currentConversationId, input.trim());
    }

    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Check if question is space-related
      if (!isSpaceRelated(currentInput)) {
        const nonSpaceResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm specialized in space and astronomy topics! Please ask me about planets, stars, space missions, astronauts, space weather, or anything related to space exploration. 🚀\n\nTry asking about:\n• Solar system planets and their moons\n• Space missions like Apollo, Artemis, or Mars rovers\n• Astronomical phenomena like black holes or supernovas\n• Space technology and spacecraft\n• Astronaut experiences and space stations\n• Space weather and solar activity",
          isBot: true,
          timestamp: new Date(),
        };
        const finalMessages = [...newMessages, nonSpaceResponse];
        updateCurrentConversation(finalMessages);
        return;
      }

      // Call OpenRouter API for space-related questions
      const aiResponse = await callOpenRouterAPI(currentInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isBot: true,
        timestamp: new Date(),
      };

      const finalMessages = [...newMessages, botMessage];
      updateCurrentConversation(finalMessages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting to my knowledge base right now. This might be due to:\n\n• Network connectivity issues\n• API service temporarily unavailable\n• Rate limiting\n\nPlease wait a moment and try again! 🛰️",
        isBot: true,
        timestamp: new Date(),
      };
      
      const finalMessages = [...newMessages, errorResponse];
      updateCurrentConversation(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 pt-20 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-slate-900/90 border-r border-slate-700 flex flex-col`}>
        <div className="p-4 border-b border-slate-700">
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            variant="ghost"
            className="w-full justify-start text-white hover:bg-slate-800"
          >
            <MessageSquare className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Conversations</span>}
          </Button>
        </div>

        {sidebarOpen && (
          <>
            <div className="p-4">
              <Button
                onClick={createNewConversation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>

            <ScrollArea className="flex-1 px-2">
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`group flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-slate-800 ${
                      currentConversationId === conversation.id ? 'bg-slate-800' : ''
                    }`}
                    onClick={() => switchConversation(conversation.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{conversation.title}</p>
                      <p className="text-xs text-slate-400">{formatDate(conversation.updatedAt)}</p>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8 max-w-4xl flex-1 flex flex-col">
          <Card className="flex-1 bg-slate-900/90 border-slate-700 flex flex-col">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="flex items-center gap-2 text-white">
                <Bot className="h-6 w-6 text-blue-400" />
                Space Explorer AI Assistant
                <span className="text-xs bg-green-600 px-2 py-1 rounded-full ml-2">
                  Powered by Llama 3.2
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0 flex flex-col flex-1">
              {error && (
                <Alert className="m-4 border-red-500 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <ScrollArea 
                className="flex-1 p-4"
                ref={scrollAreaRef}
              >
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} gap-2`}
                    >
                      {message.isBot && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isBot
                            ? 'bg-slate-800 text-slate-100'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 opacity-70`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      
                      {!message.isBot && (
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="border-t border-slate-700 p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about space, astronomy, or space exploration..."
                    className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Ask me about planets, stars, space missions, astronauts, or anything space-related! 🚀
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiChatPage;