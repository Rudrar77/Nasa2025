import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ScrollNavProps {
  sections: Section[];
}

const ScrollNav: React.FC<ScrollNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button when user scrolls down a bit
      setShowScrollTop(window.scrollY > 500);

      // Determine which section is currently in view
      const currentPosition = window.scrollY + 200;
      let found = false;

      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPosition >= offsetTop &&
            currentPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            found = true;
          }
        }
      });

      if (!found && sections.length > 0) {
        // If no section is in view, it's likely we're at the top
        setActiveSection(sections[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex fixed right-10 top-1/2 transform -translate-y-1/2 z-20 flex-col gap-2"
      >
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`p-2 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-black/30 hover:bg-black/50 text-gray-300'
            }`}
            title={section.label}
          >
            {section.icon}
          </button>
        ))}
      </motion.div>

      {/* Mobile navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex items-center gap-1 p-1 bg-black/60 backdrop-blur-md rounded-full border border-gray-700/50">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`p-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-300'
              }`}
              title={section.label}
            >
              {section.icon}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        className={`fixed bottom-5 right-5 p-3 rounded-full bg-primary text-primary-foreground z-20 shadow-lg transition-all duration-300 ${
          !showScrollTop && 'pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </>
  );
};

export default ScrollNav;