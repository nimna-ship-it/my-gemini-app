
import React, { useState, useEffect, useCallback } from 'react';

interface FloatingLabel {
  id: number;
  left: number;
  text: string;
  duration: number;
  delay: number;
}

const FloatingText: React.FC = () => {
  const [labels, setLabels] = useState<FloatingLabel[]>([]);
  const phrases = [
    "Nimna loves you ❤️",
    "Shiki boo + Nimna",
    "Forever Together",
    "nimna loves you bla bla bla",
    "You're Nimna's World",
    "Always & Forever",
    "Nimna loves you so much!",
    "My Love, Shiki"
  ];

  const spawnLabel = useCallback(() => {
    const newLabel: FloatingLabel = {
      id: Date.now() + Math.random(),
      left: Math.random() * 80 + 10, // Keep away from edges
      text: phrases[Math.floor(Math.random() * phrases.length)],
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 5,
    };
    setLabels(prev => [...prev.slice(-10), newLabel]);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnLabel, 3000);
    return () => clearInterval(interval);
  }, [spawnLabel]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {labels.map(label => (
        <div
          key={label.id}
          className="absolute font-romantic text-pink-300/40 text-lg md:text-2xl whitespace-nowrap animate-float-text"
          style={{
            left: `${label.left}%`,
            bottom: '-50px',
            animation: `float-text-anim ${label.duration}s linear forwards`,
            animationDelay: `${label.delay}s`
          }}
        >
          {label.text}
        </div>
      ))}
      <style>{`
        @keyframes float-text-anim {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingText;
