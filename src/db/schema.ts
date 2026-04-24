import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  vector,
  index,
} from "drizzle-orm/pg-core";

// ===== BETTER AUTH TABLES =====
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ===== APP-SPECIFIC TABLES =====
export const chatbot = pgTable("chatbot", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  websiteUrl: text("website_url"),
  brandColor: text("brand_color").default("#7C3AED"),
  logoUrl: text("logo_url"),
  aiPersona: text("ai_persona").default("friendly"),
  aiLanguageStyle: text("ai_language_style").default("professional"),
  widgetPosition: text("widget_position").default("bottom-right"),
  isActive: boolean("is_active").default(true),
  totalMessages: integer("total_messages").default(0),
  totalConversions: integer("total_conversions").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const scrapedPage = pgTable("scraped_page", {
  id: text("id").primaryKey(),
  chatbotId: text("chatbot_id")
    .notNull()
    .references(() => chatbot.id),
  url: text("url").notNull(),
  title: text("title"),
  content: text("content"),
  status: text("status").default("pending"),
  scrapedAt: timestamp("scraped_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const conversation = pgTable("conversation", {
  id: text("id").primaryKey(),
  chatbotId: text("chatbot_id")
    .notNull()
    .references(() => chatbot.id),
  visitorId: text("visitor_id"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"),
});

export const message = pgTable("message", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversation.id),
  role: text("role").notNull(), // 'user' | 'assistant'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const knowledgeChunk = pgTable("knowledge_chunk", {
  id: text("id").primaryKey(),
  chatbotId: text("chatbot_id")
    .notNull()
    .references(() => chatbot.id),
  content: text("content").notNull(),
  embedding: vector("embedding", { dimensions: 1536 }), // OpenAI text-embedding-3-small
  url: text("url"), // Source URL
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  embeddingIndex: index("embeddingIndex").using("hnsw", table.embedding.op("vector_cosine_ops")),
}));
