import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import posterPlaceholder from "@/assets/poster-placeholder.jpg";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Clothing",
  "Food",
  "Electronics",
  "Beauty",
  "Home",
  "Other",
];

const languages = ["English", "Tamil", "Hindi", "Telugu", "Kannada"];
const tones = ["Formal", "Informal", "Funny"];

const Create = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Clothing");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Formal");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onGenerate = () => {
    if (!productName || !description) {
      toast("Please fill Product Name and Description");
      return;
    }
    setLoading(true);
    toast.loading("Generating content...", { id: "gen" });
    setTimeout(() => {
      toast.success("Content generated!", { id: "gen" });
      const mockCaption = `${productName} — ${description.slice(0, 60)}...`;
      const mockHashtags = [
        "#MSME",
        "#LocalBusiness",
        "#ShopLocal",
        `#${category}`,
        "#Deals",
      ].join(" ");
      const mockScript = `Hook: Tired of ordinary? Meet ${productName}!\n\nScene 1: Close-up of the product.\nScene 2: Show benefits in 3 bullets.\nScene 3: Price${
        price ? ` just ${price}` : ""
      } + CTA: DM to order today!`;

      navigate("/output", {
        state: {
          productName,
          description,
          price,
          category,
          language,
          tone,
          productImageUrl: preview,
          posterUrl: posterPlaceholder,
          caption: mockCaption,
          hashtags: mockHashtags,
          script: mockScript,
        },
      });
      setLoading(false);
    }, 1400);
  };

  return (
    <main className="container py-8">
      <Helmet>
        <title>Create Content | Smart Local Product Promoter</title>
        <meta
          name="description"
          content="Upload a product and instantly generate posters, captions and reel scripts for MSMEs."
        />
        <link rel="canonical" href="/create" />
      </Helmet>

      <section className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Create Product Content</h1>
          <p className="text-muted-foreground mt-1">
            Generate Posters, Captions & Reels in seconds.
          </p>
        </div>

        <Card className="p-6 space-y-6 shadow-elevated">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-3">
                  <Input id="image" type="file" accept="image/*" onChange={onFileChange} />
                  <div className="text-xs text-muted-foreground">PNG/JPG</div>
                </div>
                <div className="rounded-md border bg-secondary/30 p-3">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Product preview"
                      className="w-full h-56 object-contain rounded"
                    />
                  ) : (
                    <div className="h-56 grid place-items-center text-sm text-muted-foreground">
                      <div className="flex items-center gap-2"><Upload className="h-4 w-4" /> Upload to preview</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g., Organic Cotton T-Shirt" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Product Description</Label>
                <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Key features, materials, sizes, taste, benefits..." rows={5} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (optional)</Label>
                  <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., ₹499" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={onGenerate} variant="hero" size="xl" disabled={loading}>
                  {loading ? (
                    <span className="inline-flex items-center gap-2"><Loader2 className="animate-spin" /> Generating...</span>
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Create;
