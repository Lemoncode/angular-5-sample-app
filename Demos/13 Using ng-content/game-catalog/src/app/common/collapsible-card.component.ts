import { Component, Input  } from '@angular/core';

@Component({
  selector: 'collapsible-card',
  template: `
    <div (click)="toggleContent()">
      <h4>
        <ng-content select="[card-title]"></ng-content>
      </h4>
      <ng-content *ngIf="visible" select="[card-body]"></ng-content>
    </div>
  `,
  styles: [`
    .pointable { cursor: pointer; }
  `]
})
export class CollapsibleCardComponent {
  visible = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
