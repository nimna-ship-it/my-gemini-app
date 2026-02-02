
import React, { useState, useEffect, useCallback } from 'react';
import FloatingHearts from './components/FloatingHearts';
import FloatingText from './components/FloatingText';
import ChatBot from './components/ChatBot';
import ImageEditor from './components/ImageEditor';

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [shikiName] = useState("Shiki boo");
  const [nimnaName] = useState("Nimna");

  const moveNoButton = useCallback(() => {
    const margin = 100;
    const maxX = window.innerWidth - margin * 2;
    const maxY = window.innerHeight - margin * 2;
    setNoPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
  }, []);

  const handleYes = () => {
    setAccepted(true);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12">
      <FloatingHearts />
      <FloatingText />
      
      {!accepted ? (
        <div className="z-10 text-center space-y-8 animate-in fade-in duration-1000">
          <div className="bg-white/40 backdrop-blur-sm p-10 rounded-[4rem] shadow-2xl border border-white/50 max-w-xl w-full">
            <h1 className="text-4xl md:text-6xl font-romantic text-pink-600 mb-4 drop-shadow-sm">
              {shikiName},
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-pink-800 mb-12">
              Will you be my Valentine? ❤️
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative h-48">
              <button
                onClick={handleYes}
                className="bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg hover:scale-110 transition-transform z-20"
              >
                YES! ✨
              </button>

              <div 
                className="transition-all duration-300 ease-out z-20 absolute"
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                }}
              >
                <button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className="bg-gray-300/80 hover:bg-gray-400 text-gray-700 text-lg py-3 px-8 rounded-full border border-gray-100 cursor-default"
                >
                  No
                </button>
                <p className="text-[10px] text-pink-400 mt-1 whitespace-nowrap text-center opacity-70">
                  no seems bit shy
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="z-10 w-full max-w-6xl space-y-12 flex flex-col items-center">
          <div className="text-center space-y-6 animate-in zoom-in duration-700">
            <h1 className="text-4xl md:text-6xl font-romantic text-pink-600 drop-shadow-md">
              I always love you, {shikiName}! ❤️
            </h1>
            <div className="relative inline-block w-full max-w-md mx-auto">
              <div 
                className="tenor-gif-embed rounded-3xl overflow-hidden shadow-2xl border-4 border-white" 
                data-postid="24288323" 
                data-share-method="host" 
                data-aspect-ratio="1.40351" 
                data-width="100%"
              >
                <a href="https://tenor.com/view/excited-ah-ahh-gif-24288323">Excited Ah GIF</a>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-pink-100 font-romantic text-pink-500 rotate-12 z-30">
                Best Choice Ever!
              </div>
            </div>
            <p className="text-pink-800 text-xl font-light italic">
              "You've made {nimnaName} the happiest person in the universe today!"
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-start">
            <div className="flex justify-center">
              <ChatBot />
            </div>
            <div className="flex justify-center">
              <ImageEditor />
            </div>
          </div>

          <footer className="text-pink-400 font-romantic text-2xl pb-8 text-center">
            Forever yours, {nimnaName} 💍
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
