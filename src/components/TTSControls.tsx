import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import useTTS from '@/hooks/useTTS';

interface TTSControlsProps {
  text: string;
  label?: string;
  className?: string;
  isChildFriendly?: boolean;
  addPauses?: boolean;
  customRate?: number;
  customPitch?: number;
}

const TTSControls: React.FC<TTSControlsProps> = ({ 
  text, 
  label = "Listen to this section", 
  className = "",
  isChildFriendly = true,
  addPauses = true,
  customRate,
  customPitch
}) => {
  const { speak, stop, speaking, supported, voices, findBestChildFriendlyVoice } = useTTS();
  const [isPlaying, setIsPlaying] = useState(false);
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    setIsPlaying(speaking);
  }, [speaking]);

  const handleTogglePlayback = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      // Get the best child-friendly voice if needed
      const voice = isChildFriendly ? findBestChildFriendlyVoice() : null;
      
      speak(textRef.current, {
        rate: customRate || (isChildFriendly ? 0.85 : 0.9), // Slower for kids
        pitch: customPitch || (isChildFriendly ? 1.05 : 1), // Slightly higher pitch for children
        voice: voice,
        isChildFriendly: isChildFriendly,
        addPauses: addPauses,
        volume: 1
      });
      setIsPlaying(true);
    }
  };

  if (!supported) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10"
        onClick={handleTogglePlayback}
        aria-label={isPlaying ? "Stop narration" : "Start narration"}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4" />
            <span>Stop Narration</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span>{label}</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default TTSControls;