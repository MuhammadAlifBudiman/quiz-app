/**
 * CustomDatePipe is an Angular pipe that formats a given date value into a specific string format.
 * It supports a default 'short' format and can be extended for other formats.
 */
import { Pipe, PipeTransform } from '@angular/core';

/**
 * The @Pipe decorator defines the name of the pipe as 'customDate'.
 * This name is used in Angular templates to apply the pipe.
 */
@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  /**
   * Transforms a date value into a formatted string based on the provided format.
   *
   * @param value - The input date value to be formatted. Can be any type but is expected to be a valid date.
   * @param format - The desired format for the date. Defaults to 'short'.
   * @returns A formatted date string or an empty string if the input value is invalid.
   */
  transform(value: any, format: string = 'short'): string {
    // Return an empty string if the input value is null or undefined.
    if (!value) return '';

    // Convert the input value to a Date object.
    const date = new Date(value);

    // Check if the format is 'short' and return the formatted string.
    if (format === 'short') {
      const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad it to 2 digits.
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based) and pad it to 2 digits.
      const year = date.getFullYear(); // Get the full year.
      const hours = String(date.getHours()).padStart(2, '0'); // Get the hours and pad it to 2 digits.
      const minutes = String(date.getMinutes()).padStart(2, '0'); // Get the minutes and pad it to 2 digits.

      // Return the formatted string in 'HH:mm DD/MM/YYYY' format.
      return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    // If the format is not 'short', return the input value as a string.
    return value.toString();
  }
}
