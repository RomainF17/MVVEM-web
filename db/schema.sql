-- Schema for MVVEM CMS - Cloudflare D1 Database
-- Run: wrangler d1 execute mvvem-db --file=./db/schema.sql

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  category TEXT,
  tags TEXT, -- JSON array stored as text
  coverImageUrl TEXT,
  contentMarkdown TEXT,
  address TEXT,
  status TEXT CHECK(status IN ('draft','published')) NOT NULL DEFAULT 'draft',
  authorEmail TEXT,
  publishedAt TEXT,
  updatedAt TEXT NOT NULL
);

-- Index for faster queries on published articles
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(publishedAt);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);

-- Products table for affiliate shop
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price REAL,
  imageUrl TEXT,
  affiliateLink TEXT,
  status TEXT CHECK(status IN ('draft','published')) NOT NULL DEFAULT 'draft',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Index for faster queries on published products
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(createdAt);
