import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} Space Weather Explorer
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/story" className="hover:text-foreground">Stories</Link>
          <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noreferrer" className="hover:text-foreground">NOAA SWPC</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;


