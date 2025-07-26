import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Code, Server, Wrench } from "lucide-react";
import type { Skill } from "@shared/schema";

export function Skills() {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const skillCategories = [
    { 
      key: "frontend", 
      title: "Frontend", 
      icon: Code,
      skills: skills?.filter(skill => skill.category === "frontend") || [] 
    },
    { 
      key: "backend", 
      title: "Backend", 
      icon: Server,
      skills: skills?.filter(skill => skill.category === "backend") || [] 
    },
    { 
      key: "tools", 
      title: "Tools & DevOps", 
      icon: Wrench,
      skills: skills?.filter(skill => skill.category === "tools") || [] 
    },
  ];

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 portfolio-surface">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-portfolio-muted/20 rounded w-1/3"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-24 bg-portfolio-muted/20 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 portfolio-surface theme-transition">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="flex items-center mb-4">
            <span className="section-number">04.</span>
            <span className="section-title">Skills & Technologies</span>
          </h2>
          <div className="section-underline"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="portfolio-bg p-6 rounded-lg shadow-lg theme-transition"
              >
                <h3 className="text-xl font-bold portfolio-text mb-6 flex items-center">
                  <IconComponent className="portfolio-primary w-6 h-6 mr-3" />
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="portfolio-text font-medium">{skill.name}</span>
                        <span className="portfolio-primary text-sm font-mono">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1.5, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="h-2 rounded-full skill-progress"
                          style={{ backgroundColor: 'var(--portfolio-primary)' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
