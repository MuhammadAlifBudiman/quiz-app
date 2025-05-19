/**
 * Represents the history of a quiz attempt.
 */
export class History {
  /**
   * The title of the quiz.
   */
  quizTitle: string;

  /**
   * The score achieved in the quiz.
   */
  score: number;

  /**
   * The date when the quiz was attempted.
   */
  date: Date;

  /**
   * The maximum possible score for the quiz.
   */
  maxScore: number;

  /**
   * Creates an instance of the History class.
   * @param quizTitle - The title of the quiz.
   * @param score - The score achieved in the quiz.
   * @param date - The date when the quiz was attempted.
   * @param maxScore - The maximum possible score for the quiz.
   */
  constructor(quizTitle: string, score: number, date: Date, maxScore: number) {
    this.quizTitle = quizTitle;
    this.score = score;
    this.date = date;
    this.maxScore = maxScore;
  }
}
