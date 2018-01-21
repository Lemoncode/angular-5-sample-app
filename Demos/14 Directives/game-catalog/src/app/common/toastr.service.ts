import { InjectionToken } from '@angular/core';

export const TOASTR_TOKEN = new InjectionToken<string>('toastr');
declare let toastr; // Try with const

export class Toastr {
  success(message: string, title?: string): void {
    if (title) {
      toastr.success(message, title);
    } else {
      toastr.success(message);
    }
  }
  info(message: string, title?: string): void {
    if (title) {
      toastr.info(message, title);
    } else {
      toastr.info(message);
    }
  }
  warning(message: string, title?: string): void {
    if (title) {
      toastr.warning(message, title);
    } else {
      toastr.warning(message);
    }
  }
  error(message: string, title?: string): void {
    if (title) {
      toastr.error(message, title);
    } else {
      toastr.error(message);
    }
  }
}
