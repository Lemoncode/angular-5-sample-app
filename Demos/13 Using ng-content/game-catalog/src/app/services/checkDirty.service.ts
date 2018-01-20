import { InjectionToken } from '@angular/core';
import { CreateGameComponent } from '../game/create-game/create-game.component';

export let CHECKDIRTY_TOKEN = new InjectionToken('checkDirty');

export function checkDirtyState(component: CreateGameComponent) {
  if (component.isDirty) {
    return window.confirm('You do not saved, do yo really want to cancel?')
  }
  return true;
}
