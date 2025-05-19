/**
 * Angular component for displaying the history of quizzes.
 * This component fetches and displays a list of historical quiz data.
 */
import { CommonModule } from '@angular/common'; // Provides common Angular directives and pipes.
import { Component, OnInit } from '@angular/core'; // Base classes for creating Angular components and lifecycle hooks.
import { CustomDatePipe } from '../../pipes/custom-date.pipe'; // Custom pipe for formatting dates.
import { HistoryService } from '../../services/history.service'; // Service for managing and retrieving history data.
import { History } from '../../models/history.model'; // Model representing the structure of a history entry.

/**
 * Component metadata for the HistoryComponent.
 * - selector: The HTML tag used to include this component.
 * - imports: Modules and pipes used in the component.
 * - templateUrl: Path to the HTML template for this component.
 * - styleUrl: Path to the SCSS file for this component.
 */
@Component({
  selector: 'app-history',
  imports: [CommonModule, CustomDatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
/**
 * HistoryComponent class definition.
 * Implements the OnInit lifecycle hook to initialize the component.
 */
export class HistoryComponent implements OnInit {
  /**
   * Array to store the history of quizzes.
   * Populated by the HistoryService.
   */
  history: History[] = [];

  /**
   * Constructor for the HistoryComponent.
   * @param historyService - Injected service for retrieving history data.
   */
  constructor(private historyService: HistoryService) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Fetches the history data from the HistoryService.
   */
  ngOnInit(): void {
    this.history = this.historyService.getHistory();
  }
}
