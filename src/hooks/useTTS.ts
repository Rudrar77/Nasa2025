import { useState, useEffect } from 'react';

interface TTSOptions {
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
  volume?: number;
  isChildFriendly?: boolean;
  addPauses?: boolean;
}

const useTTS = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      
      // Function to load voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
      
      // Load voices immediately if available
      loadVoices();
      
      // Listen for the voiceschanged event
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Find the best voice for children
  const findBestChildFriendlyVoice = () => {
    // Priority list for kid-friendly male voices
    const preferredVoices = [
      // Look for specific high-quality male voices
      voices.find(v => v.name === 'Google US English Male'),
      voices.find(v => v.name === 'Microsoft David - English (United States)'),
      voices.find(v => v.name.toLowerCase().includes('male') && v.lang.includes('en-US')),
      // Fallback to any Google or English voice
      voices.find(v => v.name.includes('Google') && v.lang.includes('en') && v.name.toLowerCase().includes('male')),
      voices.find(v => v.lang.includes('en-US') && v.name.toLowerCase().includes('male')),
      voices.find(v => v.lang.includes('en'))
    ];
    
    // Return the first available voice from our priority list
    return preferredVoices.find(v => v !== undefined) || null;
  };

  // Enhanced text processing for kid-friendly speech
  const processChildFriendlyText = (text: string) => {
    // Add strategic pauses with commas to improve comprehension
    return text
      // Add pauses at natural break points
      .replace(/\.\s+/g, '. , ') // Add pause after periods
      .replace(/!\s+/g, '! , ') // Add pause after exclamation marks
      .replace(/\?\s+/g, '? , ') // Add pause after question marks
      // Add emphasis to exciting words
      .replace(/amazing/gi, 'a-mazing')
      .replace(/incredible/gi, 'in-credible')
      .replace(/exciting/gi, 'ex-citing')
      // Add pauses around important cosmic objects for emphasis
      .replace(/Sun/g, ' , Sun , ')
      .replace(/Earth/g, ' , Earth , ')
      .replace(/solar flare/gi, ' , solar flare , ')
      .replace(/CME/g, ' , C M E , ');
  };

  const speak = (text: string, options: TTSOptions = {}) => {
    if (!supported) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Process text if kid-friendly option is enabled
    const processedText = options.isChildFriendly && options.addPauses 
      ? processChildFriendlyText(text)
      : text;
    
    const utterance = new SpeechSynthesisUtterance(processedText);
    
    // Set default options
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    
    // Set voice if specified or find the best one
    if (options.voice) {
      utterance.voice = options.voice;
    } else if (options.isChildFriendly) {
      utterance.voice = findBestChildFriendlyVoice();
    } else {
      // Try to find a good English voice
      const googleVoice = voices.find(voice => 
        voice.name.includes('Google') && voice.lang.includes('en')
      );
      
      const enVoice = voices.find(voice => voice.lang.includes('en'));
      
      utterance.voice = googleVoice || enVoice || null;
    }
    
    // Event handlers
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return {
    speak,
    stop,
    speaking,
    supported,
    voices,
    findBestChildFriendlyVoice,
  };
};

export default useTTS;