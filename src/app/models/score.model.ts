/**
 * Represents a user's score in a quiz.
 */
export class Score {
  /**
   * Tracks the number of correct answers given by the user.
   * Initialized to 0.
   */
  private correctAnswers = 0;

  /**
   * Increments the count of correct answers by 1.
   */
  incrementCorrect(): void {
    this.correctAnswers++;
  }

  /**
   * Retrieves the current score, which is the number of correct answers.
   * @returns {number} The current score.
   */
  getScore(): number {
    return this.correctAnswers;
  }
}
