import { DatePipe, Location } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticleService } from '../../services/article.service';

interface ContentBlock {
  type: 'heading' | 'paragraph';
  text: string;
}

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
})
export class ArticleDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly articleService = inject(ArticleService);
  private readonly destroyRef = inject(DestroyRef);

  readonly articleId = signal<string>('');
  readonly imageError = signal<boolean>(false);

  readonly article = computed(() => this.articleService.getArticleById(this.articleId()));

  readonly contentBlocks = computed<ContentBlock[]>(() => {
    const current = this.article();
    if (!current) {
      return [];
    }

    return current.content
      .split(/\n\s*\n/)
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((block) => {
        const isHeading =
          block.length < 70 && !block.endsWith('.') && !block.endsWith('!') && !block.endsWith('?') && !block.includes('\n');
        return {
          type: isHeading ? 'heading' : 'paragraph',
          text: block,
        };
      });
  });

  readonly relatedArticles = computed(() => {
    const current = this.article();
    if (!current) {
      return [];
    }
    return this.articleService.getRelatedArticles(current.id, current.category, 3);
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.articleId.set(params.get('id') ?? '');
        this.imageError.set(false);
      });
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/articles']);
    }
  }

  onImageError(): void {
    this.imageError.set(true);
  }
}
