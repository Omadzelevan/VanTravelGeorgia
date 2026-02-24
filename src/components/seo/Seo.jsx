import { useEffect } from "react";

const SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://vantravelgeorgia.netlify.app";

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
}

export default function Seo({
  title,
  description,
  path = "/",
  image = "/images/logo.png",
  noindex = false,
  jsonLd,
}) {
  useEffect(() => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
    const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

    document.title = title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: robotsContent,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    let structuredNode = null;
    if (jsonLd) {
      structuredNode = document.createElement("script");
      structuredNode.type = "application/ld+json";
      structuredNode.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(structuredNode);
    }

    return () => {
      if (structuredNode?.parentNode) {
        structuredNode.parentNode.removeChild(structuredNode);
      }
    };
  }, [title, description, path, image, noindex, jsonLd]);

  return null;
}
