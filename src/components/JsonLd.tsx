export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nox AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Autonomous multi-agent AI system that researches, builds, optimizes, and learns — coordinated by one hub.",
    url: "https://nox-website-two.vercel.app",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "GBP", name: "Free Trial" },
      { "@type": "Offer", price: "9", priceCurrency: "GBP", name: "Standard" },
      { "@type": "Offer", price: "29", priceCurrency: "GBP", name: "Pro" },
      { "@type": "Offer", price: "79", priceCurrency: "GBP", name: "Max" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "127" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
