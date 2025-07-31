# Spaced Repetition Programming Quiz App

A web app for learning programming concepts using spaced repetition.
Users select a language, unlock chapters, and answer quiz questions.
Review sessions adapt to user performance, showing questions more often if answered incorrectly.

---

## Features

- **Language Selection:** Choose from supported programming languages (e.g., Rust, Svelte).
- **Chapter Unlocking:** Unlock chapters one by one; the first chapter is always unlocked.
- **Quiz Sessions:** Answer multiple-choice questions per chapter.
- **Spaced Repetition Review:** Review sessions pull questions from all unlocked chapters, prioritizing those answered incorrectly.
- **Progress Persistence:** Unlocked chapters and review history are saved in `localStorage`.
- **Responsive UI:** Styled with Tailwind CSS.

---

## Project Structure

```
src/
  app/                # Next.js route files (pages)
    [language]/       # Chapter selection per language
    session/          # Quiz session logic
    result/           # Session results
  components/         # Reusable React components (if any)
  data/               # JSON files for languages, chapters, and questions
  store/              # Zustand state management
  lib/                # Utility functions (e.g., shuffleQuestion)
public/               # Static assets
styles/               # Global CSS/Tailwind
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Customisation

### Forking the Repository

1. Go to the [GitHub repo](https://github.com/grmbyrn/spaced-repetition-app) and click **Fork**.
2. Clone your fork:

   ```bash
   git clone https://github.com/your-username/spaced-repetition-app.git
   ```

### Adding a New Language

1. Create a new JSON file inside the `data` folder, e.g., `your-language.json`, with this structure:

   ```json
   {
     "language": "Your Language",
     "title": "Your Title"
     "chapters": [
       {
         "id": "Unique Chapter id"
         "title": "Chapter 1",
         "resourceUrl": "link to resource, eg: YouTube video, docs, etc..." // optional,
         "gitHubNotes": "link to GitHub notes" // optional
         "questions": [
           {
             "id": "unique question id"
             "question": "What is X?",
             "answer": "X is a concept."
             "options": [
               "Option A",
               "Option B",
               "Option C",
               "Option D"
             ],
             "correctIndex": 1, // change depending on which option is correct
             "explanation": "Brief explanation for why answer is correct"
           }
         ]
       }
     ]
   }
   ```

2. Import your JSON file in `lib/languageData.ts`:

   ```typescript
   import yourLanguageData from "@/../data/yourLanguage.json";
   ```

3. Add your language to the list of available languages in `lib/languageData.ts`:

   ```typescript
   export const languageData: Record<string, LanguageJson> = {
     rust: rustData,
     svelte: svelteData,
     sveltekit: sveltekitData,
     yourLanguage: yourLanguageData,
   };
   ```

4. Add Link to `src/app/page.tsx` in order to link to correct language.

```
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-gray-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Select a Language
        </h1>
        <ul className="w-full space-y-6">
          ...
          <li>
            <Link
              href="/yourLanguage"
              className="block w-full px-6 py-4 rounded-lg shadow text-lg font-semibold text-center bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105 transition-all duration-200"
            >
              Your Language
            </Link>
          </li>
          ...
        </ul>
      </div>
    </main>
  );
}
```

---

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Rust Notes

As an extra resource, comprehensive Rust Notes are available to help users understand key concepts such as ownership, memory management (stack vs. heap), and traits like Drop, Clone, and Copy. These notes are especially useful when reviewing Rust quizzes or deepening your knowledge of the language.

📘 Access the Rust Notes: [Rust Notes](https://github.com/grmbyrn/rust-notes)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

If you'd like, I can also generate a ready-to-commit README.md file for you. Would you want that?
