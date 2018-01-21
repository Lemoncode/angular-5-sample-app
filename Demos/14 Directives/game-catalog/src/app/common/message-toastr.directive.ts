import { Directive, ElementRef, OnInit, Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from './toastr.service';

@Directive({
  selector: '[appMessageToastr]'
})
export class MessageToastrDirective implements OnInit {
  private element: HTMLElement;

  constructor(ref: ElementRef, @Inject(TOASTR_TOKEN) private toastr: Toastr) {
    this.element = ref.nativeElement;
  }

  ngOnInit(): void {
    this.element.addEventListener('click', (evt) => {
      const rowElement = this.element.querySelector('.row');
      const gameName = this.element.querySelector('.gameName').innerHTML;
      this.toastr.success(`Selected game: ${gameName}`);
    });
  }
}
