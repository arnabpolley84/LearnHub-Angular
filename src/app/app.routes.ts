import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'LearnHub — Educational Blog & Tutorials',
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    title: 'Articles — LearnHub',
  },
  {
    path: 'articles/:id',
    component: ArticleDetailsComponent,
    title: 'Article Details — LearnHub',
  },
  {
    path: 'add-article',
    component: AddArticleComponent,
    title: 'Add Article — LearnHub',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About — LearnHub',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
