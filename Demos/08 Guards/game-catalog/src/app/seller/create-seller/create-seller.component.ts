import { Component, OnInit } from '@angular/core';
import { SellerCategoryService } from '../../services/sellerCategory.service';
import { ISellerCategory } from '../../models/sellerCategory.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

const nameValid = (control: FormControl): { [key: string]: any } => {
  const firstLetter = control.value.toString()[0];
  return (!!firstLetter && (firstLetter !== firstLetter.toUpperCase())) ?
    { 'nameValid': 'invalid name' } : null;
};

const restrictedWords = (words: string[]) => (control: FormControl) => {
  const input: string = control.value.toString();
  const foundForbiddenWord = words.some((w) => input.includes(w));
  return (foundForbiddenWord) ?
    { 'restrictedWords': 'restricted word used' } : null;
};

@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styles: [`
        em { color: #E05C65; padding-left: 10px; }
        .error input, .error select, .error textarea { background-color:#E3C3C5; }
        .error :: -webkit-input-placeholder { color: #999; }
        .error :: -moz-placeholder { color: #999; }
        .error :: -ms-input-placeholder { color: #999; }
    `]
})
export class CreateSellerComponent implements OnInit {
  categoryLookupCollection: Array<any>;
  taxesByCategory: Array<any>;
  taxLookupCollection: Array<any> = [];
  newSellerForm: FormGroup;
  category: FormControl;
  tax: FormControl;
  name: FormControl;
  remarks: FormControl;

  constructor(private sellerCategoryService: SellerCategoryService) { }

  onChangeCategory(value) {
    this.taxLookupCollection = this.taxesByCategory
      .filter((tax) => tax.categoryId === +value)
      .map((t) => ({
        id: t.id,
        name: t.name
      }));
    this.tax.setValue('');
    this.tax.enable();
  }

  saveSeller(formValues) {
    console.log(formValues);
  }

  ngOnInit() {
    this.category = new FormControl('', Validators.required);
    this.tax = new FormControl('', Validators.required);
    this.name = new FormControl('', [Validators.required, nameValid]);
    this.remarks = new FormControl('', [restrictedWords(['jaime'])]);
    this.newSellerForm = new FormGroup({
      category: this.category,
      tax: this.tax,
      name: this.name,
      remarks: this.remarks
    });
    this.tax.disable();
    const categories: ISellerCategory[] = this.sellerCategoryService.getSellerCategories();
    this.categoryLookupCollection = categories
      .map(
        (c) => ({
          id: c.id,
          name: c.name
        })
      );

    let taxesNormalized: Array<any> = [];
    categories.forEach((c) => {
      const taxesByCategoryTemp = c.taxes
        .map((t) => ({
          categoryId: c.id,
          id: t.id,
          name: t.name
        }));
      taxesNormalized = taxesNormalized.concat(taxesByCategoryTemp);
    });
    this.taxesByCategory = taxesNormalized;
  }

}
