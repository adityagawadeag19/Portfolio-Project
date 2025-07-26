import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 portfolio-surface theme-transition">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="mb-6 md:mb-0">
            <p className="portfolio-muted text-sm">
              Built with <span className="text-red-500">♥</span> by Alex Thompson
            </p>
            <p className="portfolio-muted text-xs mt-1">
              Designed & Developed in San Francisco
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="portfolio-muted hover:portfolio-primary transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="portfolio-muted hover:portfolio-primary transition-colors duration-200 text-sm"
            >
              Terms of Service
            </a>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-muted hover:portfolio-primary transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-border text-center"
        >
          <p className="portfolio-muted text-xs">
            © 2024 Alex Thompson. All rights reserved. | Last updated: January 2024
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
