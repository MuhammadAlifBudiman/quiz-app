import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { CommonModule } from '@angular/common';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../../services/history.service';

/**
 * Component for displaying and managing a quiz.
 * Handles quiz loading, user interactions, and score tracking.
 */
@Component({
  selector: 'app-quiz', // The selector used to include this component in templates.
  imports: [QuestionComponent, CommonModule], // Modules and components used by this component.
  templateUrl: './quiz.component.html', // Path to the HTML template.
  styleUrl: './quiz.component.scss', // Path to the SCSS styles.
})
export class QuizComponent implements OnInit, OnDestroy {
  /**
   * The current quiz being displayed.
   * Initialized as null until the quiz is loaded.
   */
  quiz: Quiz | null = null;

  /**
   * Index of the current quiz question.
   */
  currentQuizIndex = 0;

  /**
   * Set to track the indices of questions that have been answered.
   */
  answeredQuestions = new Set<number>();

  /**
   * Constructor to inject required services.
   * @param quizService Service to manage quiz data and scores.
   * @param route Service to access route parameters.
   * @param router Service to navigate between routes.
   * @param historyService Service to manage quiz history.
   */
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private historyService: HistoryService
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Resets the score and loads the quiz data.
   */
  async ngOnInit(): Promise<void> {
    this.quizService.resetScore();
    await this.loadQuiz();
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Navigates back to the main menu.
   */
  ngOnDestroy(): void {
    this.router.navigate(['/']);
  }

  /**
   * Loads the quiz data based on the index from the route parameters.
   * Handles errors by navigating back to the main menu.
   */
  private async loadQuiz(): Promise<void> {
    const quizIndex = Number(this.route.snapshot.paramMap.get('index'));

    try {
      this.quiz = await this.quizService.getQuiz(quizIndex);
    } catch (error) {
      console.error('Failed to load quiz:', error);
      this.router.navigate(['/']);
    }
  }

  /**
   * Handles the user's answer to a question.
   * @param isCorrect Whether the answer is correct.
   * @param questionIndex The index of the question being answered.
   */
  handleAnswer(isCorrect: boolean, questionIndex: number): void {
    if (this.answeredQuestions.has(questionIndex)) return;
    this.answeredQuestions.add(questionIndex);
    if (!isCorrect) return;
    this.quizService.incrementScore();
  }

  /**
   * Checks if the quiz is complete.
   * @returns True if all questions have been answered, false otherwise.
   */
  isQuizComplete(): boolean {
    if (!this.quiz) return false;
    if (this.answeredQuestions.size >= this.quiz.questions.length) {
      return true;
    }
    return false;
  }

  /**
   * Gets the current score.
   * @returns The current score.
   */
  getScore(): number {
    return this.quizService.getScore().getScore();
  }

  /**
   * Gets the maximum possible score for the quiz.
   * @returns The total number of questions in the quiz.
   */
  getMaxScore(): number {
    return this.quiz ? this.quiz.questions.length : 0;
  }

  /**
   * Calculates the score percentage.
   * @returns The percentage of correct answers.
   */
  getScorePercentage(): number {
    const score = this.getScore();
    const maxScore = this.getMaxScore();
    const result = maxScore ? (score / maxScore) * 100 : 0;
    console.log(result);
    return result;
  }

  /**
   * Adds the current quiz and score to the history.
   */
  addToHistory(): void {
    if (!this.quiz) return;
    const score = this.getScore();
    const maxScore = this.getMaxScore();
    this.historyService.addHistoryEntry(this.quiz.title, score, maxScore);
  }

  /**
   * Navigates back to the main menu.
   */
  goToMainMenu(): void {
    this.router.navigate(['/']);
  }
}
