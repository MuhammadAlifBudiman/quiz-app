/**
 * Represents a question in a quiz.
 */
export class Question {
  /**
   * The text of the question.
   */
  text: string;

  /**
   * The list of options for the question, each containing the option text and a flag indicating if it is correct.
   */
  options: { text: string; isCorrect: boolean }[];

  /**
   * Creates a new Question instance.
   * @param text - The text of the question.
   * @param options - The list of options for the question, where each option includes the text and a boolean indicating if it is correct.
   */
  constructor(text: string, options: { text: string; isCorrect: boolean }[]) {
    this.text = text;
    this.options = options;
  }
}
