import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import posterPlaceholder from "@/assets/poster-placeholder.jpg";
import { Link, useNavigate } from "react-router-dom";

const items = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  productName: `Sample Product ${i + 1}`,
  posterUrl: posterPlaceholder,
  language: i % 2 === 0 ? "English" : "Hindi",
}));

const History = () => {
  const navigate = useNavigate();
  return (
    <main className="container py-8">
      <Helmet>
        <title>History | Smart Local Product Promoter</title>
        <meta name="description" content="View your previously generated posters, captions and scripts." />
        <link rel="canonical" href="/history" />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold">History</h1>
        <p className="text-muted-foreground">Your recent generated items</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="p-4 space-y-3 shadow-elevated">
            <img src={item.posterUrl} alt={`${item.productName} poster`} className="w-full h-64 object-contain rounded-md border" />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{item.productName}</div>
                <div className="text-xs text-muted-foreground">Language: {item.language}</div>
              </div>
              <Button size="sm" onClick={() => navigate('/output', { state: { productName: item.productName, posterUrl: item.posterUrl, language: item.language } })}>View</Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default History;
