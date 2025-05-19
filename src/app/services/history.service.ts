import { Injectable } from '@angular/core';
import { History } from '../models/history.model';

/**
 * Injectable service to manage quiz history.
 * This service handles storing, retrieving, and managing quiz history data in localStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  /**
   * Array to store the history of quizzes.
   */
  private history: History[] = [];

  /**
   * Constructor initializes the service and loads history from localStorage.
   */
  constructor() {
    this.loadHistoryFromLocalStorage();
  }

  /**
   * Retrieves the quiz history data from localStorage.
   * @returns {string | null} The JSON string of quiz history or null if not found.
   */
  private getHistoryFromLocalStorage(): string | null {
    return localStorage.getItem('quizHistory');
  }

  /**
   * Parses the JSON string of history data into an array of History objects.
   * @param {string} historyData - The JSON string of history data.
   * @returns {History[]} The parsed array of History objects.
   */
  private parseHistoryData(historyData: string): History[] {
    return JSON.parse(historyData) as History[];
  }

  /**
   * Ensures that all date fields in the history array are properly parsed as Date objects.
   */
  private ensureDatesAreParsed(): void {
    this.history.forEach((entry) => {
      if (entry.date && !(entry.date instanceof Date)) {
        entry.date = new Date(entry.date);
      }
    });
  }

  /**
   * Loads the quiz history from localStorage and parses it into the history array.
   * If parsing fails, it logs an error and resets the history array.
   */
  private loadHistoryFromLocalStorage(): void {
    const historyData = this.getHistoryFromLocalStorage();

    if (!historyData) return;
    try {
      this.history = this.parseHistoryData(historyData);
      this.ensureDatesAreParsed();
    } catch (error) {
      console.error('Error parsing history from localStorage', error);
      this.history = [];
    }
  }

  /**
   * Saves the current history array to localStorage as a JSON string.
   * Logs an error if saving fails.
   */
  private saveHistoryToLocalStorage(): void {
    try {
      localStorage.setItem('quizHistory', JSON.stringify(this.history));
    } catch (error) {
      console.error('Error saving history to localStorage', error);
    }
  }

  /**
   * Adds a new entry to the quiz history.
   * @param {string} quizTitle - The title of the quiz.
   * @param {number} score - The score achieved in the quiz.
   * @param {number} maxScore - The maximum possible score for the quiz.
   */
  addHistoryEntry(quizTitle: string, score: number, maxScore: number): void {
    const newHistory = new History(quizTitle, score, new Date(), maxScore);
    this.history.push(newHistory);
    this.saveHistoryToLocalStorage();
    console.log('History entry added:', newHistory);
  }

  /**
   * Retrieves the quiz history sorted by date in descending order (newest first).
   * @returns {History[]} The sorted array of quiz history.
   */
  getHistory(): History[] {
    return this.history
      .slice()
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
