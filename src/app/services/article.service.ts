import { Injectable, signal } from '@angular/core';
import { ARTICLE_CATEGORIES, COVER_IMAGE_PRESETS, SAMPLE_ARTICLES } from '../data/sample-articles';
import { Article, ArticleCategory, NewArticleInput } from '../models/article.model';

const STORAGE_KEY = 'learnhub_articles_v1';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly articlesSignal = signal<Article[]>(this.loadInitialArticles());

  /** Read-only reactive signal of all articles sorted newest first. */
  readonly articles = this.articlesSignal.asReadonly();

  getCategories(): readonly ArticleCategory[] {
    return ARTICLE_CATEGORIES;
  }

  getArticles(): Article[] {
    return this.articlesSignal();
  }

  getLatestArticles(count: number): Article[] {
    return this.articlesSignal().slice(0, count);
  }

  getArticleById(id: string): Article | undefined {
    return this.articlesSignal().find((article) => article.id === id);
  }

  getRelatedArticles(currentId: string, category: ArticleCategory, limit = 3): Article[] {
    const others = this.articlesSignal().filter((article) => article.id !== currentId);
    const sameCategory = others.filter((article) => article.category === category);
    const differentCategory = others.filter((article) => article.category !== category);
    return [...sameCategory, ...differentCategory].slice(0, limit);
  }

  addArticle(input: NewArticleInput): Article {
    const cleanTitle = input.title.trim();
    const cleanAuthor = input.author.trim();
    const cleanDescription = input.description.trim();
    const cleanContent = input.content.trim();
    const fallbackPreset =
      COVER_IMAGE_PRESETS.find((preset) => preset.category === input.category)?.url ??
      COVER_IMAGE_PRESETS[0].url;

    const newArticle: Article = {
      id: this.generateUniqueId(cleanTitle),
      title: cleanTitle,
      author: cleanAuthor,
      category: input.category,
      description: cleanDescription,
      content: cleanContent,
      imageUrl: input.imageUrl?.trim() || fallbackPreset,
      publishedDate: new Date().toISOString().slice(0, 10),
      readTimeMinutes: this.estimateReadTime(cleanContent),
      featured: false,
      isUserCreated: true,
    };

    const updated = [newArticle, ...this.articlesSignal()];
    this.articlesSignal.set(updated);
    this.saveToStorage(updated);
    return newArticle;
  }

  deleteArticle(id: string): void {
    const updated = this.articlesSignal().filter((article) => article.id !== id);
    this.articlesSignal.set(updated);
    this.saveToStorage(updated);
  }

  resetSampleArticles(): void {
    this.articlesSignal.set([...SAMPLE_ARTICLES]);
    this.saveToStorage(SAMPLE_ARTICLES);
  }

  private loadInitialArticles(): Article[] {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return [...SAMPLE_ARTICLES];
      }
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.saveToStorage(SAMPLE_ARTICLES);
        return [...SAMPLE_ARTICLES];
      }
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as Article[];
      }
    } catch {
      // Fall back safely if localStorage is unavailable or corrupted.
    }
    return [...SAMPLE_ARTICLES];
  }

  private saveToStorage(articles: Article[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      }
    } catch {
      // Ignore storage quota errors gracefully.
    }
  }

  private estimateReadTime(content: string): number {
    const words = content.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 180));
  }

  private generateUniqueId(title: string): string {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 48);
    const suffix = Date.now().toString(36).slice(-5);
    return `${slug || 'article'}-${suffix}`;
  }
}
