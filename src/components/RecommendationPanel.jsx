
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2 } from 'lucide-react';

const RecommendationPanel = ({ transcription, isReady }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!transcription || !isReady) {
      setRecommendations([]);
      return;
    }
    
    const generateRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would call an AI service to get recommendations
      // For demo purposes, we'll use placeholder recommendations
      const mockRecommendations = [
        "Consider expanding on the key points mentioned in your recording.",
        "Your audio could benefit from more specific examples to illustrate your ideas.",
        "The tone of your message is professional and clear, which works well for this context.",
        "You might want to consider structuring your content with a stronger introduction and conclusion.",
        "The pace of your speech is good - clear and easy to follow."
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    };
    
    generateRecommendations();
  }, [transcription, isReady]);
  
  return (
    <Card className="w-full overflow-hidden animate-blur-in glass-morphism">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <Lightbulb className="mr-2 h-4 w-4 text-primary" />
          Recommendations
          {isLoading && <Loader2 className="ml-2 h-3 w-3 animate-spin text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="min-h-40 max-h-60 overflow-y-auto">
          {recommendations.length > 0 ? (
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li 
                  key={index}
                  className="text-sm bg-secondary/40 rounded-md p-3 backdrop-blur-sm"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'fade-in 0.5s ease-out forwards'
                  }}
                >
                  {recommendation}
                </li>
              ))}
            </ul>
          ) : isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic text-center h-40 flex items-center justify-center">
              Recommendations will appear here after processing your transcription.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationPanel;
