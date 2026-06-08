// api/sitemap.js — QatarSpec Pro
// Phase 8: Dynamic XML Sitemap (served at /sitemap-dynamic.xml)
// الملف الثابت sitemap.xml يبقى كما هو — هذا dynamic مُحدَّث يومياً

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const BASE = 'https://qatar-standers.vercel.app';
  const now  = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/',                       priority: '1.0', freq: 'daily'   },
    { url: '/ncr-generator.html',     priority: '0.9', freq: 'weekly'  },
    { url: '/dpr-generator.html',     priority: '0.9', freq: 'weekly'  },
    { url: '/method-statement.html',  priority: '0.8', freq: 'weekly'  },
    { url: '/execution-hub.html',     priority: '0.8', freq: 'weekly'  },
    { url: '/boq-pricer.html',        priority: '0.8', freq: 'weekly'  },
    { url: '/tools.html',             priority: '0.7', freq: 'weekly'  },
    { url: '/analyzer.html',          priority: '0.7', freq: 'weekly'  },
    { url: '/scanner.html',           priority: '0.7', freq: 'weekly'  },
    { url: '/visual-hub.html',        priority: '0.6', freq: 'monthly' },
    { url: '/projects.html',          priority: '0.6', freq: 'monthly' },
    { url: '/subscribe.html',         priority: '0.6', freq: 'monthly' },
    { url: '/login.html',             priority: '0.5', freq: 'monthly' },
  ];

  const urls = pages.map(p =>
    `  <url>\n    <loc>${BASE}${p.url}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${p.freq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
  ).join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    '</urlset>'
  ].join('\n');

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=3600');
  return res.status(200).send(xml);
}
