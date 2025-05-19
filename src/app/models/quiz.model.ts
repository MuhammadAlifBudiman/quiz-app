import { Question } from './question.model';

/**
 * Represents a Quiz which contains a title and a list of questions.
 */
export class Quiz {
  /**
   * The title of the quiz.
   */
  title: string;

  /**
   * An array of questions included in the quiz.
   */
  questions: Question[];

  /**
   * Creates an instance of a Quiz.
   * @param title - The title of the quiz.
   * @param questions - The list of questions for the quiz.
   */
  constructor(title: string, questions: Question[]) {
    this.title = title;
    this.questions = questions;
  }
}
