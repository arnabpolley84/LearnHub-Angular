import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  private readonly articleService = inject(ArticleService);

  readonly aboutImageUrl = '/src/assets/images/article_study_habits_1795493632451.jpg';
  readonly imageError = signal(false);

  readonly totalArticles = computed(() => this.articleService.articles().length);
  readonly totalAuthors = computed(() => {
    const authors = new Set(this.articleService.articles().map((a) => a.author.trim()));
    return authors.size;
  });
  readonly categories = this.articleService.getCategories();

  onImageError(): void {
    this.imageError.set(true);
  }
}
