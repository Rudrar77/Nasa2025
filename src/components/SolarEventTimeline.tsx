import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Sun, Zap, Flame, Wind, AlertTriangle } from 'lucide-react';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  severity: 'low' | 'medium' | 'high' | 'extreme';
}

const SolarEventTimeline: React.FC = () => {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  
  const events: TimelineEvent[] = [
    {
      id: 1,
      date: "July 14, 2000",
      title: "Bastille Day Solar Storm",
      description: "One of the most intense solar storms ever recorded, causing satellite damage and widespread aurora displays. The X5.7-class flare and associated CME led to a geomagnetic superstorm.",
      icon: <Zap className="w-5 h-5" />,
      severity: 'extreme',
    },
    {
      id: 2,
      date: "October 28, 2003",
      title: "Halloween Solar Storms",
      description: "A series of powerful X-class flares and CMEs caused extensive damage to satellites, knocked out power in parts of Europe, and created aurora visible as far south as Florida.",
      icon: <AlertTriangle className="w-5 h-5" />,
      severity: 'extreme',
    },
    {
      id: 3,
      date: "September 2, 2017",
      title: "X9.3 Solar Flare",
      description: "The strongest solar flare of solar cycle 24, causing radio blackouts across the sunlit side of Earth. The event was followed by a series of moderate to strong CMEs.",
      icon: <Flame className="w-5 h-5" />,
      severity: 'high',
    },
    {
      id: 4,
      date: "August 7, 1972",
      title: "Solar Flare of August 1972",
      description: "A major solar event that occurred between Apollo 16 and 17 missions. Had astronauts been in space during this event, they could have received lethal radiation doses.",
      icon: <Sun className="w-5 h-5" />,
      severity: 'high',
    },
    {
      id: 5,
      date: "March 13, 1989",
      title: "Quebec Blackout Storm",
      description: "A powerful geomagnetic storm caused by a CME that hit Earth's magnetosphere, causing a nine-hour power outage in Quebec, Canada, affecting six million people.",
      icon: <Wind className="w-5 h-5" />,
      severity: 'high',
    },
    {
      id: 6,
      date: "November 4, 2003",
      title: "X28+ Mega Flare",
      description: "Possibly the most powerful flare ever recorded, initially saturating GOES detectors. Fortunately, it occurred when the active region was already rotating away from Earth.",
      icon: <Flame className="w-5 h-5" />,
      severity: 'extreme',
    },
    {
      id: 7,
      date: "September 1-2, 1859",
      title: "Carrington Event",
      description: "The most powerful geomagnetic storm in recorded history. Telegraph systems failed and aurora was visible as far south as the Caribbean. A similar event today would cause catastrophic infrastructure damage.",
      icon: <AlertTriangle className="w-5 h-5" />,
      severity: 'extreme',
    },
    {
      id: 8,
      date: "January 23, 2012",
      title: "January 2012 Solar Storm",
      description: "A powerful M8.7 class flare and fast-moving CME. While not Earth-directed, it was notable for the spectacular imagery captured by NASA's Solar Dynamics Observatory.",
      icon: <Sun className="w-5 h-5" />,
      severity: 'medium',
    }
  ];

  const handleNext = () => {
    setActiveEventIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setActiveEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const activeEvent = events[activeEventIndex];
  
  const getSeverityColor = (severity: TimelineEvent['severity']) => {
    switch (severity) {
      case 'extreme': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getSeverityText = (severity: TimelineEvent['severity']) => {
    switch (severity) {
      case 'extreme': return 'Extreme Impact';
      case 'high': return 'High Impact';
      case 'medium': return 'Moderate Impact';
      case 'low': return 'Low Impact';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="bg-glass/20 backdrop-blur-md border-glass p-6 my-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
          Historic Solar Events Timeline
        </h2>
        <p className="text-muted-foreground mt-2">
          Explore major solar events that have impacted Earth throughout history
        </p>
      </div>
      
      {/* Display active event details - NO IMAGES */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex p-2 rounded-full bg-yellow-500/20">
              {activeEvent.icon}
            </span>
            <h3 className="text-xl font-bold">{activeEvent.title}</h3>
          </div>
          <span className={`px-3 py-1 text-xs rounded-full ${getSeverityColor(activeEvent.severity)} text-white`}>
            {getSeverityText(activeEvent.severity)}
          </span>
        </div>
        
        <div className="text-sm text-yellow-400 mb-2">{activeEvent.date}</div>
        
        <p className="text-gray-300 text-sm leading-relaxed">
          {activeEvent.description}
        </p>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePrev}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Event
        </Button>
        <Button 
          variant="outline"
          size="sm" 
          onClick={handleNext}
          className="flex items-center gap-1"
        >
          Next Event
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Timeline navigation */}
      <div className="mt-8 overflow-x-auto">
        <div className="flex gap-2 min-w-max p-2">
          {events.map((event, index) => (
            <button
              key={event.id}
              onClick={() => setActiveEventIndex(index)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                index === activeEventIndex
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted-foreground/10'
              }`}
            >
              {event.date.split(', ')[0]}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SolarEventTimeline;