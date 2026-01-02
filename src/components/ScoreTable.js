export const Personalities = [
  { title: "Athlete", score: 0 },
  { title: "Chill", score: 0 },
  { title: "Entertain", score: 0 },
  { title: "Hustle", score: 0 },
  { title: "Introvert", score: 0 },
  { title: "Nerd", score: 0 },
  { title: "Top", score: 0 },
];

export const ChoicesTable = {
  A: "Nerd",
  B: "Entertain",
  C: "Hustle",
  D: "Chill",
  E: "Athlete",
  F: "Introvert",
  G: "Top",
};

// --- Result Logic ---
export const getResult = (personalities, answerHistory, THAI_ALPHA) => {
  const sorted = [...personalities].sort((a, b) => b.score - a.score);
  const maxScore = sorted[0].score;
  const maxScorers = sorted.filter(p => p.score === maxScore);

  if (maxScorers.length === 1) return maxScorers;

  const tieSorted = maxScorers.sort((a, b) => {
    const getFirstIndex = (title) => {
      const choiceLetter = Object.keys(ChoicesTable).find(key => ChoicesTable[key] === title);
      const thaiLetter = THAI_ALPHA[choiceLetter];
      return answerHistory.findIndex(ans => ans.includes(thaiLetter)) ?? Infinity;
    };

    return getFirstIndex(a.title) - getFirstIndex(b.title);
  });

  return tieSorted.slice(0, 2);
};

