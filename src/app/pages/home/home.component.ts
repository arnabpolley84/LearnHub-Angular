import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleCategory } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly articleService = inject(ArticleService);

  readonly heroImageUrl = '/src/assets/images/hero_learnhub_study_1795493630496.jpg';
  readonly heroImageError = signal(false);
  readonly failedArticleImages = signal<Record<string, boolean>>({});

  readonly categories = this.articleService.getCategories();

  readonly latestArticles = computed(() => this.articleService.articles().slice(0, 3));

  readonly totalArticleCount = computed(() => this.articleService.articles().length);

  readonly categorySummaries = computed(() => {
    const all = this.articleService.articles();
    return this.categories.map((category) => ({
      name: category,
      count: all.filter((item) => item.category === category).length,
      accentClass: this.getCategoryTextClass(category),
    }));
  });

  onHeroImageError(): void {
    this.heroImageError.set(true);
  }

  onArticleImageError(articleId: string): void {
    this.failedArticleImages.update((current) => ({ ...current, [articleId]: true }));
  }

  getCategoryTextClass(category: ArticleCategory): string {
    switch (category) {
      case 'Angular':
        return 'text-emerald-700';
      case 'TypeScript':
        return 'text-sky-700';
      case 'Web Design':
        return 'text-teal-700';
      case 'Computer Science':
        return 'text-blue-700';
      case 'Study Skills':
        return 'text-emerald-800';
    }
  }
}
