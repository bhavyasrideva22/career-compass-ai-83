import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Briefcase, TrendingUp, Target, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion';
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Career Mentor. I'm here to help you navigate your professional journey, explore career paths, and achieve your goals. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickSuggestions = [
    { icon: Briefcase, text: "Help me find my ideal career path", type: "career-path" },
    { icon: TrendingUp, text: "Review my resume and skills", type: "resume-review" },
    { icon: Target, text: "Set professional goals for 2024", type: "goal-setting" },
    { icon: BookOpen, text: "Recommend learning resources", type: "learning" }
  ];

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = {
        'career-path': "I'd be happy to help you explore career paths! Let me analyze your interests, skills, and market trends. Can you tell me about your current field, what you enjoy most about your work, and any areas where you'd like to grow?",
        'resume-review': "Great! I can provide comprehensive resume feedback. Please share your current resume or tell me about your work experience, skills, and the type of positions you're targeting. I'll help optimize it for ATS systems and hiring managers.",
        'goal-setting': "Excellent timing for goal setting! Let's create SMART professional goals for 2024. What are your current priorities: skill development, career advancement, industry transition, or leadership growth? I'll help you create actionable milestones.",
        'learning': "I'd love to recommend personalized learning resources! What specific skills or knowledge areas interest you? I can suggest courses, certifications, books, and practical projects based on your career goals and learning style.",
        'default': "That's a great question! Based on current industry trends and career development best practices, I can provide you with personalized guidance. Could you share more details about your specific situation or goals?"
      };

      const responseKey = quickSuggestions.find(s => messageContent.includes(s.text.toLowerCase()))?.type as keyof typeof responses || 'default';
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[responseKey],
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);

    toast({
      title: "Message sent",
      description: "I'm analyzing your request and preparing a personalized response.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-[600px] bg-gradient-card border-border/50 shadow-card flex flex-col">
      <div className="p-4 border-b border-border/50 bg-gradient-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
            <AvatarImage src="/bot-avatar.png" alt="AI Career Mentor" />
            <AvatarFallback className="bg-primary-glow text-primary-foreground">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">AI Career Mentor</h3>
            <p className="text-sm opacity-90">Your professional growth companion</p>
          </div>
          <div className="ml-auto">
            <div className="animate-pulse-glow h-3 w-3 bg-success rounded-full"></div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-slide-up ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/bot-avatar.png" alt="AI Career Mentor" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                    : 'bg-muted text-foreground border border-border/50'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {message.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start animate-slide-up">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted text-foreground rounded-lg px-4 py-2 border border-border/50">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="p-4 border-t border-border/50 space-y-3">
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto p-3 hover:shadow-hover transition-all"
                onClick={() => handleSendMessage(suggestion.text)}
              >
                <suggestion.icon className="h-4 w-4 mr-2 text-primary" />
                <span className="text-xs">{suggestion.text}</span>
              </Button>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="Ask about your career, skills, goals, or job market..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-muted/50 border-border/50 focus:ring-primary focus:border-primary"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-primary hover:shadow-hover transition-all"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;