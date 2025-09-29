import React from 'react';

interface FallbackVisualizationProps {
  title: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
  color?: string; // gradient color theme
}

/**
 * A reliable fallback component for 3D visualizations that might fail
 */
const FallbackVisualization: React.FC<FallbackVisualizationProps> = ({
  title,
  description = "Interactive visualization",
  className = "",
  icon,
  color = "sun" // sun, earth, space, mars, jupiter
}) => {
  // Predefined gradient themes
  const gradients = {
    sun: "from-yellow-500 via-orange-600 to-red-700",
    earth: "from-blue-600 via-green-500 to-blue-900",
    space: "from-indigo-900 via-purple-800 to-black",
    mars: "from-red-800 via-red-600 to-yellow-800",
    jupiter: "from-orange-700 via-red-800 to-yellow-900",
  };

  const gradientClass = gradients[color] || gradients.space;

  return (
    <div className={`w-full h-full rounded-lg overflow-hidden ${className}`}>
      <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center p-6`}>
        <div className="text-center">
          {icon || (
            <div className="relative w-24 h-24 mx-auto mb-4">
              {color === "sun" && (
                <>
                  <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-yellow-500 rounded-full"></div>
                  <div className="absolute inset-4 bg-orange-500 rounded-full"></div>
                  <div className="absolute inset-6 bg-red-600 rounded-full"></div>
                  <div className="absolute inset-8 bg-red-700 rounded-full"></div>
                </>
              )}
              {color === "earth" && (
                <>
                  <div className="absolute inset-0 bg-blue-700 rounded-full"></div>
                  <div className="absolute inset-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute inset-4 bg-green-600 rounded-full"></div>
                  <div className="absolute inset-6 bg-blue-400 rounded-full"></div>
                  <div className="absolute inset-8 bg-white rounded-full"></div>
                </>
              )}
              {color === "space" && (
                <>
                  <div className="absolute inset-0 bg-purple-900 rounded-full"></div>
                  <div className="absolute inset-2 bg-indigo-800 rounded-full"></div>
                  <div className="absolute inset-4 bg-purple-700 rounded-full"></div>
                  <div className="absolute inset-6 bg-indigo-600 rounded-full"></div>
                  <div className="absolute w-1 h-1 bg-white rounded-full top-4 left-8"></div>
                  <div className="absolute w-1 h-1 bg-white rounded-full top-8 left-4"></div>
                  <div className="absolute w-1 h-1 bg-white rounded-full top-12 left-10"></div>
                </>
              )}
              {color === "mars" && (
                <>
                  <div className="absolute inset-0 bg-red-700 rounded-full"></div>
                  <div className="absolute inset-2 bg-red-600 rounded-full"></div>
                  <div className="absolute inset-4 bg-red-500 rounded-full"></div>
                  <div className="absolute inset-6 bg-yellow-800 rounded-full"></div>
                  <div className="absolute inset-8 bg-red-900 rounded-full"></div>
                </>
              )}
              {color === "jupiter" && (
                <>
                  <div className="absolute inset-0 bg-orange-600 rounded-full"></div>
                  <div className="absolute inset-2 bg-yellow-700 rounded-full"></div>
                  <div className="absolute inset-4 bg-red-700 rounded-full"></div>
                  <div className="absolute inset-6 bg-orange-800 rounded-full"></div>
                  <div className="absolute inset-8 bg-yellow-900 rounded-full"></div>
                </>
              )}
            </div>
          )}
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-100 text-sm mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FallbackVisualization;