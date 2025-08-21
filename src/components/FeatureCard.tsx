import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  status?: 'available' | 'coming-soon' | 'beta';
  onClick?: () => void;
}

const FeatureCard = ({ title, description, icon: Icon, features, status = 'available', onClick }: FeatureCardProps) => {
  return (
    <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-hover transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="p-3 bg-gradient-primary rounded-lg shadow-glow group-hover:shadow-card transition-all">
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
          {status !== 'available' && (
            <Badge 
              variant="secondary" 
              className={status === 'beta' ? 'bg-accent/20 text-accent-foreground border-accent/30' : 'bg-muted'}
            >
              {status === 'beta' ? 'BETA' : 'SOON'}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className="w-full bg-gradient-primary hover:shadow-hover transition-all"
          onClick={onClick}
          disabled={status === 'coming-soon'}
        >
          {status === 'coming-soon' ? 'Coming Soon' : status === 'beta' ? 'Try Beta' : 'Get Started'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;