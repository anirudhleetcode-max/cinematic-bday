import { motion } from 'framer-motion';

export default function SceneRenderer({ layer }: { layer: any }) {
  const cinematicFade = {
    initial: { opacity: 0, filter: 'blur(30px)', scale: 0.90, y: 20 },
    animate: { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 },
    exit: { opacity: 0, filter: 'blur(20px)', scale: 1.08, y: -20 },
    transition: { duration: 2, ease: [0.22, 1, 0.36, 1] }
  };

  const textSpring = {
    initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { type: 'spring', mass: 1.2, damping: 25, stiffness: 60, delay: 0.3 }
  };

  switch (layer.type) {
    case 'mystery':
    case 'quote':
      return (
        <motion.div {...cinematicFade} className="text-center max-w-4xl px-8 z-10">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif text-zinc-300 tracking-wide leading-tight italic font-light drop-shadow-2xl">
            {layer.type === 'quote' ? `"${layer.content}"` : layer.content}
          </h2>
        </motion.div>
      );

    case 'countdown':
    case 'countdown-final':
      return (
        <motion.div {...cinematicFade} className="flex flex-col items-center justify-center space-y-8 z-10">
          {layer.words.map((word: string, idx: number) => (
            <motion.span 
              key={idx}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: idx * 0.6, duration: 1.5, ease: "easeOut" }}
              className={`font-serif tracking-[0.4em] uppercase ${layer.type === 'countdown-final' ? 'text-7xl md:text-9xl text-white' : 'text-xl md:text-3xl text-zinc-400'}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );

    case 'title':
      return (
        <motion.div {...cinematicFade} className="text-center flex flex-col items-center z-10">
          <motion.h1 
            className="text-6xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tracking-widest uppercase mb-8 font-bold drop-shadow-lg"
            initial={{ letterSpacing: "0em" }}
            animate={{ letterSpacing: "0.2em" }}
            transition={{ duration: 4, ease: "easeOut" }}
          >
            {layer.title}
          </motion.h1>
          <motion.div className="w-[1px] h-16 bg-gradient-to-b from-cinematic-accent to-transparent mb-8" />
          <motion.p {...textSpring} className="text-xs md:text-sm tracking-[0.6em] text-cinematic-accent uppercase font-sans">
            {layer.subtitle}
          </motion.p>
        </motion.div>
      );

    case 'photo-focus':
    case 'finale':
      return (
        <motion.div {...cinematicFade} className="relative w-full h-full flex flex-col items-center justify-center p-6 z-10">
          <motion.div 
            className="absolute inset-0 z-0 opacity-20 filter blur-3xl"
            style={{ backgroundImage: `url(${layer.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            animate={{ scale: [1.1, 1.2, 1.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10 p-2 md:p-4 bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/50 shadow-2xl rounded-sm max-w-3xl w-full group overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cinematic-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-20 pointer-events-none mix-blend-overlay"
            />
            <motion.img 
              src={layer.src} 
              className="max-h-[55vh] w-full object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
            />
          </div>
          {layer.caption || layer.content ? (
            <motion.p {...textSpring} className="z-10 mt-10 text-xs md:text-sm tracking-[0.5em] font-sans text-zinc-300 uppercase text-center max-w-2xl border-b border-zinc-800 pb-4">
              {layer.caption || layer.content}
            </motion.p>
          ) : null}
        </motion.div>
      );

    case 'interactive-words':
      return (
        <motion.div {...cinematicFade} className="flex flex-wrap justify-center items-center gap-6 md:gap-12 max-w-5xl px-6 z-10 h-full content-center">
          {layer.words.map((word: string, i: number) => (
            <motion.span 
              key={i}
              whileHover={{ scale: 1.1, y: -10, color: "#d4af37", textShadow: "0px 10px 20px rgba(212,175,55,0.2)" }}
              className="text-3xl md:text-6xl lg:text-7xl font-serif text-zinc-700 cursor-pointer transition-all duration-500 tracking-wider font-bold"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );

    case 'emotional':
      return (
        <motion.div {...cinematicFade} className="text-center max-w-3xl px-8 z-10 relative">
          <div className="absolute -inset-10 bg-cinematic-accent/5 filter blur-[100px] rounded-full z-0" />
          <p className="text-2xl md:text-4xl font-serif text-zinc-100 leading-relaxed italic font-light relative z-10">
            "{layer.content}"
          </p>
        </motion.div>
      );

    case 'climax':
      return (
        <motion.div {...cinematicFade} className="text-center relative z-20 w-full">
          <div className="absolute inset-0 bg-cinematic-accent/10 filter blur-[150px] z-0" />
          <motion.h1 
            className="text-6xl md:text-[12vw] font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-800 tracking-tighter leading-none relative z-10"
            animate={{ scale: [0.95, 1.05, 1] }}
            transition={{ duration: 5, ease: "easeOut" }}
          >
            {layer.title}
          </motion.h1>
          <motion.p {...textSpring} className="mt-8 text-2xl md:text-5xl font-sans font-light text-cinematic-accent tracking-[0.4em] uppercase relative z-10">
            {layer.subtitle}
          </motion.p>
        </motion.div>
      );

    default:
      return null;
  }
}
