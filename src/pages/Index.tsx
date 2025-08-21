import { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import CareerAssessment from "@/components/CareerAssessment";
import FeatureCard from "@/components/FeatureCard";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Briefcase, 
  MessageSquare, 
  FileText,
  Award,
  Rocket,
  BarChart3,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/career-mentor-hero.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const { toast } = useToast();

  const features = [
    {
      title: "AI Career Chat",
      description: "Get personalized career advice through intelligent conversations",
      icon: MessageSquare,
      features: [
        "Real-time career guidance",
        "Industry insights and trends", 
        "Personalized recommendations",
        "24/7 availability"
      ],
      status: 'available' as const,
    },
    {
      title: "Skill Assessment", 
      description: "Discover your strengths and areas for growth",
      icon: Target,
      features: [
        "Comprehensive skill analysis",
        "Industry benchmarking",
        "Learning path recommendations",
        "Progress tracking"
      ],
      status: 'available' as const,
    },
    {
      title: "Resume Optimizer",
      description: "AI-powered resume review and optimization",
      icon: FileText,
      features: [
        "ATS compatibility check",
        "Content optimization",
        "Industry-specific formatting",
        "Keyword analysis"
      ],
      status: 'beta' as const,
    },
    {
      title: "Career Roadmap",
      description: "Personalized career path planning and milestones",
      icon: Rocket,
      features: [
        "Custom career paths",
        "Goal setting and tracking",
        "Timeline planning",
        "Success metrics"
      ],
      status: 'coming-soon' as const,
    }
  ];

  const stats = [
    {
      title: "Career Paths Analyzed",
      value: "15.2K+",
      icon: TrendingUp,
      trend: { value: "12%", isPositive: true },
      description: "Across 200+ industries"
    },
    {
      title: "Active Users",
      value: "8.5K",
      icon: Users,
      trend: { value: "24%", isPositive: true },
      description: "Growing community"
    },
    {
      title: "Success Rate",
      value: "89%",
      icon: Award,
      trend: { value: "5%", isPositive: true },
      description: "Career advancement"
    },
    {
      title: "Avg. Response Time",
      value: "< 2s",
      icon: Clock,
      description: "Lightning fast AI"
    }
  ];

  const handleFeatureClick = (feature: typeof features[0]) => {
    if (feature.status === 'coming-soon') {
      toast({
        title: "Coming Soon!",
        description: `${feature.title} will be available in the next update.`,
      });
    } else if (feature.status === 'beta') {
      toast({
        title: "Beta Feature",
        description: `${feature.title} is in beta. Your feedback is valuable!`,
      });
    } else {
      setActiveTab(feature.title.toLowerCase().includes('chat') ? 'chat' : 'assessment');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-mentor opacity-5" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-mentor bg-clip-text text-transparent animate-slide-up">
              AI 360 Career Mentor
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
              Transform your career journey with AI-powered guidance, personalized insights, 
              and intelligent career planning that adapts to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-hover text-lg px-8 py-6"
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Career Chat
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/30 text-primary hover:bg-primary/10 text-lg px-8 py-6"
                onClick={() => setActiveTab('assessment')}
              >
                <Target className="mr-2 h-5 w-5" />
                Take Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <StatsCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interface */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="chat" className="text-lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                AI Career Chat
              </TabsTrigger>
              <TabsTrigger value="assessment" className="text-lg">
                <Brain className="mr-2 h-5 w-5" />
                Career Assessment
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="animate-slide-up">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="assessment" className="animate-slide-up">
              <CareerAssessment />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Career Development Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI-powered features to accelerate your professional growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard {...feature} onClick={() => handleFeatureClick(feature)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-mentor">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Join thousands of professionals who've transformed their careers with AI guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6"
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Free Chat
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
                onClick={() => toast({ title: "Coming Soon!", description: "Pro features will be available soon." })}
              >
                <Rocket className="mr-2 h-5 w-5" />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-background border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 AI 360 Career Mentor. Empowering careers through artificial intelligence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
