"use client";
import React, { useState } from "react";

type Choice = "rock" | "paper" | "scissors";
const choices: Choice[] = ["rock", "paper", "scissors"];

function getResult(player: Choice, ai: Choice) {
  if (player === ai) return "Draw!";
  if (
    (player === "rock" && ai === "scissors") ||
    (player === "paper" && ai === "rock") ||
    (player === "scissors" && ai === "paper")
  )
    return "You win!";
  return "You lose!";
}

function getRandomChoice(): Choice {
  return choices[Math.floor(Math.random() * choices.length)];
}

const RockPaperScissors: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [aiChoice, setAiChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>("");

  const handleClick = (choice: Choice) => {
    const ai = getRandomChoice();
    setPlayerChoice(choice);
    setAiChoice(ai);
    setResult(getResult(choice, ai));
  };

  return (
    <div className="mx-auto mt-8 max-w-xs rounded-xl bg-zinc-50 p-6 text-center text-zinc-900 shadow-md dark:bg-zinc-900 dark:text-zinc-50 dark:shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Rock Paper Scissors</h2>
      <div className="my-4 flex justify-center gap-4">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleClick(choice)}
            className="cursor-pointer rounded-lg border border-zinc-300 bg-white px-5 py-3 text-lg text-zinc-900 transition-colors duration-200 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
          >
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>
      {playerChoice && aiChoice && (
        <div className="mt-4">
          <div>
            <strong>You:</strong> {playerChoice}
          </div>
          <div>
            <strong>AI:</strong> {aiChoice}
          </div>
          <div className="mt-2 font-bold">{result}</div>
        </div>
      )}
    </div>
  );
};

export { RockPaperScissors };
