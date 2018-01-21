import { Component } from '@angular/core';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html'
})
export class TemplateDrivenFormComponent {

  onSubmitTemplateBased(formValues: any) {
    console.log(formValues);
  }
}
