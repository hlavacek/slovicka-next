This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## About Slovíčka

Slovíčka is a vocabulary learning application designed to help Slovak school children practice Slovak ↔ English word translations through interactive quizzes and custom word sets.

## Features

- **Custom Word Sets**: Create and manage your own vocabulary lists with Slovak ↔ English word pairs
- **Import/Export**: Share word sets via JSON files for easy distribution
- **Offline Support**: All word sets are stored locally in your browser using localStorage
- **Accessible**: Keyboard-navigable interface following WCAG guidelines

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Using Word Sets

### Creating a Word Set

1. Navigate to `/word-sets/new` (or `http://localhost:3000/slovicka-next/word-sets/new` in development)
2. Enter a name for your word set (e.g., "Animals", "My First Words")
3. Add Slovak ↔ English word pairs:
   - Enter the Slovak word in the left field
   - Enter the English translation in the right field
   - Click "+ Add row" to add more pairs
4. Click "Save set" to store the word set in your browser

### Managing Word Sets

- **Load**: Click "Load" on any saved word set to edit it
- **Export**: Click "Export" to download a word set as a JSON file
- **Import**: Click "Import" and select a previously exported JSON file to add it to your collection

### Keyboard Navigation

All form fields and buttons are accessible via keyboard:
- Use `Tab` to move forward through fields
- Use `Shift+Tab` to move backward
- Use `Enter` to submit forms or activate buttons

## Running Tests

```bash
npm test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
