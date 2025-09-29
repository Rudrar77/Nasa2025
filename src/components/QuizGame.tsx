import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Star, Award, Timer } from 'lucide-react';
import { getQuestionsByDifficulty, QuizDifficulty } from '@/lib/quizQuestions';

interface QuizGameProps {
  onComplete?: (score: number) => void;
  numQuestions?: number;
  difficulty?: QuizDifficulty;
}

const QuizGame = ({ onComplete, numQuestions = 20, difficulty = 'teen' }: QuizGameProps) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(difficulty === 'kids' ? 45 : difficulty === 'junior' ? 35 : 30); // Adjust time based on difficulty
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    // Get questions based on difficulty level
    const questionsForDifficulty = getQuestionsByDifficulty(difficulty);
    
    // Randomly select questions
    const shuffled = [...questionsForDifficulty].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, numQuestions));
  }, [numQuestions, difficulty]);

  useEffect(() => {
    if (!showResult && !showExplanation && selectedQuestions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [current, showResult, showExplanation, selectedQuestions.length]);

  const handleTimeout = () => {
    setShowExplanation(true);
    setSelectedAnswer(null);
  };

  const handleAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    if (idx === selectedQuestions[current].answer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
    
    if (current < selectedQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  const resetQuiz = () => {
    const questionsForDifficulty = getQuestionsByDifficulty(difficulty);
    const shuffled = [...questionsForDifficulty].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, numQuestions));
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(difficulty === 'kids' ? 45 : difficulty === 'junior' ? 35 : 30);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  if (selectedQuestions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  const currentQuestion = selectedQuestions[current];
  const progress = (current / selectedQuestions.length) * 100;

  return (
    <motion.div 
      className="min-h-[500px] bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {!showResult ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Timer className="w-4 h-4 mr-2" />
                {timeLeft}s
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Score: {score}
              </Badge>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <div className="text-sm text-muted-foreground text-center">
                Question {current + 1} of {selectedQuestions.length}
              </div>
            </div>

            {/* Question */}
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold">{currentQuestion.question}</h3>
              
              <div className="grid gap-3">
                {currentQuestion.options.map((opt, idx) => (
                  <Button
                    key={idx}
                    onClick={() => !showExplanation && handleAnswer(idx)}
                    disabled={showExplanation}
                    variant={showExplanation 
                      ? idx === currentQuestion.answer 
                        ? "default"
                        : idx === selectedAnswer
                          ? "destructive"
                          : "outline"
                      : "outline"
                    }
                    className={`w-full py-6 text-lg relative ${
                      showExplanation && idx === currentQuestion.answer
                        ? "border-primary bg-primary/20"
                        : ""
                    }`}
                  >
                    {opt}
                    {showExplanation && idx === currentQuestion.answer && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2"
                      >
                        <Badge variant="default" className="bg-primary">
                          <Award className="w-4 h-4" />
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                ))}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t pt-4 mt-4"
                  >
                    <p className="text-muted-foreground">
                      {currentQuestion.explanation}
                    </p>
                    <Button
                      onClick={handleNext}
                      className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80"
                    >
                      {current === selectedQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="mb-8">
            <h4 className="text-3xl font-bold mb-2">Quiz Complete! 🎉</h4>
            <p className="text-xl text-muted-foreground">
              You scored <span className="text-primary font-bold">{score}</span> out of {selectedQuestions.length}
            </p>
          </div>

          <div className="grid gap-4">
            <Card className="p-6">
              <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {Math.round((score / selectedQuestions.length) * 100)}%
              </div>
              <p className="text-muted-foreground">
                {score === selectedQuestions.length
                  ? difficulty === 'kids'
                    ? "WOW! Perfect Score! You're a Space Super Star! 🌟"
                    : difficulty === 'junior'
                    ? "Amazing! Perfect Score! You're a Space Weather Expert! 🌟"
                    : "Perfect Score! You're a Space Weather Master! 🌟"
                  : score >= selectedQuestions.length * 0.8
                  ? difficulty === 'kids'
                    ? "Great job! You know so much about space! ⭐"
                    : difficulty === 'junior'
                    ? "Great job! You really know your space weather! ⭐"
                    : "Great job! You have excellent space weather knowledge! ⭐"
                  : score >= selectedQuestions.length * 0.6
                  ? difficulty === 'kids'
                    ? "Good work! Keep learning about our amazing space! 🌎"
                    : difficulty === 'junior'
                    ? "Good effort! Keep exploring space weather! 🌎"
                    : "Good effort! Keep studying space weather phenomena! 🌎"
                  : difficulty === 'kids'
                    ? "Keep trying! Space is fun to learn about! 🚀"
                    : difficulty === 'junior'
                    ? "Keep exploring! You'll become a space expert soon! 🚀"
                    : "Keep exploring space weather! You'll get better! 🚀"}
              </p>
            </Card>

            <Button 
              onClick={resetQuiz}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary/80"
            >
              Try Again
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizGame;
