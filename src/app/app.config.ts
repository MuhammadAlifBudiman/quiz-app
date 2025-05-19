/**
 * Importing necessary modules and functions from Angular core and router.
 * - ApplicationConfig: Interface for configuring the application.
 * - provideZoneChangeDetection: Function to configure zone change detection.
 * - provideRouter: Function to configure application routes.
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

/**
 * Importing application-specific routes from the app.routes file.
 */
import { routes } from './app.routes';

/**
 * Importing provideHttpClient to enable HTTP client functionality in the application.
 */
import { provideHttpClient } from '@angular/common/http';

/**
 * Application configuration object.
 * This object defines the providers used throughout the application.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Configures zone change detection with event coalescing enabled.
     * Event coalescing improves performance by reducing the number of change detection cycles.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Configures the router with the application's routes.
     */
    provideRouter(routes),

    /**
     * Enables HTTP client functionality for making HTTP requests.
     */
    provideHttpClient(),
  ],
};
