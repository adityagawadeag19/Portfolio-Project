import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  technologies: text("technologies").array().notNull(),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  isFeatured: boolean("is_featured").default(false),
  order: integer("order").default(0),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description").notNull(),
  responsibilities: text("responsibilities").array().notNull(),
  order: integer("order").default(0),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // frontend, backend, tools
  percentage: integer("percentage").notNull(),
  order: integer("order").default(0),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
