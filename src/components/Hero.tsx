import { motion } from "framer-motion";
import { Brain, Sparkles, ArrowRight, Code } from "lucide-react";
import { Link } from "react-scroll";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center pt-32 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-primary-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Welcome to DataMind</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              Machine Learning
              <span className="block text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Transforming data into intelligent insights through advanced machine learning algorithms
              and artificial intelligence.
            </p>
            <motion.div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-100}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium text-white
                    bg-gradient-to-r from-primary-600 to-secondary-600 shadow-soft hover:shadow-lg 
                    transition-all duration-200 border border-primary-500/20 w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.a
                href="https://github.com/Yhuux"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium text-primary-400
                  border-2 border-primary-400/20 bg-slate-800 shadow-soft hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
              >
                <Code className="w-5 h-5" />
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full
                animate-pulse border-2 border-primary-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-transparent rounded-full backdrop-blur-sm"></div>
              <Brain className="w-full h-full text-primary-400 p-16 relative z-10" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary-400/20"
              ></motion.div>
              <div className="absolute -right-4 top-1/4 p-4 bg-slate-800 rounded-xl shadow-soft border border-slate-700">
                <Sparkles className="w-6 h-6 text-secondary-400" />
              </div>
              <div className="absolute -left-4 bottom-1/4 p-4 bg-slate-800 rounded-xl shadow-soft border border-slate-700">
                <Code className="w-6 h-6 text-primary-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}