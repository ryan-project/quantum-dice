import { useState } from 'react';

export default function QuantumDice() {
  // ─── State ────────────────────────────────────────────────────────────
  // rolling: whether the “dice” is in its 3 second animation
  const [rolling, setRolling] = useState(false);
  // result: the number 1–6 once it’s rolled
  const [result, setResult] = useState(null);
  // message: the quantum “fortune” based on the result
  const [message, setMessage] = useState('');

  // ─── The six possible messages ────────────────────────────────────────
  const quantumMessages = [
    'Patience is your ally today.',
    'Take immediate action.',
    'Trust your intuition.',
    'A pleasant surprise awaits.',
    'Reflect and reconsider.',
    'The universe favors boldness.',
  ];

  // ─── rollDice: trigger the animation, then pick a random face ────────
  const rollDice = () => {
    setRolling(true);       // show “rolling…” UI
    setResult(null);        // clear any previous number

    // after 3s, show a random result
    setTimeout(() => {
      const number = Math.floor(Math.random() * 6) + 1; // 1–6
      setResult(number);
      setMessage(quantumMessages[number - 1]);
      setRolling(false);    // hide the “rolling…” UI
    }, 3000);
  };

  // ─── JSX UI ────────────────────────────────────────────────────────────
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-serif mb-4">Welcome to Quantum Dice</h1>
      <p className="text-lg italic mb-8">Let the god roll the dice for you.</p>

      {rolling ? (
        <div className="animate-pulse">
          <img
            src="/quantum-dice-base.png"
            className="w-64 h-64 rounded-full"
            alt="Quantum Dice"
          />
          <p className="mt-4">God is rolling the dice…</p>
        </div>
      ) : result ? (
        <div className="flex flex-col items-center">
          <h2 className="text-8xl font-bold mb-4">{result}</h2>
          <p className="text-xl mb-8">{message}</p>
          <button
            onClick={() =>
              alert(`Quantum Dice rolled a ${result}: ${message}`)
            }
            className="bg-teal-500 px-4 py-2 rounded-lg mb-4 hover:bg-teal-700 transition"
          >
            Share your Quantum Message
          </button>
          <button
            onClick={rollDice}
            className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Entangle yourself better with god and Roll Again
          </button>
        </div>
      ) : (
        <button
          onClick={rollDice}
          className="bg-teal-500 px-6 py-3 rounded-lg hover:bg-teal-700 transition"
        >
          Roll the Quantum Dice
        </button>
      )}
    </div>
  );
}

// Map each face (1–6) to an { left, top } position (percent)
const vertexPositions = {
  1: { left: '50%',  top: '5%'   }, // top
  2: { left: '85%',  top: '30%'  }, // upper-right
  3: { left: '85%',  top: '70%'  }, // lower-right
  4: { left: '15%',  top: '30%'  }, // upper-left
  5: { left: '50%',  top: '90%'  }, // bottom
  6: { left: '15%',  top: '70%'  }, // lower-left
};

