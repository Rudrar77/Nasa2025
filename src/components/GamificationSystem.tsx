import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
  category: 'learning' | 'exploration' | 'interaction' | 'completion';
}

interface GameStats {
  totalScore: number;
  chaptersRead: number;
  quizzesCompleted: number;
  interactions: number;
  streakDays: number;
  achievements: Achievement[];
}

interface GamificationContextType {
  stats: GameStats;
  achievements: Achievement[];
  updateProgress: (action: string, value?: number) => void;
  unlockAchievement: (achievementId: string) => void;
  getAchievementProgress: (achievementId: string) => number;
  resetProgress: () => void;
}

const GamificationContext = createContext<GamificationContextType | null>(null);

const STORAGE_KEY = 'nasa2025_gamification';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first chapter',
    icon: '🚀',
    unlocked: false,
    category: 'learning'
  },
  {
    id: 'solar_explorer',
    title: 'Solar Explorer',
    description: 'Read 5 chapters about solar activity',
    icon: '☀️',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'exploration'
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Complete 10 quizzes',
    icon: '🧠',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    category: 'learning'
  },
  {
    id: 'interactive_learner',
    title: 'Interactive Learner',
    description: 'Interact with 20 different components',
    icon: '🎯',
    unlocked: false,
    progress: 0,
    maxProgress: 20,
    category: 'interaction'
  },
  {
    id: 'space_enthusiast',
    title: 'Space Enthusiast',
    description: 'Spend 30 minutes learning',
    icon: '⭐',
    unlocked: false,
    progress: 0,
    maxProgress: 30,
    category: 'completion'
  },
  {
    id: 'solar_system_expert',
    title: 'Solar System Expert',
    description: 'Explore all planets in the 3D solar system',
    icon: '🪐',
    unlocked: false,
    progress: 0,
    maxProgress: 8,
    category: 'exploration'
  },
  {
    id: 'flare_hunter',
    title: 'Flare Hunter',
    description: 'Learn about 5 different types of solar flares',
    icon: '⚡',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'learning'
  },
  {
    id: 'daily_learner',
    title: 'Daily Learner',
    description: 'Learn for 7 consecutive days',
    icon: '📅',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    category: 'completion'
  }
];

