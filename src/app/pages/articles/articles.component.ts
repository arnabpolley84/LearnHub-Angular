import { DatePipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticleCategory } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = this.articleService.getCategories();
  readonly selectedCategory = signal<string>('All');
  readonly searchQuery = signal<string>('');
  readonly failedImages = signal<Record<string, boolean>>({});

  readonly filteredArticles = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.articleService.articles().filter((article) => {
      const matchesCategory = category === 'All' || article.category === category;
      const matchesTitle =
        query.length === 0 || article.title.toLowerCase().includes(query);
      return matchesCategory && matchesTitle;
    });
  });

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const categoryParam = params.get('category');
        if (categoryParam && this.isValidCategory(categoryParam)) {
          this.selectedCategory.set(categoryParam);
        } else {
          this.selectedCategory.set('All');
        }
      });
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: category === 'All' ? {} : { category },
      replaceUrl: true,
    });
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectCategory('All');
  }

  onImageError(articleId: string): void {
    this.failedImages.update((current) => ({ ...current, [articleId]: true }));
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

  private isValidCategory(value: string): value is ArticleCategory {
    return (this.categories as readonly string[]).includes(value);
  }
}
