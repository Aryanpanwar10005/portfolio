import { Helmet } from "react-helmet-async";
import ogCover from "@/assets/og-cover.webp";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE_NAME = "Aryan Panwar — Product Evidence Book";
const TWITTER_HANDLE = "@aryanpanwar";
const SITE_ORIGIN = "https://aryanpanwar.in";
const toAbsolute = (u: string) => (u.startsWith("http") ? u : `${SITE_ORIGIN}${u}`);
const DEFAULT_OG_IMAGE = toAbsolute(ogCover);

const URL_FIELDS = new Set(["url", "item", "image", "logo", "mainEntityOfPage", "sameAs"]);
function absolutizeSchema(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(absolutizeSchema);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (URL_FIELDS.has(k)) {
        if (typeof v === "string" && v.startsWith("/")) out[k] = toAbsolute(v);
        else if (Array.isArray(v)) out[k] = v.map((x) => (typeof x === "string" && x.startsWith("/") ? toAbsolute(x) : absolutizeSchema(x)));
        else out[k] = absolutizeSchema(v);
      } else {
        out[k] = absolutizeSchema(v);
      }
    }
    return out;
  }
  return value;
}

export function Seo({ title, description, path, image, type = "website", keywords, jsonLd }: SeoProps) {
  const resolvedImage = image ? toAbsolute(image) : DEFAULT_OG_IMAGE;
  const rawSchemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const schemas = rawSchemas.map((s) => absolutizeSchema(s));
  const canonical = toAbsolute(path);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length ? <meta name="keywords" content={keywords.join(", ")} /> : null}
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={title} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}