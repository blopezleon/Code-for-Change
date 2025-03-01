
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const TranscriptionDisplay = ({ text, onProcessed }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    if (!text) {
      setDisplayText('');
      onProcessed(false);
      return;
    }
    
    setIsTyping(true);
    let index = 0;
    setDisplayText('');
    
    // Simulate typing effect
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onProcessed(true); // Signal that processing is complete
      }
    }, 20); // Adjust typing speed here
    
    return () => clearInterval(interval);
  }, [text, onProcessed]);
  
  return (
    <Card className="w-full overflow-hidden animate-blur-in glass-morphism">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          Transcription 
          {isTyping && <Loader2 className="ml-2 h-3 w-3 animate-spin text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="min-h-40 max-h-60 overflow-y-auto">
          {displayText ? (
            <p className="text-sm text-foreground/90 leading-relaxed">
              {displayText}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Your transcription will appear here after recording.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptionDisplay;
