import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { Quiz } from '../../models/quiz.model';

/**
 * Component for creating a new quiz.
 * Provides a form to input quiz title, questions, and options.
 */
@Component({
  selector: 'app-create-quiz', // The selector used in HTML to include this component.
  imports: [CommonModule, ReactiveFormsModule], // Modules required for this component.
  templateUrl: './create-quiz.component.html', // Path to the HTML template.
  styleUrl: './create-quiz.component.scss', // Path to the SCSS stylesheet.
})
export class CreateQuizComponent {
  /**
   * The main form group for the quiz creation form.
   * Contains controls for the quiz title and an array of questions.
   */
  quizForm: FormGroup;

  /**
   * Constructor to initialize the form and inject required services.
   * @param fb - FormBuilder for creating reactive forms.
   * @param quizService - Service to handle quiz-related operations.
   * @param router - Router for navigation.
   */
  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {
    // Initialize the form with a title and an empty array of questions.
    this.quizForm = this.fb.group({
      title: ['', Validators.required], // Title is required.
      questions: this.fb.array([]), // Array to hold questions.
    });
  }

  /**
   * Getter for the questions FormArray.
   * @returns FormArray containing all questions in the form.
   */
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  /**
   * Retrieves the options FormArray for a specific question.
   * @param questionIndex - Index of the question in the questions array.
   * @returns FormArray containing all options for the specified question.
   */
  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  /**
   * Creates a new question FormGroup.
   * @returns FormGroup representing a question with text and options.
   */
  createQuestion(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required], // Question text is required.
      options: this.fb.array([this.createOption()]), // Initialize with one option.
    });
  }

  /**
   * Creates a new option FormGroup.
   * @returns FormGroup representing an option with text and correctness flag.
   */
  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required], // Option text is required.
      isCorrect: [false], // Default value for correctness is false.
    });
  }

  /**
   * Adds a new question to the questions array.
   */
  addQuestion(): void {
    this.questions.push(this.createQuestion());
    console.log(`Question added. Total questions: ${this.questions.length}`);
  }

  /**
   * Removes a question from the questions array.
   * @param index - Index of the question to remove.
   */
  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  /**
   * Adds a new option to a specific question.
   * @param questionIndex - Index of the question to add the option to.
   */
  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.createOption());
  }

  /**
   * Removes an option from a specific question.
   * @param questionIndex - Index of the question containing the option.
   * @param optionIndex - Index of the option to remove.
   */
  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  /**
   * Handles form submission.
   * Validates the form, creates a new quiz, and navigates to the home page.
   */
  onSubmit(): void {
    if (!this.quizForm.valid) {
      console.error('Form is not valid');
    }
    const newQuiz: Quiz = this.quizForm.value; // Extract form values as a Quiz object.
    this.quizService.addQuiz(newQuiz); // Add the new quiz using the service.
    this.router.navigate(['/']); // Navigate to the home page.
  }
}
