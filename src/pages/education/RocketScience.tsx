import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const RocketScience = () => {
  const [completedSections, setCompletedSections] = useState<string[]>(['basics']);

  const sections = [
    {
      id: 'basics',
      title: 'Rocket Fundamentals',
      description: 'Basic principles of rocket propulsion',
      completed: true
    },
    {
      id: 'equation',
      title: 'Tsiolkovsky Rocket Equation',
      description: 'Mathematical foundation of rocketry',
      completed: false
    },
    {
      id: 'propulsion',
      title: 'Propulsion Systems',
      description: 'Chemical, electric, and nuclear propulsion',
      completed: false
    },
    {
      id: 'staging',
      title: 'Multi-Stage Rockets',
      description: 'Why rockets have multiple stages',
      completed: false
    }
  ];

  const progress = (completedSections.length / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/education" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Education Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">🚀 Rocket Science Basics</h1>
          <p className="text-xl text-gray-300 mb-6">
            Learn the fundamentals of rocket propulsion and spacecraft design
          </p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Course Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid gap-6">
          {sections.map((section) => (
            <Card key={section.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                  {section.completed && (
                    <Badge variant="secondary">✓ Completed</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {section.id === 'basics' && (
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Rockets work on Newton's third law of motion: for every action, there is an equal and opposite reaction. 
                      By expelling mass (propellant) at high velocity in one direction, the rocket gains momentum in the opposite direction.
                    </p>
                    
                    <div className="bg-blue-900 p-4 rounded">
                      <h4 className="font-semibold text-blue-300 mb-2">Key Principles:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Conservation of momentum</li>
                        <li>Specific impulse (efficiency measure)</li>
                        <li>Thrust-to-weight ratio</li>
                        <li>Delta-v (change in velocity capability)</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {section.id === 'equation' && (
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      The Tsiolkovsky rocket equation describes the relationship between a rocket's mass, 
                      exhaust velocity, and the velocity change it can achieve.
                    </p>
                    
                    <div className="bg-black p-4 rounded font-mono text-center text-lg">
                      Δv = v_e × ln(m₀/m₁)
                    </div>
                    
                    <p className="text-sm text-gray-400">
                      Where Δv is velocity change, v_e is exhaust velocity, m₀ is initial mass, m₁ is final mass
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RocketScience;