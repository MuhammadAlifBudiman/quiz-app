/**
 * Angular component representing a single question in a quiz.
 * This component displays a question and its options, and emits an event when an option is selected.
 */
import { CommonModule } from '@angular/common'; // Importing Angular's CommonModule for common directives.
import { Component, EventEmitter, Input, Output } from '@angular/core'; // Importing necessary Angular core modules.
import { Question } from '../../models/question.model'; // Importing the Question model to define the structure of the question input.

/**
 * Component metadata for the QuestionComponent.
 */
@Component({
  selector: 'app-question', // The selector used to include this component in templates.
  imports: [CommonModule], // Declares the modules required by this component.
  templateUrl: './question.component.html', // Path to the HTML template for this component.
  styleUrl: './question.component.scss', // Path to the SCSS file for this component's styles.
})
export class QuestionComponent {
  /**
   * The question to be displayed by this component.
   * This input is required and must conform to the Question model.
   */
  @Input() question!: Question;

  /**
   * Event emitter that emits a boolean value indicating whether the selected option is correct.
   */
  @Output() answerSelected = new EventEmitter<boolean>();

  /**
   * Method to handle the selection of an option.
   * Emits the correctness of the selected option via the answerSelected event.
   *
   * @param isCorrect - A boolean indicating if the selected option is correct.
   */
  selectOption(isCorrect: boolean) {
    this.answerSelected.emit(isCorrect);
  }
}
