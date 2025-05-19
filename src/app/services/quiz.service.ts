/**
 * Service to manage quizzes and scores.
 * Provides methods to load quizzes, retrieve quizzes, and manage scores.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { Score } from '../models/score.model';
import { firstValueFrom, map } from 'rxjs';

/**
 * Path to the JSON file containing quiz data.
 */
const QUIZZ_FILE_PATH = 'quizzes.json';

@Injectable({
  providedIn: 'root',
})
/**
 * QuizService is responsible for handling quiz data and user scores.
 */
export class QuizService {
  /**
   * Array to store quizzes loaded from the JSON file.
   */
  private quizzes: Quiz[] = [];

  /**
   * Instance of Score to track the user's score.
   */
  private score = new Score();

  /**
   * Promise to ensure quizzes are loaded before accessing them.
   */
  private quizzesLoaded: Promise<void>;

  /**
   * Constructor to initialize the QuizService.
   * @param http - HttpClient to fetch quiz data from the JSON file.
   */
  constructor(public http: HttpClient) {
    this.quizzesLoaded = this.loadQuizzesFromJson(QUIZZ_FILE_PATH);
  }

  /**
   * Loads quizzes from a JSON file and maps them to Quiz objects.
   * @param jsonPath - Path to the JSON file containing quiz data.
   * @returns A promise that resolves when quizzes are loaded.
   */
  private loadQuizzesFromJson(jsonPath: string): Promise<void> {
    return firstValueFrom(
      this.http.get<Quiz[]>(jsonPath).pipe(
        map((quizzes) => {
          this.quizzes = quizzes.map(
            (quiz) => new Quiz(quiz.title, quiz.questions)
          );
        })
      )
    )
      .then(() => {
        console.log('Quizzes loaded successfully');
      })
      .catch((error) => {
        console.log('Failed to load quizzes ', error);
      });
  }

  /**
   * Retrieves a specific quiz by its index.
   * @param index - Index of the quiz to retrieve.
   * @returns A promise that resolves to the requested Quiz object.
   */
  async getQuiz(index: number): Promise<Quiz> {
    await this.quizzesLoaded;
    return this.quizzes[index];
  }

  /**
   * Retrieves all quizzes.
   * @returns A promise that resolves to an array of Quiz objects.
   */
  async getQuizzes(): Promise<Quiz[]> {
    await this.quizzesLoaded;
    return this.quizzes;
  }

  /**
   * Adds a new quiz to the list of quizzes.
   * @param newQuiz - The new Quiz object to add.
   */
  addQuiz(newQuiz: Quiz): void {
    this.quizzes.push(newQuiz);
  }

  /**
   * Retrieves the current score.
   * @returns The current Score object.
   */
  getScore(): Score {
    return this.score;
  }

  /**
   * Increments the score for a correct answer.
   */
  incrementScore(): void {
    this.score.incrementCorrect();
  }

  /**
   * Resets the score to its initial state.
   */
  resetScore(): void {
    this.score = new Score();
  }
}
