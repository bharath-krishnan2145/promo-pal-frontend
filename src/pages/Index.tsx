import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <main className="relative overflow-hidden">
      <Helmet>
        <title>Smart Local Product Promoter — MSME Marketing</title>
        <meta name="description" content="Generate Posters, Captions & Reels for Your Products in Seconds." />
        <link rel="canonical" href="/" />
      </Helmet>

      <section className="container min-h-[70vh] grid place-items-center py-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-gradient-primary blur-3xl opacity-30" aria-hidden />
        </div>

        <div className="text-center space-y-6 animate-enter">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Smart Local Product Promoter
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Generate Posters, Captions & Reels for Your Products in Seconds
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild variant="hero" size="xl" className="hover-scale">
              <Link to="/create">Get Started</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
