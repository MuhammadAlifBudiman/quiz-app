/**
 * Defines the routes for the Angular application.
 * Each route maps a URL path to a specific component.
 */
import { Routes } from '@angular/router';

/**
 * Component for displaying the list of quizzes.
 */
import { QuizListComponent } from './pages/quiz-list/quiz-list.component';

/**
 * Component for displaying a specific quiz based on the index parameter in the URL.
 */
import { QuizComponent } from './components/quiz/quiz.component';

/**
 * Component for creating a new quiz.
 */
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';

/**
 * Component for displaying the history of quizzes.
 */
import { HistoryComponent } from './pages/history/history.component';

/**
 * Array of route definitions for the application.
 * Each route object contains a `path` and the corresponding `component` to render.
 */
export const routes: Routes = [
  /**
   * Default route that displays the QuizListComponent.
   */
  { path: '', component: QuizListComponent },

  /**
   * Route for displaying a specific quiz. The `:index` is a route parameter.
   */
  { path: 'quiz/:index', component: QuizComponent },

  /**
   * Route for displaying the list of quizzes.
   */
  { path: 'quiz-list', component: QuizListComponent },

  /**
   * Route for creating a new quiz.
   */
  { path: 'create-quiz', component: CreateQuizComponent },

  /**
   * Route for displaying the history of quizzes.
   */
  { path: 'history', component: HistoryComponent },
];
