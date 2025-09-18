import { ReactNode } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryPageProps {
  title: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  pageNumber: number;
  totalPages: number;
}

const StoryPage = ({ 
  title, 
  image, 
  imageAlt, 
  children, 
  onNext, 
  onPrev, 
  isFirst, 
  isLast, 
  pageNumber, 
  totalPages 
}: StoryPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-space flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-card rounded-2xl shadow-cosmic p-8 backdrop-blur-sm border border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-solar bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            <div className="text-muted-foreground text-sm">
              Chapter {pageNumber} of {totalPages}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="order-1 md:order-1">
              <div className="relative overflow-hidden rounded-xl shadow-aurora">
                <img 
                  src={image} 
                  alt={imageAlt}
                  className="w-full h-auto animate-float"
                />
                <div className="absolute inset-0 bg-gradient-aurora opacity-10 pointer-events-none"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="order-2 md:order-2 space-y-4">
              <div className="prose prose-invert max-w-none">
                {children}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <Button
              onClick={onPrev}
              disabled={isFirst}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Progress Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index + 1 === pageNumber ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={onNext}
              disabled={isLast}
              size="lg"
              className="gap-2 bg-gradient-solar hover:shadow-solar"
            >
              {isLast ? 'Finish' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;