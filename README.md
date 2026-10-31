# Boris "Boka" Mkrtichiani — Personal Portfolio

Modern, fast, accessible developer portfolio built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Formik + Yup**.

## Quick Start

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Personalization Checklist

- **Contact Form Endpoint**: Add `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/<your-id>` in `.env` or update `src/config/site.ts`.
- **CV / Resume PDF**: Drop `Boris-Mkrtichiani-CV.pdf` into `public/` (or change `cvUrl` in `src/config/site.ts`).
- **Project Live Links & Screenshots**: Update `liveUrl`, `repoUrl`, and `imageUrl` in `src/data/projects.ts`.
- **Experience / Journey**: Customize or clear `JOURNEY_ITEMS` in `src/data/journey.ts`.

