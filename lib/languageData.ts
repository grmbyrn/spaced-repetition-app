import rustData from "@/../data/rust.json";
import svelteData from "@/../data/svelte.json";
import sveltekitData from "@/../data/sveltekit.json";
import type { LanguageJson } from "@/types/language";

export const languageData: Record<string, LanguageJson> = {
  rust: rustData,
  svelte: svelteData,
  sveltekit: sveltekitData
};