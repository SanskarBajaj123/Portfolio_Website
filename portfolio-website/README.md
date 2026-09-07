# Sanskar Bajaj — Portfolio Website

Personal portfolio website for Sanskar Bajaj, B.Tech CSE student at IIIT Nagpur. Built as a standalone HTML file (Claude Design export) — no build framework required.

**Live:** https://portfolio-website-lime-seven-79.vercel.app

---

## Structure

```
public/
  index.html          ← The entire site (standalone Claude Design bundle)
  favicon.ico
  manifest.json
  robots.txt
DESIGN_SYSTEM.md      ← Colors, layout, node data, editing checklist
vercel.json           ← Vercel deploy config (static, no framework)
_src_react_archive/   ← Previous CRA/React source (archived, not built)
```

## Running locally

```bash
npm start
```

Opens the site at http://localhost:3000 via `npx serve public`.

No install needed beyond Node — `npx serve` is fetched on first run.

## Deploying

```bash
npm run build   # copies public/ → build/
```

Vercel picks up `vercel.json` automatically:
- `buildCommand`: `npm run build`
- `outputDirectory`: `build`
- `framework`: none (static HTML)

Push to `main` → Vercel auto-deploys.

## Editing the design

All visual edits (colors, layout, text, section order) should be made in **Claude Design** and re-exported as `public/index.html`. The design reference lives in [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).

## Projects featured

| Project | Stack | Links |
|---|---|---|
| AI Vendor Onboarding | React, TypeScript, FastAPI, Supabase, Mistral OCR | [GitHub](https://github.com/SanskarBajaj123/vendor-onboarding) · [Demo](https://dev-s-vendor-onboarding.vercel.app/) · [Video](https://www.loom.com/share/f90d611d39aa4f21a560587a85e6d9e0) |
| TasteMaker | XGBoost, SHAP, ChromaDB, Mistral AI, FastAPI, React+Vite | [GitHub](https://github.com/SanskarBajaj123/tastemaker-assistant) · [Demo](https://tastemaker-assistant.vercel.app) |
| SimplySpent | React, React Native, Supabase, PostgreSQL | [GitHub](https://github.com/SanskarBajaj123/SimplySpent) · [Demo](https://simply-spent-dusky.vercel.app/) |
| Emotion Analysis of Tweets | BiLSTM, TensorFlow, Flask, React | [GitHub](https://github.com/SanskarBajaj123/Emotion_Analyzer) |
| Sentiment Analysis | Logistic Regression, NLTK, TF-IDF, Flask | [GitHub](https://github.com/SanskarBajaj123/Sentiment_Analyzer) · [Demo](https://sentiment-analyzer-frontend.onrender.com/) |
