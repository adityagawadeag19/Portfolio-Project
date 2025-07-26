import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { Experience } from "@shared/schema";

export function Experience() {
  const { data: experiences, isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 portfolio-surface">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-portfolio-muted/20 rounded w-1/3"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-portfolio-muted/20 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 portfolio-surface theme-transition">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="flex items-center mb-4">
            <span className="section-number">02.</span>
            <span className="section-title">Where I've Worked</span>
          </h2>
          <div className="section-underline"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-portfolio-primary/30"></div>

          <div className="space-y-12">
            {experiences?.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-portfolio-primary rounded-full border-4 border-portfolio-bg"></div>
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="portfolio-bg p-6 rounded-lg shadow-lg theme-transition">
                    <div className="mb-2">
                      <span className="portfolio-primary font-mono text-sm">
                        {experience.startDate} - {experience.endDate || 'Present'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold portfolio-text mb-1">
                      {experience.title}
                    </h3>
                    <h4 className="portfolio-primary mb-4">{experience.company}</h4>
                    <ul className="portfolio-muted text-sm space-y-2">
                      {experience.responsibilities.map((responsibility, i) => (
                        <li key={i}>• {responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
