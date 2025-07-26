import { 
  ContactMessage, 
  InsertContactMessage,
  Project,
  InsertProject, 
  Experience,
  InsertExperience,
  Skill,
  InsertSkill,
  User,
  InsertUser,
  users,
  contactMessages,
  projects,
  experiences,
  skills
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Experiences
  getExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.seedData();
  }

  private async seedData() {
    // Seed projects
    const projectsData: InsertProject[] = [
      {
        title: "E-commerce Analytics Dashboard",
        description: "A comprehensive analytics dashboard for e-commerce businesses featuring real-time data visualization, sales tracking, and automated reporting. Built with React, D3.js, and Node.js with PostgreSQL database.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        technologies: ["React", "Node.js", "PostgreSQL", "D3.js", "AWS"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        isFeatured: true,
        order: 1
      },
      {
        title: "Real-time Chat Application",
        description: "A modern real-time chat application with features like group messaging, file sharing, message reactions, and user presence indicators. Built using React, Socket.io, and Express.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        technologies: ["React", "Socket.io", "Express", "MongoDB", "Redis"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        isFeatured: true,
        order: 2
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application with drag-and-drop functionality, team workspaces, and real-time collaboration features.",
        technologies: ["React", "TypeScript", "Firebase"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        isFeatured: false,
        order: 3
      },
      {
        title: "Weather Forecast API",
        description: "RESTful API service providing accurate weather forecasts with caching, rate limiting, and comprehensive documentation.",
        technologies: ["Python", "FastAPI", "Redis"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        isFeatured: false,
        order: 4
      },
      {
        title: "Personal Finance Tracker",
        description: "A comprehensive personal finance application with expense tracking, budget planning, and financial goal visualization.",
        technologies: ["Vue.js", "Node.js", "PostgreSQL"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        isFeatured: false,
        order: 5
      }
    ];

    // Seed experiences
    const experiencesData: InsertExperience[] = [
      {
        title: "Senior Full Stack Developer",
        company: "TechCorp Solutions",
        startDate: "2022",
        endDate: "Present",
        description: "Leading development of React-based applications for enterprise clients.",
        responsibilities: [
          "Led development of React-based dashboard serving 10K+ daily users",
          "Architected microservices infrastructure reducing load times by 40%",
          "Mentored junior developers and established coding standards"
        ],
        order: 1
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        startDate: "2020",
        endDate: "2022",
        description: "Building scalable web applications for a growing startup.",
        responsibilities: [
          "Built scalable web applications using React, Node.js, and PostgreSQL",
          "Implemented CI/CD pipelines improving deployment efficiency by 60%",
          "Collaborated with design team to create responsive, accessible interfaces"
        ],
        order: 2
      },
      {
        title: "Junior Developer",
        company: "Digital Agency Co",
        startDate: "2018",
        endDate: "2020",
        description: "Developing custom web solutions for various clients.",
        responsibilities: [
          "Developed custom WordPress themes and plugins for client websites",
          "Optimized website performance achieving 95+ PageSpeed scores",
          "Maintained and updated legacy codebases for multiple clients"
        ],
        order: 3
      }
    ];

    // Seed skills
    const skillsData: InsertSkill[] = [
      // Frontend
      { name: "React.js", category: "frontend", percentage: 95, order: 1 },
      { name: "TypeScript", category: "frontend", percentage: 90, order: 2 },
      { name: "JavaScript", category: "frontend", percentage: 98, order: 3 },
      { name: "CSS/SASS", category: "frontend", percentage: 92, order: 4 },
      
      // Backend
      { name: "Node.js", category: "backend", percentage: 88, order: 1 },
      { name: "Python", category: "backend", percentage: 85, order: 2 },
      { name: "PostgreSQL", category: "backend", percentage: 80, order: 3 },
      { name: "MongoDB", category: "backend", percentage: 75, order: 4 },
      
      // Tools
      { name: "Git/GitHub", category: "tools", percentage: 95, order: 1 },
      { name: "Docker", category: "tools", percentage: 82, order: 2 },
      { name: "AWS", category: "tools", percentage: 78, order: 3 },
      { name: "CI/CD", category: "tools", percentage: 75, order: 4 }
    ];

    // Check if data exists, if not seed it
    try {
      const existingProjects = await db.select().from(projects).limit(1);
      if (existingProjects.length === 0) {
        // Add seed data
        for (const project of projectsData) {
          await db.insert(projects).values(project);
        }
        for (const experience of experiencesData) {
          await db.insert(experiences).values(experience);
        }
        for (const skill of skillsData) {
          await db.insert(skills).values(skill);
        }
      }
    } catch (error) {
      console.log("Seeding data (database might not be ready yet):", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.order);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.isFeatured, true)).orderBy(projects.order);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(experiences.order);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [experience] = await db
      .insert(experiences)
      .values(insertExperience)
      .returning();
    return experience;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(skills.order);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return await db.select().from(skills).where(eq(skills.category, category)).orderBy(skills.order);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db
      .insert(skills)
      .values(insertSkill)
      .returning();
    return skill;
  }
}

export const storage = new DatabaseStorage();
