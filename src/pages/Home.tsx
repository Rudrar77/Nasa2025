import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlobeIcon, Rocket, BrainCircuit } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import TTSControls from '../components/TTSControls';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Space Weather Explorer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the fascinating world of solar phenomena and their impact on Earth through interactive visualizations and educational content.
        </p>
        <div className="mt-4">
          <TTSControls 
            text="Welcome to Space Weather Explorer. Discover the fascinating world of solar phenomena and their impact on Earth through interactive visualizations and educational content."
            label="Listen to introduction"
            isChildFriendly={true}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 3D Solar System */}
        <Card className="bg-glass/20 backdrop-blur-md border-glass hover:border-glass-hover transition-all">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <GlobeIcon className="w-6 h-6 text-blue-400" />
            </div>
            <CardTitle>3D Solar System</CardTitle>
            <CardDescription>Explore an interactive 3D model of our solar system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Navigate through planets, observe their orbits, and learn about their unique characteristics.
            </p>
            <div className="mt-2">
              <TTSControls 
                text="Explore an interactive 3D model of our solar system. Navigate through planets, observe their orbits, and learn about their unique characteristics."
                label="Listen"
                isChildFriendly={true}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/solar-system" className="w-full">
              <Button variant="default" className="w-full">Explore Solar System</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Solar Flare Defense */}
        <Card className="bg-glass/20 backdrop-blur-md border-glass hover:border-glass-hover transition-all">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-amber-400" />
            </div>
            <CardTitle>Solar Flare Defense</CardTitle>
            <CardDescription>Protect Earth from incoming solar storms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Deploy satellites and shields to protect Earth's atmosphere from damaging solar flares.
            </p>
            <div className="mt-2">
              <TTSControls 
                text="Protect Earth from incoming solar storms. Deploy satellites and shields to protect Earth's atmosphere from damaging solar flares."
                label="Listen"
                isChildFriendly={true}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/solar-flare" className="w-full">
              <Button variant="default" className="w-full">Start Defense</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Space Quiz */}
        <Card className="bg-glass/20 backdrop-blur-md border-glass hover:border-glass-hover transition-all">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <BrainCircuit className="w-6 h-6 text-green-400" />
            </div>
            <CardTitle>Space Quiz</CardTitle>
            <CardDescription>Test your knowledge of space weather</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Challenge yourself with quizzes about solar flares, CMEs, and their effects on Earth.
            </p>
            <div className="mt-2">
              <TTSControls 
                text="Test your knowledge of space weather. Challenge yourself with quizzes about solar flares, CMEs, and their effects on Earth."
                label="Listen"
                isChildFriendly={true}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/quiz" className="w-full">
              <Button variant="default" className="w-full">Take Quiz</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* 75 Chapter Adventure - Featured Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10"
      >
        <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md border-glass hover:border-glass-hover transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl md:text-3xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">75 Chapter Adventure</CardTitle>
            <CardDescription className="text-lg">Take an educational journey through space weather phenomena</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Embark on a comprehensive educational journey through 75 interactive chapters about solar events and their effects on our planet.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-blue-500/20 px-4 py-2 rounded-lg">
                    <div className="text-lg font-bold">75</div>
                    <div className="text-xs text-muted-foreground">Learning Chapters</div>
                  </div>
                  <div className="bg-orange-500/20 px-4 py-2 rounded-lg">
                    <div className="text-lg font-bold">15+</div>
                    <div className="text-xs text-muted-foreground">Animations</div>
                  </div>
                  <div className="bg-purple-500/20 px-4 py-2 rounded-lg">
                    <div className="text-lg font-bold">30+</div>
                    <div className="text-xs text-muted-foreground">Interactions</div>
                  </div>
                </div>
                <div className="mt-2">
                  <TTSControls 
                    text="Start the 75 Chapter Adventure. Embark on a comprehensive educational journey through 75 interactive chapters about solar events and their effects on our planet."
                    label="Listen"
                    isChildFriendly={true}
                  />
                </div>
              </div>
              <Link to="/adventure" className="w-full md:w-auto">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-8 text-lg"
                >
                  Start 75 Chapter Adventure
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Home;