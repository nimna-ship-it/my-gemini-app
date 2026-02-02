
import React, { useState, useEffect, useCallback } from 'react';
import { FloatingHeart } from '../types';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const spawnHeart = useCallback(() => {
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 5 + 5,
      color: ['#f472b6', '#ec4899', '#db2777', '#f87171', '#ef4444'][Math.floor(Math.random() * 5)],
    };
    setHearts(prev => [...prev.slice(-30), newHeart]);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnHeart, 800);
    return () => clearInterval(interval);
  }, [spawnHeart]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(heart => (
        <i
          key={heart.id}
          className="fa-solid fa-heart heart-particle"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            color: heart.color,
            animationDuration: `${heart.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
