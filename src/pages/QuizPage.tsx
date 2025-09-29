import { useState } from "react";
import QuizGame from "@/components/QuizGame";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, Stars, RocketIcon, GraduationCap } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { QuizDifficulty } from "@/lib/quizQuestions";

const QuizPage = () => {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('teen');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6"
    >
      <div className="container max-w-4xl mx-auto space-y-6">
        <PageHeader 
          title="Space Weather Quiz" 
          subtitle="Test your knowledge about space weather, solar activity, and their impacts on Earth."
        />
        
        <Card className="backdrop-blur-md bg-white/80">
          <CardHeader>
            <CardTitle>Choose Your Age Group</CardTitle>
            <CardDescription>
              Select the option that's right for you!
            </CardDescription>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button 
                variant={difficulty === 'kids' ? "default" : "outline"} 
                onClick={() => setDifficulty('kids')}
                className="flex items-center gap-2 flex-1"
              >
                <Stars className="w-4 h-4" />
                Kids (Ages 5-8)
              </Button>
              <Button 
                variant={difficulty === 'junior' ? "default" : "outline"} 
                onClick={() => setDifficulty('junior')}
                className="flex items-center gap-2 flex-1"
              >
                <RocketIcon className="w-4 h-4" />
                Junior (Ages 9-12)
              </Button>
              <Button 
                variant={difficulty === 'teen' ? "default" : "outline"} 
                onClick={() => setDifficulty('teen')}
                className="flex items-center gap-2 flex-1"
              >
                <GraduationCap className="w-4 h-4" />
                Teen+ (Ages 13+)
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <QuizGame difficulty={difficulty} />
          </CardContent>
        </Card>

        <Card className="p-4 backdrop-blur-md bg-white/80">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Ready for Action?</h3>
              <p className="text-sm text-muted-foreground">
                Put your knowledge to the test in our interactive Solar Flare Defense game!
              </p>
            </div>
            <Button asChild>
              <Link to="/solar-flare" className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" /> Play Now
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default QuizPage;
