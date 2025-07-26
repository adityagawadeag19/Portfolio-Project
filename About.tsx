import { motion } from "framer-motion";

export function About() {
  const technologies = [
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "Python",
    "TypeScript",
    "PostgreSQL"
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 portfolio-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="flex items-center mb-4">
            <span className="section-number">01.</span>
            <span className="section-title">About Me</span>
          </h2>
          <div className="section-underline"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            <p className="portfolio-muted leading-relaxed">
              Hello! I'm Alex, a passionate full-stack developer with over 5 years of experience 
              creating digital solutions that make a difference. My journey started back in 2018 
              when I decided to try building my first web application — turns out hacking together 
              a custom e-commerce site taught me a lot about HTML & CSS!
            </p>

            <p className="portfolio-muted leading-relaxed">
              Fast-forward to today, and I've had the privilege of working at{" "}
              <span className="portfolio-primary">a startup</span>,{" "}
              <span className="portfolio-primary">a large corporation</span>, and{" "}
              <span className="portfolio-primary">a digital agency</span>. 
              My main focus these days is building accessible, inclusive products and digital 
              experiences for a variety of clients.
            </p>

            <p className="portfolio-muted leading-relaxed">
              Here are a few technologies I've been working with recently:
            </p>

            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center portfolio-muted"
                >
                  <span className="portfolio-primary mr-2">▸</span>
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
                alt="Alex Thompson - Professional headshot"
                className="rounded-lg shadow-lg w-full h-auto relative z-10"
              />
              <div className="absolute inset-0 bg-portfolio-primary/20 rounded-lg group-hover:bg-transparent transition-all duration-300"></div>
              <div className="absolute inset-0 border-2 border-portfolio-primary rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
