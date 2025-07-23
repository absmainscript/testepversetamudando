/**
 * storage.ts
 * 
 * Interface de armazenamento de dados para a aplicação
 * Implementação atual: DatabaseStorage com PostgreSQL
 * Suporte completo ao painel administrativo
 */

import type { InsertUser, User, InsertAdminUser, AdminUser, InsertSiteConfig, SiteConfig, InsertTestimonial, Testimonial, InsertFaqItem, FaqItem, InsertService, Service, InsertPhotoCarousel, PhotoCarousel, InsertExpertiseCard, ExpertiseCard } from "@shared/schema";
import { db } from "./db";
import { users, adminUsers, siteConfig, testimonials, faqItems, services, photoCarousel, expertiseCards } from "@shared/schema";
import { eq, asc } from "drizzle-orm";

// Interface comum para operações de armazenamento
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Admin methods
  getAdminUser(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;

  // Site config methods
  getSiteConfig(key: string): Promise<SiteConfig | undefined>;
  setSiteConfig(config: InsertSiteConfig): Promise<SiteConfig>;
  getAllSiteConfigs(): Promise<SiteConfig[]>;
  deleteSiteConfig(key: string): Promise<void>;

  // Testimonials methods
  getAllTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;

  // FAQ methods
  getAllFaqItems(): Promise<FaqItem[]>;
  getActiveFaqItems(): Promise<FaqItem[]>;
  createFaqItem(faq: InsertFaqItem): Promise<FaqItem>;
  updateFaqItem(id: number, faq: Partial<InsertFaqItem>): Promise<FaqItem>;
  deleteFaqItem(id: number): Promise<void>;

  // Services methods
  getAllServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;

  // Photo Carousel methods
  getActivePhotoCarousel(): Promise<PhotoCarousel[]>;
  getAllPhotoCarousel(): Promise<PhotoCarousel[]>;
  createPhotoCarousel(data: InsertPhotoCarousel): Promise<PhotoCarousel>;
  updatePhotoCarousel(id: number, data: Partial<InsertPhotoCarousel>): Promise<PhotoCarousel>;
  deletePhotoCarousel(id: number): Promise<void>;

    // Expertise Cards methods
  getAllExpertiseCards(): Promise<ExpertiseCard[]>;
  getActiveExpertiseCards(): Promise<ExpertiseCard[]>;
  createExpertiseCard(data: InsertExpertiseCard): Promise<ExpertiseCard>;
  updateExpertiseCard(id: number, data: Partial<InsertExpertiseCard>): Promise<ExpertiseCard>;
  deleteExpertiseCard(id: number): Promise<void>;
}

