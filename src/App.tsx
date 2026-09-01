import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { layers, config } from './data/birthdayData';
import SceneRenderer from './components/SceneRenderer';
import { Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    setStarted(true);
    setIsAudioOn(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => setIsAudioOn(false));
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isAudioOn) {
      audioRef.current.pause();
      setIsAudioOn(false);
    } else {
      audioRef.current.play().then(() => setIsAudioOn(true)).catch(() => {});
    }
  };

  const handleNext = () => {
    if (currentLayer < layers.length - 1) {
      setCurrentLayer(prev => prev + 1);
    }
  };

  return (
    <div className="w-screen h-screen bg-cinematic-950 flex items-center justify-center relative overflow-hidden">
      <div className="film-grain" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none z-10" />
      
      <audio ref={audioRef} src={config.audioSrc} loop />
      
      {started && (
        <button 
          onClick={toggleAudio}
          className="absolute top-8 right-8 z-50 flex items-center gap-3 px-5 py-2 bg-zinc-950/50 border border-zinc-800/50 text-zinc-400 hover:text-white rounded-full text-[10px] tracking-widest uppercase backdrop-blur-xl transition-all shadow-2xl"
        >
          {isAudioOn ? <Volume2 size={14} className="text-cinematic-accent" /> : <VolumeX size={14} />}
          <span>{isAudioOn ? "SOUND ON" : "SOUND OFF"}</span>
        </button>
      )}

      {!started ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center justify-center cursor-pointer p-10 z-20 w-full h-full"
          onClick={handleStart}
        >
          <motion.div 
            className="w-[1px] h-32 bg-gradient-to-b from-transparent via-zinc-500 to-transparent mb-12"
            animate={{ scaleY: [0.5, 1.5, 0.5], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="text-[10px] md:text-xs tracking-[0.8em] text-zinc-500 hover:text-white uppercase transition-all duration-700 font-sans mb-8">
            AN IMMERSIVE EXPERIENCE
          </h2>
          <button className="relative overflow-hidden px-10 py-4 bg-transparent border border-zinc-800 text-zinc-300 hover:border-cinematic-accent hover:text-cinematic-accent rounded-sm uppercase tracking-[0.4em] text-xs transition-all duration-700 group">
            <span className="relative z-10">ENTER THE STORY</span>
            <div className="absolute inset-0 bg-cinematic-accent/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
          </button>
        </motion.div>
      ) : (
        <div className="w-full h-full relative cursor-pointer flex items-center justify-center z-20" onClick={handleNext}>
          <AnimatePresence mode="wait">
            <motion.div key={currentLayer} className="absolute inset-0 flex items-center justify-center">
              <SceneRenderer layer={layers[currentLayer]} />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500 z-50 pointer-events-none">
            <span className="text-[10px] font-sans tracking-widest text-zinc-300">{String(currentLayer + 1).padStart(2, '0')}</span>
            <div className="w-64 h-[1px] bg-zinc-800 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-cinematic-accent" 
                initial={{ width: 0 }}
                animate={{ width: `${((currentLayer + 1) / layers.length) * 100}%` }}
                transition={{ duration: 1, ease: "circOut" }}
              />
            </div>
            <span className="text-[10px] font-sans tracking-widest text-zinc-500">{String(layers.length).padStart(2, '0')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
