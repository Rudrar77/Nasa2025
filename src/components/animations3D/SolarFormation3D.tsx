import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

interface SolarFormation3DProps {
  className?: string;
}

// This is a fallback version that doesn't use Three.js or postprocessing
const SolarFormation3D: React.FC<SolarFormation3DProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-96 ${className}`}>
      <ErrorBoundary fallback={
        <div className="w-full h-96 flex items-center justify-center bg-gray-900 text-white rounded-lg">
          <div className="text-center p-4">
            <h3 className="text-xl font-bold mb-2">3D Visualization Unavailable</h3>
            <p className="mb-2">We're having trouble rendering the solar formation visualization.</p>
            <p className="text-sm text-gray-400">Try refreshing the page or using a different browser.</p>
          </div>
        </div>
      }>
        <div className="w-full h-full bg-gradient-to-b from-black to-indigo-950 rounded-lg overflow-hidden">
          {/* Sun visualization using CSS - moved to left side of the screen */}
          <div className="absolute top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2">
            {/* Sun core */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-yellow-300 animate-pulse opacity-70"></div>
              <div className="h-64 w-64 rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 shadow-2xl shadow-orange-500/50 z-10 relative">
                {/* Sunspots */}
                <div className="absolute top-1/4 left-1/4 h-6 w-10 rounded-full bg-orange-900 opacity-80 rotate-45"></div>
                <div className="absolute bottom-1/3 right-1/4 h-5 w-8 rounded-full bg-orange-900 opacity-70"></div>
                
                {/* Solar flares */}
                <div className="absolute -top-8 -left-8 h-16 w-16 bg-yellow-500 blur-md animate-pulse"></div>
                <div className="absolute -bottom-10 -right-6 h-20 w-20 bg-red-500 blur-md animate-pulse"></div>
                <div className="absolute -top-6 right-0 h-14 w-24 bg-orange-500 blur-md animate-pulse"></div>
              </div>
            </div>
            
            {/* Corona effect */}
            <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-xl transform scale-[1.6]"></div>
            <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-xl transform scale-[2]"></div>
            <div className="absolute inset-0 rounded-full bg-orange-600/10 blur-xl transform scale-[2.5]"></div>
          </div>
          
          {/* Stars - reduced opacity and number for better visibility */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  opacity: Math.random() * 0.4 + 0.2, // Reduced opacity
                  animation: `twinkle ${Math.random() * 5 + 2}s infinite`
                }}
              ></div>
            ))}
          </div>
          
          {/* Data points - positioned to avoid overlapping the sun */}
          <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-yellow-500/50 text-white text-sm shadow-lg w-56">
            <div className="font-bold text-yellow-400 mb-2">Solar Formation</div>
            <p className="text-gray-300 text-sm">
              Our Sun formed about 4.6 billion years ago from a cloud of gas and dust in our galaxy.
              The gravitational collapse of this cloud led to the formation of a hot, dense core that
              eventually became our Sun.
            </p>
          </div>
          
          <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md p-2 rounded-lg border border-yellow-500/50 text-white text-xs shadow-lg w-48">
            <div className="font-bold text-yellow-400 mb-1">Surface Temperature</div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-mono text-sm">5,778</span>
              <span className="text-yellow-300 text-xs">K</span>
            </div>
            <div className="text-gray-300 text-xs mt-1">
              The Sun's surface is nearly 6,000 Kelvin
            </div>
          </div>
          
          <div className="absolute top-40 right-6 bg-black/80 backdrop-blur-md p-2 rounded-lg border border-yellow-500/50 text-white text-xs shadow-lg w-48">
            <div className="font-bold text-yellow-400 mb-1">Core Temperature</div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-mono text-sm">15,000,000</span>
              <span className="text-yellow-300 text-xs">K</span>
            </div>
            <div className="text-gray-300 text-xs mt-1">
              The Sun's core is over 15 million Kelvin
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md p-2 rounded-lg border border-yellow-500/50 text-white text-xs shadow-lg w-48">
            <div className="font-bold text-yellow-400 mb-1">Energy Output</div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-mono text-sm">3.8×10²⁶</span>
              <span className="text-yellow-300 text-xs">watts</span>
            </div>
            <div className="text-gray-300 text-xs mt-1">
              Equivalent to billions of nuclear bombs per second
            </div>
          </div>
          
          {/* Legend - positioned at the bottom right corner */}
          <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-white/20">
            <div className="font-bold mb-1">Solar Features</div>
            <div className="grid grid-cols-1 gap-x-3 gap-y-1">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>Solar flare</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-900"></div>
                <span>Sunspot</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span>Corona</span>
              </div>
            </div>
          </div>
          
          {/* Temperature scale - positioned at the right side, away from the sun */}
          <div className="absolute right-60 h-40 w-6 top-[100px] flex flex-col items-center">
            <div className="text-xs text-white bg-black/40 p-1 rounded mb-2 font-semibold">Temperature</div>
            <div className="h-full w-2 bg-gradient-to-b from-yellow-300 via-orange-500 to-red-700 rounded relative">
              <div className="absolute -left-14 top-0 text-xs text-yellow-300">Core: 15M°K</div>
              <div className="absolute -left-14 top-1/3 text-xs text-orange-400">Mid: 7M°K</div>
              <div className="absolute -left-14 top-2/3 text-xs text-orange-500">Surface: 5,778°K</div>
            </div>
          </div>
        </div>
        
        {/* CSS animations are handled in global CSS */}
      </ErrorBoundary>
    </div>
  );
};

export default SolarFormation3D;
