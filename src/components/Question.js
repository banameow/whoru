// --- Quiz Questions ---
export const questionsData = [
  {
    question: "When faced with a new task, I prefer to:",
    choices: [
      { text: "Dive right in and figure things out as I go.", score: 10 },
      { text: "Plan every step before starting the work.", score: 5 },
      { text: "Look for inspiration from previous examples.", score: 7 },
    ],
  },
  {
    question: "In a group setting, I'm usually the one who:",
    choices: [
      { text: "Tries to make sure everyone is having fun.", score: 10 },
      { text: "Focuses on keeping the discussion on track.", score: 5 },
      { text: "Listens quietly and observes the dynamics.", score: 7 },
    ],
  },
  {
    question: "My ideal weekend involves:",
    choices: [
      { text: "An impulsive adventure or attending a lively event.", score: 10 },
      { text: "Quiet time at home to recharge and reflect.", score: 5 },
      { text: "A balanced mix of social time and personal hobbies.", score: 7 },
    ],
  },
  {
    question: "I make decisions primarily based on:",
    choices: [
      { text: "My gut feeling and current emotions.", score: 10 },
      { text: "Logic, facts, and systematic analysis.", score: 5 },
      { text: "What feels right and fair for everyone involved.", score: 7 },
    ],
  },
];

// --- Result Logic ---
export const getResult = (score) => {
  if (score >= 35) {
    return {
      title: "The Energetic Puppy 🐕",
      description: "You are a spirit of boundless energy and enthusiasm! You love new experiences and bring light to every room.",
      color: "#ff8c94"
    };
  } else if (score >= 20) {
    return {
      title: "The Playful Kitten 🐈",
      description: "You are a blend of curiosity and charm. You enjoy a mix of comfort and lighthearted exploration.",
      color: "#febef8ff"
    };
  } else {
    return {
      title: "The Wise Owl 🦉",
      description: "You have a deep, reflective spirit. You value logic, calm, and time spent in thoughtful solitude.",
      color: "#fd6fefff"
    };
  }
};