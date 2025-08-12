import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, RefreshCw, Download } from "lucide-react";
import posterPlaceholder from "@/assets/poster-placeholder.jpg";
import { toast } from "sonner";

const languages = ["English", "Tamil", "Hindi", "Telugu", "Kannada"];

const Output = () => {
  const location = useLocation();
  const initial = (location.state as any) || {};

  const [language, setLanguage] = useState<string>(initial.language || "English");
  const [caption, setCaption] = useState<string>(
    initial.caption || "Your catchy product caption will appear here."
  );
  const [hashtags, setHashtags] = useState<string>(
    initial.hashtags || "#MSME #LocalBusiness #ShopLocal"
  );
  const [script, setScript] = useState<string>(
    initial.script || "Your short reel script will appear here."
  );

  const productName = initial.productName || "Sample Product";
  const posterUrl = initial.posterUrl || posterPlaceholder;

  const [regenPoster, setRegenPoster] = useState(false);
  const [regenCaption, setRegenCaption] = useState(false);
  const [regenScript, setRegenScript] = useState(false);

  const doCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  };

  const downloadPoster = () => {
    const link = document.createElement("a");
    link.href = posterUrl;
    link.download = `${productName}-poster.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const regenerate = (type: "poster" | "caption" | "script") => {
    if (type === "poster") {
      setRegenPoster(true);
      setTimeout(() => {
        setRegenPoster(false);
        toast("Poster updated");
      }, 900);
    }
    if (type === "caption") {
      setRegenCaption(true);
      setTimeout(() => {
        setCaption((c) => `${c} (v2)`);
        setHashtags((h) => `${h} #Promo`);
        setRegenCaption(false);
      }, 900);
    }
    if (type === "script") {
      setRegenScript(true);
      setTimeout(() => {
        setScript((s) => `${s}\n\nAdd CTA: Order now!`);
        setRegenScript(false);
      }, 900);
    }
  };

  useEffect(() => {
    // Mock language change effect
    if (language !== initial.language) {
      setCaption(`${productName} — (${language}) version caption`);
      setScript(`(${language}) version reel script for ${productName}`);
    }
  }, [language]);

  return (
    <main className="container py-8">
      <Helmet>
        <title>Output | Smart Local Product Promoter</title>
        <meta name="description" content="Download poster, copy captions and reel scripts for your product." />
        <link rel="canonical" href="/output" />
      </Helmet>

      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Your Generated Content</h1>
          <p className="text-muted-foreground">Fine-tune, copy, or download.</p>
        </div>
        <div className="w-full md:w-60">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Language" />
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Poster */}
        <Card className="p-4 space-y-4 shadow-elevated">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Poster</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={downloadPoster}>
                <Download className="mr-2" /> Download
              </Button>
              <Button size="sm" onClick={() => regenerate("poster")} disabled={regenPoster}>
                <RefreshCw className={regenPoster ? "animate-spin" : ""} />
                <span className="ml-2">Regenerate</span>
              </Button>
            </div>
          </div>
          <div className="rounded-md border bg-secondary/30 p-3">
            <img src={posterUrl} alt={`${productName} poster`} className="w-full h-[520px] object-contain rounded" />
          </div>
        </Card>

        {/* Caption + Hashtags */}
        <Card className="p-4 space-y-3 shadow-elevated">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Caption & Hashtags</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => doCopy(`${caption}\n\n${hashtags}`)}>
                <Copy className="mr-2" /> Copy
              </Button>
              <Button size="sm" onClick={() => regenerate("caption")} disabled={regenCaption}>
                <RefreshCw className={regenCaption ? "animate-spin" : ""} />
                <span className="ml-2">Regenerate</span>
              </Button>
            </div>
          </div>
          <Textarea value={`${caption}\n\n${hashtags}`} readOnly rows={14} />
        </Card>

        {/* Reel Script */}
        <Card className="p-4 space-y-3 shadow-elevated md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Reel Script</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => doCopy(script)}>
                <Copy className="mr-2" /> Copy
              </Button>
              <Button size="sm" onClick={() => regenerate("script")} disabled={regenScript}>
                <RefreshCw className={regenScript ? "animate-spin" : ""} />
                <span className="ml-2">Regenerate</span>
              </Button>
            </div>
          </div>
          <Textarea value={script} readOnly rows={10} />
        </Card>
      </div>
    </main>
  );
};

export default Output;
