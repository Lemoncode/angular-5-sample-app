import { Injectable } from '@angular/core';
import { ISellerCategory } from '../models/sellerCategory.model';

const SELLERCATEGORIES: ISellerCategory[] = [
  {
    id: 1,
    name: 'National',
    taxes: [
      {
        id: 1,
        name: 'I.V.A.',
        amount: 0.21,
      },
      {
        id: 3,
        name: 'exempt',
        amount: 0,
      }
    ],
  },
  {
    id: 2,
    name: 'European',
    taxes: [
      {
        id: 2,
        name: 'european external tariff',
        amount: 0.17,
      },
      {
        id: 3,
        name: 'exempt',
        amount: 0,
      }
    ]
  },
  {
    id: 3,
    name: 'Foreign',
    taxes: [
      {
        id: 4,
        name: 'foreign external tariff',
        amount: 0.47,
      },
      {
        id: 5,
        name: 'special tariff',
        amount: 0.26,
      }
    ]
  }
];

@Injectable()
export class SellerCategoryService {
  getSellerCategories() {
    return SELLERCATEGORIES;
  }
}
