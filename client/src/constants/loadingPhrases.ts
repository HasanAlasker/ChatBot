const loadingPhrases = [
  "Thinking",
  "Analyzing",
  "Gathering my thoughts",
  "Connecting the dots",
  "Crafting a response",
  "Consulting the knowledge base",
  "Analyzing context",
  "Double-checking facts",
  "Formulating answer",
];

export function RandomPhrase() {
  const length = loadingPhrases.length;
  const randomNumber = Math.floor(Math.random() * length);
  return loadingPhrases[randomNumber];
}
