import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface AppConfig {
  apiBaseUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: AppConfig | null = null;

  async load(): Promise<void> {
    try {
      const response = await fetch('/assets/app-config.json');
      this.config = await response.json();
    } catch {
      this.config = { apiBaseUrl: environment.apiBaseUrl };
    }
  }

  get apiBaseUrl(): string {
    return this.config?.apiBaseUrl ?? environment.apiBaseUrl;
  }
}

export function appConfigInitializer(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}
