import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Message {
  role: string;
  content: string;
}

interface Conversation {
  messages: Message[];
}

const HeroSection = () => {
  const [queryCount, setQueryCount] = useState(0);
  
  useEffect(() => {
    if(typeof window !== 'undefined'){
      const conv = JSON.parse(localStorage.getItem('conversations') || '[]') as Conversation[];
      let count = 0;
      if (conv) {
        count = conv.map((conv)=> conv.messages.filter((msg)=>msg.role === 'user').length).reduce((acc:number, curr:number)=>acc+curr, 0);
      }
      setQueryCount(count);
    }
  }, []);

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05
      }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const welcomeText = "Welcome to Our Platform";
  const descriptionText = "Discover amazing features and possibilities";
  
  return (
    <div className="flex min-h-[500px] md:min-h-[600px] items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-12 md:py-20">
      <div className="text-center text-white max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {welcomeText.split("").map((char, index) => (
            <motion.span key={index} variants={letter} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8"
          variants={sentence}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
        >
          {descriptionText.split("").map((char, index) => (
            <motion.span key={index} variants={letter} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <p className="text-white text-sm sm:text-base md:text-lg font-semibold bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
            Total number of queries: {queryCount}
          </p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-white text-blue-600 hover:bg-blue-50 transition-colors text-sm sm:text-base md:text-lg font-semibold px-6 py-2 rounded-full"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection;