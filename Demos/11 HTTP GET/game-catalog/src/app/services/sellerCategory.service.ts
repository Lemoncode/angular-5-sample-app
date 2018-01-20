import { Injectable } from '@angular/core';
import { ISellerCategory } from '../models/sellerCategory.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SellerCategoryService {
  constructor (private http: HttpClient) {}

  getSellerCategories(): Observable<ISellerCategory[]> {
    return this.http.get<ISellerCategory[]>('/api/sellercategories');
  }
}
