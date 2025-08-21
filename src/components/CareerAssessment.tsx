import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Brain, Target, TrendingUp, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
}

interface AssessmentResult {
  category: string;
  score: number;
  recommendations: string[];
}

const CareerAssessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const { toast } = useToast();

  const questions: Question[] = [
    {
      id: '1',
      category: 'work-style',
      question: 'What work environment motivates you most?',
      options: ['Collaborative team settings', 'Independent remote work', 'Fast-paced startup culture', 'Structured corporate environment']
    },
    {
      id: '2',
      category: 'skills',
      question: 'Which skill do you want to develop most?',
      options: ['Technical/Programming', 'Leadership & Management', 'Creative & Design', 'Data & Analytics']
    },
    {
      id: '3',
      category: 'goals',
      question: 'What is your primary career goal for the next 2 years?',
      options: ['Get promoted to senior role', 'Switch to new industry', 'Start own business', 'Achieve work-life balance']
    },
    {
      id: '4',
      category: 'interests',
      question: 'What type of problems do you enjoy solving?',
      options: ['Complex technical challenges', 'People & relationship issues', 'Business strategy problems', 'Creative & design challenges']
    },
    {
      id: '5',
      category: 'values',
      question: 'What matters most to you in your career?',
      options: ['High salary & benefits', 'Making social impact', 'Continuous learning', 'Recognition & prestige']
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      generateResults();
    }
  };

  const generateResults = () => {
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: AssessmentResult[] = [
        {
          category: 'Technical Leadership',
          score: 85,
          recommendations: [
            'Consider pursuing a Tech Lead or Engineering Manager role',
            'Develop skills in system architecture and team mentoring',
            'Look into companies with strong engineering cultures'
          ]
        },
        {
          category: 'Innovation & Strategy',
          score: 78,
          recommendations: [
            'Explore product management opportunities',
            'Consider roles in technology consulting',
            'Look into startup environments for rapid growth'
          ]
        },
        {
          category: 'Continuous Learning',
          score: 92,
          recommendations: [
            'Pursue advanced certifications in your field',
            'Consider roles with R&D components',
            'Look for companies that invest in employee education'
          ]
        }
      ];

      setResults(mockResults);
      setShowResults(true);
      
      toast({
        title: "Assessment Complete!",
        description: "Your personalized career insights are ready.",
      });
    }, 2000);
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setResults([]);
  };

  if (showResults) {
    return (
      <Card className="w-full bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-success-foreground" />
          </div>
          <CardTitle className="text-2xl bg-gradient-mentor bg-clip-text text-transparent">
            Your Career Assessment Results
          </CardTitle>
          <CardDescription>
            Based on your responses, here are your personalized career insights
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="space-y-3 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-lg">{result.category}</h4>
                </div>
                <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                  {result.score}% Match
                </Badge>
              </div>
              
              <Progress value={result.score} className="h-2" />
              
              <div className="space-y-2">
                {result.recommendations.map((rec, recIndex) => (
                  <div key={recIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={resetAssessment}
              variant="outline"
              className="flex-1"
            >
              Retake Assessment
            </Button>
            <Button 
              className="flex-1 bg-gradient-primary hover:shadow-hover"
              onClick={() => toast({ title: "Feature coming soon!", description: "Detailed career plan generation will be available soon." })}
            >
              Get Detailed Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Career Assessment
            </CardTitle>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="text-lg font-semibold text-primary">{Math.round(progress)}%</div>
          </div>
        </div>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="animate-slide-up">
          <h3 className="text-xl font-semibold mb-6 text-center">
            {currentQuestion.question}
          </h3>
          
          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto p-4 hover:shadow-hover transition-all group"
                onClick={() => handleAnswer(index)}
              >
                <div className="flex items-center gap-3 w-full">
                  <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Category: {currentQuestion.category.replace('-', ' ').toUpperCase()}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerAssessment;