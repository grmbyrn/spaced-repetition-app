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
- **Progress Persistence:** Unlocked chapters and review history are saved in localStorage.
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

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Customization

- **Add a language:**  
  Create a new JSON file in `/data/` and import it in `languageData` in your app files.
- **Add chapters/questions:**  
  Edit the relevant language JSON file.
- **Change review logic:**  
  Update the review session logic in `session/page.tsx`.

---

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Rust Notes

As an extra resource, comprehensive **Rust Notes** are available to help users understand key concepts such as ownership, memory management (stack vs. heap), and traits like `Drop`, `Clone`, and `Copy`.
These notes are especially useful when reviewing Rust quizzes or deepening your knowledge of the language.

📘 **Access the Rust Notes:** [Rust Notes](./rust-notes.md)

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.md) file for details.
