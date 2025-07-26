import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import type { Project } from "@shared/schema";

export function Projects() {
  const { data: featuredProjects, isLoading: loadingFeatured } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  const { data: allProjects, isLoading: loadingAll } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const otherProjects = allProjects?.filter(project => !project.isFeatured) || [];

  if (loadingFeatured || loadingAll) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 portfolio-bg">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-portfolio-muted/20 rounded w-1/3"></div>
            <div className="space-y-12">
              {[1, 2].map((i) => (
                <div key={i} className="grid md:grid-cols-2 gap-8">
                  <div className="h-64 bg-portfolio-muted/20 rounded"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-portfolio-muted/20 rounded w-3/4"></div>
                    <div className="h-20 bg-portfolio-muted/20 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 portfolio-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="flex items-center mb-4">
            <span className="section-number">03.</span>
            <span className="section-title">Some Things I've Built</span>
          </h2>
          <div className="section-underline"></div>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24">
          {featuredProjects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative grid md:grid-cols-12 gap-8 items-center group ${
                index % 2 === 1 ? 'md:text-right' : ''
              }`}
            >
              <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-2' : 'order-2 md:order-1'}`}>
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="rounded-lg shadow-lg w-full h-auto group-hover:shadow-xl transition-all duration-300"
                  />
                )}
              </div>
              <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-1' : 'order-1 md:order-2'}`}>
                <div className="space-y-4">
                  <p className="portfolio-primary font-mono text-sm">Featured Project</p>
                  <h3 className="text-2xl font-bold portfolio-text group-hover:portfolio-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="portfolio-surface p-6 rounded-lg shadow-lg relative z-10">
                    <p className="portfolio-muted leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className={`flex flex-wrap gap-3 text-sm font-mono ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className="portfolio-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className={`flex gap-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-text hover:portfolio-primary transition-colors duration-200"
                      >
                        <Github className="w-6 h-6" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-text hover:portfolio-primary transition-colors duration-200"
                      >
                        <ExternalLink className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div className="mt-24">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold portfolio-text mb-12 text-center"
            >
              Other Noteworthy Projects
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="project-card portfolio-surface p-6 rounded-lg shadow-lg hover:shadow-xl theme-transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Folder className="portfolio-primary w-8 h-8" />
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-text hover:portfolio-primary transition-colors duration-200"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-text hover:portfolio-primary transition-colors duration-200"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold portfolio-text mb-3">{project.title}</h4>
                  <p className="portfolio-muted text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="portfolio-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