// Implementação com banco de dados PostgreSQL
export class DatabaseStorage implements IStorage {
    db: any;
    constructor() {
        this.db = db;
    }
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db.insert(users).values(insertUser).returning();
    return user;
  }

  // Admin methods
  async getAdminUser(username: string): Promise<AdminUser | undefined> {
    const [admin] = await this.db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin || undefined;
  }

  async createAdminUser(insertAdminUser: InsertAdminUser): Promise<AdminUser> {
    const [admin] = await this.db.insert(adminUsers).values(insertAdminUser).returning();
    return admin;
  }

  // Site config methods
  async getSiteConfig(key: string): Promise<SiteConfig | undefined> {
    const [config] = await this.db.select().from(siteConfig).where(eq(siteConfig.key, key));
    return config || undefined;
  }

  async setSiteConfig(config: InsertSiteConfig): Promise<SiteConfig> {
    const existing = await this.getSiteConfig(config.key);
    if (existing) {
      const [updated] = await this.db
        .update(siteConfig)
        .set({ value: config.value, updatedAt: new Date() })
        .where(eq(siteConfig.key, config.key))
        .returning();
      return updated;
    } else {
      const [created] = await this.db.insert(siteConfig).values(config).returning();
      return created;
    }
  }

  async getAllSiteConfigs(): Promise<SiteConfig[]> {
    return await this.db.select().from(siteConfig);
  }

  async deleteSiteConfig(key: string): Promise<void> {
    await this.db.delete(siteConfig).where(eq(siteConfig.key, key));
  }

  // Testimonials methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await this.db.select().from(testimonials).orderBy(asc(testimonials.order));
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await this.db.select().from(testimonials).where(eq(testimonials.isActive, true)).orderBy(asc(testimonials.order));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [created] = await this.db.insert(testimonials).values(testimonial).returning();
    return created;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updated] = await this.db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await this.db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // FAQ methods
  async getAllFaqItems(): Promise<FaqItem[]> {
    return await this.db.select().from(faqItems).orderBy(asc(faqItems.order));
  }

  async getActiveFaqItems(): Promise<FaqItem[]> {
    return await this.db.select().from(faqItems).where(eq(faqItems.isActive, true)).orderBy(asc(faqItems.order));
  }

  async createFaqItem(faq: InsertFaqItem): Promise<FaqItem> {
    const [created] = await this.db.insert(faqItems).values(faq).returning();
    return created;
  }

  async updateFaqItem(id: number, faq: Partial<InsertFaqItem>): Promise<FaqItem> {
    const [updated] = await this.db
      .update(faqItems)
      .set(faq)
      .where(eq(faqItems.id, id))
      .returning();
    return updated;
  }

  async deleteFaqItem(id: number): Promise<void> {
    await this.db.delete(faqItems).where(eq(faqItems.id, id));
  }

  // Services methods
  async getAllServices(): Promise<Service[]> {
    return await this.db.select().from(services).orderBy(asc(services.order));
  }

  async getActiveServices(): Promise<Service[]> {
    return await this.db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.order));
  }

  async createService(service: InsertService): Promise<Service> {
    const [created] = await this.db.insert(services).values(service).returning();
    return created;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const [updated] = await this.db
      .update(services)
      .set(service)
      .where(eq(services.id, id))
      .returning();
    return updated;
  }

  async deleteService(id: number): Promise<void> {
    await this.db.delete(services).where(eq(services.id, id));
  }

  // Photo Carousel methods
  async getActivePhotoCarousel(): Promise<PhotoCarousel[]> {
    return await this.db.select().from(photoCarousel).where(eq(photoCarousel.isActive, true)).orderBy(asc(photoCarousel.order));
  }

  async getAllPhotoCarousel(): Promise<PhotoCarousel[]> {
    return await this.db.select().from(photoCarousel).orderBy(asc(photoCarousel.order));
  }

  async createPhotoCarousel(data: InsertPhotoCarousel): Promise<PhotoCarousel> {
    const [result] = await this.db.insert(photoCarousel).values(data).returning();
    return result;
  }

  async updatePhotoCarousel(id: number, data: Partial<InsertPhotoCarousel>): Promise<PhotoCarousel> {
    const [result] = await this.db.update(photoCarousel).set(data).where(eq(photoCarousel.id, id)).returning();
    return result;
  }

  async deletePhotoCarousel(id: number): Promise<void> {
    await this.db.delete(photoCarousel).where(eq(photoCarousel.id, id));
  }

  // Expertise Cards methods
  async getAllExpertiseCards(): Promise<ExpertiseCard[]> {
    return await this.db.select().from(expertiseCards).orderBy(asc(expertiseCards.order));
  }

  async getActiveExpertiseCards(): Promise<ExpertiseCard[]> {
    return await this.db.select().from(expertiseCards)
      .where(eq(expertiseCards.isActive, true))
      .orderBy(asc(expertiseCards.order));
  }

  async createExpertiseCard(data: InsertExpertiseCard): Promise<ExpertiseCard> {
    const [expertiseCard] = await this.db.insert(expertiseCards).values(data).returning();
    return expertiseCard;
  }

  async updateExpertiseCard(id: number, data: Partial<InsertExpertiseCard>): Promise<ExpertiseCard> {
    const [expertiseCard] = await this.db.update(expertiseCards)
      .set(data)
      .where(eq(expertiseCards.id, id))
      .returning();
    return expertiseCard;
  }

  async deleteExpertiseCard(id: number): Promise<void> {
    await this.db.delete(expertiseCards).where(eq(expertiseCards.id, id));
  }
}

export const storage = new DatabaseStorage();