import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SpaceHistory = () => {
  const [selectedEra, setSelectedEra] = useState('space-race');

  const timeline = [
    {
      year: '1957',
      event: 'Sputnik 1',
      description: 'First artificial satellite launched by Soviet Union',
      era: 'early-space'
    },
    {
      year: '1961',
      event: 'Yuri Gagarin',
      description: 'First human in space',
      era: 'space-race'
    },
    {
      year: '1969',
      event: 'Apollo 11',
      description: 'First humans land on the Moon',
      era: 'space-race'
    },
    {
      year: '1981',
      event: 'Space Shuttle',
      description: 'First reusable spacecraft program begins',
      era: 'shuttle-era'
    },
    {
      year: '1998',
      event: 'ISS Construction',
      description: 'International Space Station assembly begins',
      era: 'modern-space'
    },
    {
      year: '2020',
      event: 'Commercial Crew',
      description: 'SpaceX Crew Dragon carries astronauts to ISS',
      era: 'commercial-space'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/education" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Education Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">📜 Space History Timeline</h1>
          <p className="text-xl text-gray-300 mb-6">
            Journey through the major milestones of space exploration
          </p>
        </div>

        <div className="space-y-6">
          {timeline.map((milestone, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{milestone.year} - {milestone.event}</CardTitle>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                  <Badge variant="outline">{milestone.era.replace('-', ' ')}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceHistory;