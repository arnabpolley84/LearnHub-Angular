import { Article, ArticleCategory, CoverImagePreset } from '../models/article.model';

export const ARTICLE_CATEGORIES: readonly ArticleCategory[] = [
  'Angular',
  'TypeScript',
  'Web Design',
  'Computer Science',
  'Study Skills',
] as const;

export const COVER_IMAGE_PRESETS: readonly CoverImagePreset[] = [
  {
    label: 'Modular Architecture Diagram',
    url: '/src/assets/images/article_angular_components_1795493629562.jpg',
    category: 'Angular',
  },
  {
    label: 'Structured Types & Blueprints',
    url: '/src/assets/images/article_typescript_types_1795493630488.jpg',
    category: 'TypeScript',
  },
  {
    label: 'Responsive Multi-Device Grid',
    url: '/src/assets/images/article_responsive_css_1795493630953.jpg',
    category: 'Web Design',
  },
  {
    label: 'Graph & Binary Tree Pathways',
    url: '/src/assets/images/article_algorithms_dsa_1795493630689.jpg',
    category: 'Computer Science',
  },
  {
    label: 'University Library Study Desk',
    url: '/src/assets/images/article_study_habits_1795493632451.jpg',
    category: 'Study Skills',
  },
  {
    label: 'Sunlit Developer Study Space',
    url: '/src/assets/images/hero_learnhub_study_1795493630496.jpg',
    category: 'Angular',
  },
];

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: 'understanding-angular-components-and-data-flow',
    title: 'Understanding Angular Components and Unidirectional Data Flow',
    author: 'Elena Rostova',
    category: 'Angular',
    description:
      'Learn how standalone components, templates, and services work together to build clean, maintainable Angular web applications.',
    imageUrl: '/src/assets/images/article_angular_components_1795493629562.jpg',
    publishedDate: '2026-11-18',
    readTimeMinutes: 6,
    featured: true,
    content: `Every Angular application is built from a tree of focused, reusable components. Each component pairs a TypeScript class that holds state and logic with an HTML template that renders the user interface and a CSS stylesheet scoped cleanly to that component.

When you are starting out with Angular, the most important habit to build is keeping components small and single-purpose. Instead of putting every button, search bar, and data fetch into one giant file, split your interface into structural pieces—like a HeaderComponent, FooterComponent, and dedicated page components for Home, Articles, and ArticleDetails.

How Components Talk to Services
Components should focus on presentation and user interaction, while Angular Services handle shared data and persistence. By marking a service with @Injectable({ providedIn: 'root' }), Angular creates a single shared instance across your entire app. Any component can request that service via constructor injection or the inject() function.

Modern Template Control Flow
Recent versions of Angular make templates far easier to read with built-in control flow blocks such as @for and @if. Instead of importing structural directives manually, you can loop over a list of articles directly with @for (article of articles; track article.id) and conditionally render empty states with @if (articles.length === 0).

Key Takeaways for Beginners
Keep business logic inside services, define explicit TypeScript interfaces for every data structure, and wire navigation cleanly with RouterLink so users can move between pages without full browser reloads.`,
  },
  {
    id: 'typescript-interfaces-for-safer-frontends',
    title: 'Using TypeScript Interfaces to Catch Bugs Before Runtime',
    author: 'Marcus Chen',
    category: 'TypeScript',
    description:
      'Discover how strict interfaces, union types, and type-safe services make Angular templates easier to write and refactor.',
    imageUrl: '/src/assets/images/article_typescript_types_1795493630488.jpg',
    publishedDate: '2026-11-14',
    readTimeMinutes: 5,
    featured: true,
    content: `TypeScript gives JavaScript a clear blueprint before a single line runs in the browser. In an educational blog or content platform, defining an Article interface ensures every component agrees on the exact shape of a post—from its title and author to its publishedDate and category.

Why Interfaces Matter in Angular
When strict templates are enabled in tsconfig.json, the Angular compiler checks every property binding inside your HTML files. If you accidentally type article.titel instead of article.title, the compiler catches it immediately rather than leaving a blank spot on screen.

Narrowing Categories with Union Types
Instead of allowing any arbitrary string for a category, a union type like ArticleCategory = 'Angular' | 'TypeScript' | 'Web Design' | 'Computer Science' | 'Study Skills' lets your editor autocomplete valid options and guarantees category filter buttons always match your stored records.

Separating Creation Payloads
Notice how useful it is to define a second interface, NewArticleInput, for your creation form. The user provides title, author, category, description, and content, while your service automatically generates the unique id, publishedDate, and estimated readTimeMinutes.`,
  },
  {
    id: 'responsive-grid-and-typography-for-readable-blogs',
    title: 'Designing Responsive Layouts and Readable Typography with CSS',
    author: 'Priya Nair',
    category: 'Web Design',
    description:
      'Practical rules for line length, mobile-first grids, and accessible color contrast on modern educational websites.',
    imageUrl: '/src/assets/images/article_responsive_css_1795493630953.jpg',
    publishedDate: '2026-11-10',
    readTimeMinutes: 7,
    featured: true,
    content: `Great educational content loses its impact when lines of text stretch across a 1440px monitor or when buttons feel cramped on a phone screen. Good web design starts with predictable spacing, clear visual hierarchy, and comfortable reading proportions.

The 65-Character Reading Measure
Human eyes track text most comfortably when each line contains roughly 60 to 75 characters. On an article detail page, constraining your prose column to a readable max-width around 44rem (704px) prevents reader fatigue during longer tutorials.

Mobile-First Responsive Grids
With CSS Grid, moving from a single-column mobile feed to a three-column desktop showcase takes only a few utility rules: one column on narrow viewports, two columns on tablets, and three balanced columns on large screens. Give card images a consistent 4:3 aspect ratio using object-cover so cards align evenly regardless of image dimensions.

Intentional Accent Colors
Using a crisp white canvas for 60% of the interface, subtle slate borders and surfaces for 30%, and calm emerald green and ocean blue strictly for primary actions and links keeps learners focused on the material without visual clutter.`,
  },
  {
    id: 'visualizing-trees-and-graphs-for-beginners',
    title: 'Visualizing Trees and Graphs: A Gentle Introduction to Traversal',
    author: 'David Okafor',
    category: 'Computer Science',
    description:
      'Understand breadth-first search, depth-first search, and why hierarchical data structures power routing and UI trees.',
    imageUrl: '/src/assets/images/article_algorithms_dsa_1795493630689.jpg',
    publishedDate: '2026-11-06',
    readTimeMinutes: 8,
    featured: false,
    content: `Trees and graphs often sound intimidating in computer science courses, yet you interact with them every day. The HTML Document Object Model (DOM) and your Angular component hierarchy are both trees: one root node at the top branching down into nested child elements.

Trees vs. General Graphs
A tree is a connected structure with no cycles and a clear parent-to-child direction. A graph generalizes this idea by allowing nodes (vertices) to connect in any pattern, including loops—just like road networks, hyperlink graphs, or social connections.

Breadth-First Search (BFS)
BFS explores a graph level by level using a queue (First-In, First-Out). Imagine ripples expanding outward from a stone dropped in water: you visit all immediate neighbors first before moving two steps away. This makes BFS ideal for finding the shortest path in unweighted graphs.

Depth-First Search (DFS)
DFS follows one branch as deeply as possible before backtracking, using either recursion or an explicit stack. Compilers, dependency resolvers, and DOM query traversals rely heavily on DFS because it naturally mirrors nested structure.`,
  },
  {
    id: 'spaced-repetition-for-learning-programming',
    title: 'How Spaced Repetition Helps You Retain Programming Concepts',
    author: 'Hannah Lindqvist',
    category: 'Study Skills',
    description:
      'Evidence-backed study habits for turning passive tutorial watching into long-term problem-solving fluency.',
    imageUrl: '/src/assets/images/article_study_habits_1795493632451.jpg',
    publishedDate: '2026-11-02',
    readTimeMinutes: 5,
    featured: false,
    content: `Watching three hours of coding videos in one sitting often creates an illusion of mastery. Two days later, facing a blank editor, it can feel hard to remember even how a router or form validator is wired. Cognitive science explains why: memory strengthens through active recall spaced over time.

Build Small Variations Immediately
After finishing a tutorial, close the video and rebuild one small feature from memory. Even creating a simple two-route Angular app with a shared service teaches your brain far more than copying twenty files line by line.

Space Out Your Reviews
Reviewing a concept after 1 day, 3 days, 7 days, and 21 days interrupts the forgetting curve right before knowledge fades. Keep short handwritten or digital study notes summarizing the "why" behind each pattern rather than pasting full code blocks.

Teach What You Just Learned
Writing a short, beginner-friendly tutorial—for example on LearnHub's Add Article page—forces you to organize your mental model into plain English. If you can explain Dependency Injection clearly to someone else, you truly understand it.`,
  },
  {
    id: 'building-validated-reactive-forms-in-angular',
    title: 'Building Validated Reactive Forms in Angular Step by Step',
    author: 'Elena Rostova',
    category: 'Angular',
    description:
      'Create reliable, user-friendly forms with FormBuilder, built-in Validators, and clear inline validation feedback.',
    imageUrl: '/src/assets/images/hero_learnhub_study_1795493630496.jpg',
    publishedDate: '2026-10-28',
    readTimeMinutes: 6,
    featured: false,
    content: `Forms sit at the heart of interactive web applications, whether users are searching a catalog, editing a profile, or publishing a new educational article. Angular offers both Template-Driven Forms and Reactive Forms; for multi-field forms with validation rules, Reactive Forms shine because the entire form model lives explicitly in TypeScript.

Setting Up FormBuilder
Inject FormBuilder into your component and call this.fb.nonNullable.group(...) to declare each field alongside its initial value and array of validators such as Validators.required or Validators.minLength(5).

Giving Helpful Validation Feedback
Avoid showing red error text the instant a page loads. Instead, check whether a control is invalid and either touched by the user or part of a submitted form attempt: control.invalid && (control.touched || submitted). Pair color cues with clear text explaining exactly how to fix the input.

Persisting Form Submissions Locally
Once form.valid is true, pass the typed form value to your Angular service, save the updated collection to localStorage, and redirect the reader directly to their newly published article.`,
  },
];
