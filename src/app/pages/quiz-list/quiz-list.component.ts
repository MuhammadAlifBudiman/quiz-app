/**
 * Angular component for displaying a list of quizzes.
 * This component fetches quizzes from the QuizService and displays them in a list.
 * Users can select a quiz to navigate to its details.
 */
import { CommonModule } from '@angular/common'; // Provides common Angular directives like ngIf and ngFor.
import { Component, OnInit } from '@angular/core'; // Base classes for creating Angular components and lifecycle hooks.
import { Router, RouterModule } from '@angular/router'; // Router for navigation and RouterModule for routing-related directives.
import { Quiz } from '../../models/quiz.model'; // Model representing a quiz structure.
import { QuizService } from '../../services/quiz.service'; // Service for fetching quiz data.

/**
 * Component metadata for QuizListComponent.
 * - selector: The HTML tag to use for this component.
 * - imports: Modules required by this component.
 * - templateUrl: Path to the HTML template.
 * - styleUrl: Path to the SCSS styles.
 */
@Component({
  selector: 'app-quiz-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss',
})
export class QuizListComponent implements OnInit {
  /**
   * Array to store the list of quizzes fetched from the service.
   */
  quizzes: Quiz[] = [];

  /**
   * Constructor to inject required services.
   * @param quizService Service to fetch quiz data.
   * @param router Service to handle navigation.
   */
  constructor(private quizService: QuizService, private router: Router) {}

  /**
   * Lifecycle hook that runs after the component is initialized.
   * Fetches the list of quizzes from the QuizService.
   */
  async ngOnInit(): Promise<void> {
    try {
      // Fetch quizzes and assign them to the quizzes array.
      this.quizzes = await this.quizService.getQuizzes();
    } catch (err) {
      // Log an error if fetching quizzes fails.
      console.error('Failed to load quizzes:', err);
    }
  }

  /**
   * Navigates to the quiz page for the selected quiz.
   * @param index Index of the selected quiz in the quizzes array.
   */
  takeQuiz(index: number): void {
    this.router.navigate(['/quiz', index]);
  }
}
