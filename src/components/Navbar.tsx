import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Rocket, Sun, Home as HomeIcon, Brain, Gamepad2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkipLink, AccessibleButton } from "./AccessibilityEnhancer";
import { useTranslation } from "./MultiLanguageSupport";

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
        isActive ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground hover:bg-accent"
      )
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <>
      <SkipLink href="#main-content">{t('a11y.skip_to_content')}</SkipLink>

      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md">
            <Sun className="h-6 w-6 text-primary" />
            <span className="font-semibold tracking-tight text-lg">Space Weather Explorer</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2" role="navigation" aria-label="Main navigation">
            <NavItem to="/">
              <span className="inline-flex items-center gap-2"><HomeIcon className="h-4 w-4" /> {t('nav.home')}</span>
            </NavItem>
            <NavItem to="/space-weather">
              <span className="inline-flex items-center gap-2"><Sun className="h-4 w-4" /> {t('nav.space_weather')}</span>
            </NavItem>
            <NavItem to="/story">
              {t('nav.story')}
            </NavItem>
            <NavItem to="/quiz">
              <span className="inline-flex items-center gap-2"><Brain className="h-4 w-4" /> {t('nav.quiz')}</span>
            </NavItem>
            <NavItem to="/solar-flare">
              <span className="inline-flex items-center gap-2"><Gamepad2 className="h-4 w-4" /> {t('nav.solar_flare')}</span>
            </NavItem>
            <NavItem to="/about">
              {t('nav.about')}
            </NavItem>
          </nav>

          {/* Accessibility Controls */}
          <div className="hidden md:flex items-center gap-3">
            <AccessibleButton
              className="p-2 hover:bg-accent rounded-md"
              aria-label="Settings"
              onClick={() => {/* Open settings modal */}}
            >
              <Settings className="h-4 w-4" />
            </AccessibleButton>
          </div>

          <div className="md:hidden">
            <AccessibleButton
              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-accent"
            >
              <Link to="/adventure" className="flex items-center gap-2">
                <Rocket className="h-4 w-4" /> {t('nav.start')}
              </Link>
            </AccessibleButton>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;


