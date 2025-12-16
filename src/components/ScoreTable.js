export const Personalities = [
  { title: "Athlete", score: 0 },
  { title: "Chill", score: 0 },
  { title: "Entertain", score: 0 },
  { title: "Hustle", score: 0 },
  { title: "Introvert", score: 0 },
  { title: "Nerd", score: 0 },
  { title: "Top", score: 0 },
];

export const ChoicesTable = [
  {
    A: ["Nerd", "Introvert", "Top"],
    B: ["Entertain", "Chill"],
    C: ["Hustle", "Athlete"],
  },
  {
    A: ["Nerd", "Introvert"],
    B: ["Entertain", "Chill"],
    C: ["Hustle", "Athlete", "Top"],
  },
  {
    A: ["Nerd", "Introvert"],
    B: ["Entertain", "Chill"],
    C: ["Hustle", "Athlete", "Top"],
  },
  {
    A: ["Nerd", "Introvert"],
    B: ["Entertain", "Chill"],
    C: ["Hustle", "Athlete", "Top"],
  },
  {
    A: ["Nerd", "Introvert"],
    B: ["Entertain", "Chill"],
    C: ["Hustle", "Athlete", "Top"],
  },
  {
    A: ["Nerd", "Introvert"],
    B: ["Entertain", "Chill"],
    C: ["Hustle", "Athlete", "Top"],
  },
  {
    A: ["Nerd", "Introvert"],
    B: ["Entertain", "Chill", "Top"],
    C: ["Hustle", "Athlete"],
  },
  {
    A: ["Nerd", "Introvert"],
    B: ["Entertain", "Chill"],
    C: ["Hustle", "Athlete", "Top"],
  },
  {
    A: ["Nerd", "Introvert"],
    B: ["Entertain", "Chill"],
    C: ["Hustle", "Athlete", "Top"],
  },
  {
    A: ["Nerd", "Introvert"],
    B: ["Entertain", "Chill"],
    C: ["Hustle", "Athlete", "Top"],
  },
];

// --- Result Logic ---
export const getResult = (personalities) => {
  const maxScore = Math.max(...personalities.map((p) => p.score));
  const result = personalities.filter((p) => p.score === maxScore);

  return result;
};