interface GamificationProviderProps {
  children: React.ReactNode;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({ children }) => {
  const [stats, setStats] = useState<GameStats>({
    totalScore: 0,
    chaptersRead: 0,
    quizzesCompleted: 0,
    interactions: 0,
    streakDays: 0,
    achievements: INITIAL_ACHIEVEMENTS
  });

  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedStats = JSON.parse(saved);
        setStats({
          ...parsedStats,
          achievements: parsedStats.achievements.map((ach: any) => ({
            ...ach,
            unlockedAt: ach.unlockedAt ? new Date(ach.unlockedAt) : undefined
          }))
        });
      } catch (error) {
        console.error('Failed to load gamification data:', error);
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const updateProgress = (action: string, value: number = 1) => {
    setStats(prevStats => {
      const newStats = { ...prevStats };

      switch (action) {
        case 'chapter_read':
          newStats.chaptersRead += value;
          newStats.totalScore += 10 * value;
          break;
        case 'quiz_complete':
          newStats.quizzesCompleted += value;
          newStats.totalScore += 25 * value;
          break;
        case 'interaction':
          newStats.interactions += value;
          newStats.totalScore += 5 * value;
          break;
        case 'time_spent':
          newStats.totalScore += Math.floor(value / 60); // 1 point per minute
          break;
        case 'planet_explored':
          newStats.totalScore += 15 * value;
          break;
        case 'flare_learned':
          newStats.totalScore += 20 * value;
          break;
      }

      // Check for achievement unlocks
      newStats.achievements = newStats.achievements.map(achievement => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;
        let newProgress = achievement.progress || 0;

        switch (achievement.id) {
          case 'first_steps':
            shouldUnlock = newStats.chaptersRead >= 1;
            break;
          case 'solar_explorer':
            newProgress = Math.min(newStats.chaptersRead, achievement.maxProgress || 5);
            shouldUnlock = newProgress >= (achievement.maxProgress || 5);
            break;
          case 'quiz_master':
            newProgress = Math.min(newStats.quizzesCompleted, achievement.maxProgress || 10);
            shouldUnlock = newProgress >= (achievement.maxProgress || 10);
            break;
          case 'interactive_learner':
            newProgress = Math.min(newStats.interactions, achievement.maxProgress || 20);
            shouldUnlock = newProgress >= (achievement.maxProgress || 20);
            break;
          case 'space_enthusiast':
            // This would need time tracking implementation
            shouldUnlock = newStats.totalScore >= 100;
            break;
          case 'solar_system_expert':
            // This would need planet exploration tracking
            shouldUnlock = newStats.totalScore >= 200;
            break;
          case 'flare_hunter':
            // This would need flare learning tracking
            shouldUnlock = newStats.totalScore >= 150;
            break;
          case 'daily_learner':
            // This would need daily streak tracking
            shouldUnlock = newStats.streakDays >= 7;
            break;
        }

        if (shouldUnlock && !achievement.unlocked) {
          const unlockedAchievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date(),
            progress: achievement.maxProgress
          };
          setTimeout(() => setShowAchievement(unlockedAchievement), 500);
          return unlockedAchievement;
        }

        return { ...achievement, progress: newProgress };
      });

      return newStats;
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setStats(prevStats => ({
      ...prevStats,
      achievements: prevStats.achievements.map(ach =>
        ach.id === achievementId
          ? { ...ach, unlocked: true, unlockedAt: new Date() }
          : ach
      )
    }));

    const achievement = stats.achievements.find(a => a.id === achievementId);
    if (achievement) {
      setShowAchievement({ ...achievement, unlocked: true, unlockedAt: new Date() });
    }
  };

  const getAchievementProgress = (achievementId: string) => {
    const achievement = stats.achievements.find(a => a.id === achievementId);
    return achievement?.progress || 0;
  };

  const resetProgress = () => {
    setStats({
      totalScore: 0,
      chaptersRead: 0,
      quizzesCompleted: 0,
      interactions: 0,
      streakDays: 0,
      achievements: INITIAL_ACHIEVEMENTS
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  const contextValue: GamificationContextType = {
    stats,
    achievements: stats.achievements,
    updateProgress,
    unlockAchievement,
    getAchievementProgress,
    resetProgress
  };

  return (
    <GamificationContext.Provider value={contextValue}>
      {children}
      <AchievementNotification achievement={showAchievement} onClose={() => setShowAchievement(null)} />
      <GamificationDashboard />
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// Achievement notification component
const AchievementNotification: React.FC<{
  achievement: Achievement | null;
  onClose: () => void;
}> = ({ achievement, onClose }) => {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Achievement Unlocked!</h3>
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm opacity-90">{achievement.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 text-xl"
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Gamification dashboard component
const GamificationDashboard: React.FC = () => {
  const { stats, achievements } = useGamification();
  const [isOpen, setIsOpen] = useState(false);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;

  return (
    <>
      {/* Floating achievement button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open achievements dashboard"
      >
        <div className="relative">
          <span className="text-xl">🏆</span>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unlockedCount}
          </div>
        </div>
      </motion.button>

      {/* Dashboard modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    aria-label="Close dashboard"
                  >
                    ×
                  </button>
                </div>

                {/* Stats overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{stats.totalScore}</div>
                    <div className="text-sm text-gray-600">Total Score</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.chaptersRead}</div>
                    <div className="text-sm text-gray-600">Chapters Read</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.quizzesCompleted}</div>
                    <div className="text-sm text-gray-600">Quizzes Done</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{unlockedCount}/{totalAchievements}</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>

                {/* Achievements list */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                  <div className="grid gap-3">
                    {achievements.map(achievement => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          achievement.unlocked
                            ? 'border-orange-300 bg-orange-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold ${achievement.unlocked ? 'text-orange-800' : 'text-gray-600'}`}>
                              {achievement.title}
                            </h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            {achievement.maxProgress && (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Progress</span>
                                  <span>{achievement.progress || 0}/{achievement.maxProgress}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%`
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          {achievement.unlocked && (
                            <div className="text-green-500 text-xl">✓</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Progress tracking hook
export const useProgressTracker = () => {
  const { updateProgress } = useGamification();
  const [sessionStart] = useState(Date.now());

  useEffect(() => {
    const handleBeforeUnload = () => {
      const sessionTime = Math.floor((Date.now() - sessionStart) / 1000 / 60); // minutes
      if (sessionTime > 0) {
        updateProgress('time_spent', sessionTime);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [sessionStart, updateProgress]);

  return {
    trackChapterRead: () => updateProgress('chapter_read'),
    trackQuizComplete: () => updateProgress('quiz_complete'),
    trackInteraction: () => updateProgress('interaction'),
    trackPlanetExplored: () => updateProgress('planet_explored'),
    trackFlareLearned: () => updateProgress('flare_learned')
  };
};

export default {
  GamificationProvider,
  useGamification,
  useProgressTracker
};