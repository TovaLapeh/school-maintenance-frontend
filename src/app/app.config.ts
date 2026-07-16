import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { AppConfigService, appConfigInitializer } from './core/services/app-config.service';
import { APP_INITIALIZER } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInitializer,
      deps: [AppConfigService],
      multi: true
    }
  ]
};
