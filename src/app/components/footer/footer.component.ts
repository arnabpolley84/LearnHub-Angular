import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private readonly articleService = inject(ArticleService);

  readonly categories = this.articleService.getCategories();
  readonly currentYear = new Date().getFullYear();
}
