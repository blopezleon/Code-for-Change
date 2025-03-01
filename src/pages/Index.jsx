
import { useState } from "react";
import AudioRecorder from "@/components/AudioRecorder";
import TranscriptionDisplay from "@/components/TranscriptionDisplay";
import RecommendationPanel from "@/components/RecommendationPanel";

const Index = () => {
  const [transcription, setTranscription] = useState("");
  const [isTranscriptionProcessed, setIsTranscriptionProcessed] = useState(false);

  const handleTranscriptionReceived = (text) => {
    setTranscription(text);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
            Audio Scribe
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Record your voice, get instant transcriptions and personalized recommendations.
          </p>
        </header>

        {/* Main Content */}
        <main className="grid gap-8">
          {/* Audio Recorder Section */}
          <section>
            <AudioRecorder onTranscriptionReceived={handleTranscriptionReceived} />
          </section>

          {/* Results Section */}
          <section className="grid md:grid-cols-2 gap-6">
            <TranscriptionDisplay 
              text={transcription} 
              onProcessed={setIsTranscriptionProcessed} 
            />
            <RecommendationPanel 
              transcription={transcription} 
              isReady={isTranscriptionProcessed} 
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground mt-12 animate-fade-in">
          <p>© {new Date().getFullYear()} Audio Scribe. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
