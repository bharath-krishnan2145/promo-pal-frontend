import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <main className="container py-8">
      <Helmet>
        <title>About | Smart Local Product Promoter</title>
        <meta name="description" content="Learn about the Smart Local Product Promoter tool for MSMEs." />
        <link rel="canonical" href="/about" />
      </Helmet>

      <section className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="text-muted-foreground">
          Smart Local Product Promoter helps MSMEs create professional marketing assets in seconds. Generate eye-catching posters, persuasive captions with hashtags, and short reel scripts tailored to your product, audience language, and tone.
        </p>
        <p className="text-muted-foreground">
          This is a frontend prototype. No backend or AI generation is connected yet. All actions are mock interactions designed to showcase the user experience and flow.
        </p>
      </section>
    </main>
  );
};

export default About;
