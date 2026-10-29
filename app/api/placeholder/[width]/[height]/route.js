const MIN_SIZE = 80;
const MAX_SIZE = 2000;

function clampSize(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, MIN_SIZE), MAX_SIZE);
}

export async function GET(request, { params }) {
  const { width, height } = await params;
  const w = clampSize(width, 600);
  const h = clampSize(height, 400);
  const shortSide = Math.min(w, h);
  const initialsSize = Math.round(shortSide / 5.5);
  const labelSize = Math.max(10, Math.round(shortSide / 26));
  const radius = Math.round(shortSide / 3.2);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Punjab Public High School placeholder image">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a192f" />
      <stop offset="55%" stop-color="#112240" />
      <stop offset="100%" stop-color="#1b3a63" />
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#f0d27a" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)" />
  <circle cx="${w * 0.82}" cy="${h * 0.18}" r="${radius}" fill="#d4af37" opacity="0.08" />
  <circle cx="${w * 0.12}" cy="${h * 0.86}" r="${radius * 0.7}" fill="#d4af37" opacity="0.06" />
  <rect x="${Math.round(w * 0.05)}" y="${Math.round(h * 0.05)}" width="${Math.round(w * 0.9)}" height="${Math.round(h * 0.9)}" rx="${Math.round(shortSide * 0.06)}" fill="none" stroke="#d4af37" stroke-opacity="0.28" stroke-width="2" />
  <text x="50%" y="${h * 0.5}" fill="url(#gold)" font-family="Georgia, 'Times New Roman', serif" font-size="${initialsSize}" font-weight="700" letter-spacing="${Math.round(initialsSize * 0.08)}" text-anchor="middle" dominant-baseline="middle">PPHS</text>
  <text x="50%" y="${h * 0.5 + initialsSize * 0.85}" fill="#e2e8f0" fill-opacity="0.75" font-family="Georgia, 'Times New Roman', serif" font-size="${labelSize}" letter-spacing="${Math.round(labelSize * 0.24)}" text-anchor="middle" dominant-baseline="middle">SHAHEENABAD</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
