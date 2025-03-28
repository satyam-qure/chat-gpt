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
    <div className="flex h-[500px] items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="text-center text-white">
        <motion.h1
          className="text-6xl font-bold mb-4"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {welcomeText.split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-xl mb-8"
          variants={sentence}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
        >
          {descriptionText.split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
        <p
          className="text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
        >
          Total number of queries: {queryCount}
        </p>
      </div>
    </div>
  )
}

export default HeroSection;