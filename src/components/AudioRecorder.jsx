
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AudioRecorder = ({ onTranscriptionReceived }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcesing, setIsProcessing] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [visualizerBars, setVisualizerBars] = useState(Array(20).fill(1));
  
  const animationRef = useRef(null);
  
  useEffect(() => {
    // Cleanup animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  const updateVisualizer = () => {
    if (!isRecording) return;
    
    const newBars = visualizerBars.map(() => Math.random() * 0.8 + 0.2);
    setVisualizerBars(newBars);
    animationRef.current = requestAnimationFrame(updateVisualizer);
  };
  
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        processAudio(audioBlob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start visualizer animation
      animationRef.current = requestAnimationFrame(updateVisualizer);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Microphone access is required to record audio.",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      // Stop visualizer animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      toast({
        title: "Recording stopped",
        description: "Processing your audio...",
      });
    }
  };
  
  const processAudio = async (audioBlob) => {
    setIsProcessing(true);
    
    // Simulating processing time
    setTimeout(() => {
      // In a real implementation, you would send the audio to a speech-to-text service
      // For demo purposes, we'll use a placeholder text
      const transcription = "This is a simulated transcription of your audio recording. In a real implementation, this would be the result from a speech-to-text service processing your recorded audio.";
      onTranscriptionReceived(transcription);
      setIsProcessing(false);
      
      toast({
        title: "Transcription complete",
        description: "Your audio has been processed successfully.",
      });
    }, 2000);
  };
  
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div 
            className={`absolute inset-0 rounded-full ${isRecording ? 'bg-destructive/20 animate-pulse-recording' : 'bg-secondary'}`}
          />
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="icon"
            className={`w-20 h-20 rounded-full shadow-lg transition-all duration-300 ${isRecording ? 'scale-95' : 'hover:scale-105'}`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcesing}
          >
            {isProcesing ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : isRecording ? (
              <Square className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
        </div>
        
        {isRecording && (
          <div className="audio-visualizer mt-4 animate-fade-in">
            {visualizerBars.map((height, index) => (
              <div 
                key={index}
                className="bar animate-wave" 
                style={{ 
                  height: `${height * 30}px`,
                  animationDelay: `${index * 0.05}s`
                }}
              />
            ))}
          </div>
        )}
        
        <p className="text-sm text-muted-foreground text-center">
          {isRecording ? 'Recording in progress...' : isProcesing ? 'Processing audio...' : 'Click to start recording'}
        </p>
      </div>
    </div>
  );
};

export default AudioRecorder;
