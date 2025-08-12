import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-primary shadow-glow" aria-hidden />
          <span className="text-sm font-semibold tracking-wide text-gradient-primary">
            Smart Local Product Promoter
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/create" className={navLinkClass}>
            Create
          </NavLink>
          <NavLink to="/history" className={navLinkClass}>
            History
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </div>

        <div className="hidden md:block">
          <Button asChild variant="hero" size="sm">
            <Link to="/create">Get Started</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-md border hover-scale"
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t">
          <div className="container py-2 flex flex-col gap-1 animate-fade-in">
            <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/create" onClick={() => setOpen(false)} className={navLinkClass}>
              Create
            </NavLink>
            <NavLink to="/history" onClick={() => setOpen(false)} className={navLinkClass}>
              History
            </NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClass}>
              About
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
