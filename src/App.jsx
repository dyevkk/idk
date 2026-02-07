import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HandHeart, Sparkles, ChevronRight, Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function App() {
  const [stage, setStage] = useState("intro"); // intro, message, proposal, success
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });


  const handleNoHover = () => {
    const x = Math.random() * (window.innerWidth - 100) - (window.innerWidth / 2 - 50);
    const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50);
    setPosition({ x, y });
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    setStage("success");
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Continuous confetti
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffa500']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffa500']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };



  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Background hearts animation
  const BackgroundHearts = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-500 opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: -100,
            rotate: Math.random() * 360 + 360,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart size={Math.random() * 50 + 20} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 overflow-hidden relative font-sans text-gray-800">
      <BackgroundHearts />

      <AnimatePresence mode="wait">
        {/* STAGE 1: INTRO */}
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center z-10"
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="mb-8 inline-block"
            >
              <div className="relative">
                <Gift size={120} className="text-red-500 drop-shadow-xl" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg"
                >
                  <Sparkles size={24} className="text-white" />
                </motion.div>
              </div>
            </motion.div>

            <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-6 font-handwriting">
              Hi Raagapriya!
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-sm mx-auto">
              We've been friends for a whole year now... time flies, doesn't it?
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStage("message")}
              className="bg-white text-pink-600 font-bold py-4 px-10 rounded-full shadow-xl text-xl flex items-center gap-2 mx-auto hover:bg-pink-50 transition-colors"
            >
              I have something to ask... <ChevronRight />
            </motion.button>
          </motion.div>
        )}

        {/* STAGE 2: MESSAGE / BUILD UP */}
        {stage === "message" && (
          <motion.div
            key="message"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center z-10 max-w-lg p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl text-white font-bold mb-6 font-handwriting">
                Every moment with you is magic. ✨
              </h2>
              <div className="space-y-4 text-white/90 text-lg mb-8">
                <p>From our laughs to our quiet moments...</p>
                <p>I cherish every single second.</p>
                <p>And I was wondering...</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStage("proposal")}
              className="bg-white text-pink-600 font-bold py-3 px-8 rounded-full shadow-xl text-lg hover:bg-pink-50 transition-colors"
            >
              Wondering what?
            </motion.button>
          </motion.div>
        )}

        {/* STAGE 3: PROPOSAL */}
        {stage === "proposal" && (
          <motion.div
            key="proposal"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4 z-10 border border-white/50"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="mb-6 flex justify-center"
            >
              <img
                src="https://media.tenor.com/VIChDQ6ejRQAAAAi/jumping-bear-hearts-no-png.gif"
                alt="Cute Bear"
                className="rounded-xl shadow-lg w-48 h-48 object-cover"
              />
            </motion.div>

            <h1 className="text-4xl font-bold text-white drop-shadow-md mb-6 font-handwriting">
              Raagapriya, will you be my Valentine?
            </h1>

            <div className="flex flex-col items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-xl flex items-center gap-2"
                onClick={handleYesClick}
                style={{ fontSize: Math.min(20 + noCount * 2, 60) }} // Grow with rejections
              >
                Yes <Heart fill="white" size={24} />
              </motion.button>

              <motion.button
                animate={noCount > 0 ? position : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover} // For mobile
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-xl absolute"
                style={noCount === 0 ? { position: 'relative' } : { position: 'absolute', top: '50%', left: '50%' }}
              >
                {getNoButtonText()}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STAGE 4: SUCCESS */}
        {stage === "success" && (
          <motion.div
            key="success"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center z-10 border border-white/50"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mb-6 flex justify-center text-pink-600"
            >
              <HandHeart size={100} fill="currentColor" />
            </motion.div>

            <h1 className="text-5xl font-bold text-white drop-shadow-md mb-4 font-handwriting">
              YAY! She said YES! ❤️
            </h1>
            <p className="text-xl text-white/90">
              Best Valentine's Day Ever!
            </p>
            <div className="flex justify-center gap-2 mt-4 text-yellow-300">
              <Sparkles size={30} />
              <Sparkles size={30} />
              <Sparkles size={30} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 text-white/50 text-sm">
        Made with ❤️ for Raagapriya
      </div>
    </div>
  );
}
