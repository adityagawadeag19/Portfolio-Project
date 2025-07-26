import { motion } from "framer-motion";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 portfolio-bg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="portfolio-primary font-mono text-sm sm:text-base">
            Hi, my name is
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 portfolio-text"
        >
          Alex Thompson
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-8 portfolio-muted"
        >
          I build things for the web.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl portfolio-muted mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          I'm a full-stack developer specializing in building exceptional digital experiences. 
          Currently focused on creating accessible, human-centered products at{" "}
          <span className="portfolio-primary">TechCorp</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 border rounded-lg transition-all duration-300 font-medium hover:scale-105"
            style={{
              borderColor: 'var(--portfolio-primary)',
              color: 'var(--portfolio-primary)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--portfolio-primary)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--portfolio-primary)';
            }}
          >
            Get In Touch
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-4 rounded-lg transition-all duration-300 font-medium text-white hover:scale-105"
            style={{
              backgroundColor: 'var(--portfolio-primary)',
              borderColor: 'var(--portfolio-primary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            View My Work
          </button>
        </motion.div>
      </div>
    </section>
  );
}
