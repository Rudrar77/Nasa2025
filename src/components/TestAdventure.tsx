import React from 'react';

const TestAdventure: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">🌟 Space Adventure Test 🌟</h1>
        <p className="text-xl mb-8">Testing if components are working correctly!</p>
        <div className="space-y-4">
          <div className="p-4 bg-blue-600 rounded-lg">
            <h2 className="text-lg font-semibold">Grade Selection</h2>
            <p>Choose your grade level to start the adventure!</p>
          </div>
          <div className="p-4 bg-green-600 rounded-lg">
            <h2 className="text-lg font-semibold">3D Solar System</h2>
            <p>Interactive 3D visualization based on your grade level</p>
          </div>
          <div className="p-4 bg-purple-600 rounded-lg">
            <h2 className="text-lg font-semibold">Games & Quizzes</h2>
            <p>Fun learning activities and challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAdventure;

