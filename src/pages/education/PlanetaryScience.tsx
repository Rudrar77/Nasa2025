import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const PlanetaryScience = () => {
  const [selectedPlanet, setSelectedPlanet] = useState('earth');

  const planets = [
    {
      id: 'earth',
      name: 'Earth',
      type: 'Terrestrial',
      diameter: '12,742 km',
      atmosphere: 'Nitrogen, Oxygen',
      features: ['Liquid water', 'Active geology', 'Magnetic field', 'Life']
    },
    {
      id: 'mars',
      name: 'Mars',
      type: 'Terrestrial',
      diameter: '6,779 km',
      atmosphere: 'Carbon dioxide',
      features: ['Polar ice caps', 'Largest volcano', 'Ancient riverbeds', 'Dust storms']
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      type: 'Gas Giant',
      diameter: '139,820 km',
      atmosphere: 'Hydrogen, Helium',
      features: ['Great Red Spot', '79+ moons', 'Ring system', 'Radiation belts']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/education" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Education Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">🪐 Planetary Science</h1>
          <p className="text-xl text-gray-300 mb-6">
            Explore the formation, composition, and characteristics of planets
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {planets.map((planet) => (
            <Card 
              key={planet.id} 
              className={`bg-gray-800 border-gray-700 cursor-pointer transition-all ${
                selectedPlanet === planet.id ? 'ring-2 ring-blue-500' : 'hover:border-gray-600'
              }`}
              onClick={() => setSelectedPlanet(planet.id)}
            >
              <CardHeader>
                <CardTitle>{planet.name}</CardTitle>
                <Badge variant="secondary">{planet.type}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Diameter:</strong> {planet.diameter}</p>
                  <p><strong>Atmosphere:</strong> {planet.atmosphere}</p>
                  <div>
                    <strong>Key Features:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {planet.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-300">{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanetaryScience;