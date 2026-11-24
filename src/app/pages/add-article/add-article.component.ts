import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ARTICLE_CATEGORIES, COVER_IMAGE_PRESETS } from '../../data/sample-articles';
import { ArticleCategory } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.css',
})
export class AddArticleComponent {
  private readonly fb = inject(FormBuilder);
  private readonly articleService = inject(ArticleService);
  private readonly router = inject(Router);

  readonly categories = ARTICLE_CATEGORIES;
  readonly coverPresets = COVER_IMAGE_PRESETS;
  readonly submitted = signal(false);

  readonly articleForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    category: ['Angular' as ArticleCategory, [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(240)]],
    content: ['', [Validators.required, Validators.minLength(50)]],
    imageUrl: [COVER_IMAGE_PRESETS[0].url],
  });

  selectPresetImage(url: string): void {
    this.articleForm.controls.imageUrl.setValue(url);
  }

  onCategoryChange(): void {
    const selectedCategory = this.articleForm.controls.category.value;
    const currentUrl = this.articleForm.controls.imageUrl.value;
    const isUsingPreset = this.coverPresets.some((preset) => preset.url === currentUrl);

    if (isUsingPreset) {
      const matchingPreset = this.coverPresets.find((preset) => preset.category === selectedCategory);
      if (matchingPreset) {
        this.articleForm.controls.imageUrl.setValue(matchingPreset.url);
      }
    }
  }

  hasError(controlName: keyof typeof this.articleForm.controls): boolean {
    const control = this.articleForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      return;
    }

    const formValue = this.articleForm.getRawValue();
    const created = this.articleService.addArticle({
      title: formValue.title,
      author: formValue.author,
      category: formValue.category,
      description: formValue.description,
      content: formValue.content,
      imageUrl: formValue.imageUrl,
    });

    this.router.navigate(['/articles', created.id]);
  }
}
