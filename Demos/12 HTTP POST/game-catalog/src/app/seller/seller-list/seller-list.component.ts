import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISeller } from '../../models/seller.model';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html'
})
export class SellerListComponent implements OnChanges {
  @Input() sellers: ISeller[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSellers: ISeller[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterBy']) {
      this.visibleSellers = this.filterSellers(changes['filterBy'].currentValue);
    }
    if (changes['sortBy']) {
      this.sortSellers(changes['sortBy'].currentValue);
    }
  }

  private filterSellers = (filter: string): ISeller[] => (
    this.sellers.filter(
      (s) => filter === 'all' || s.amount > 0
    )
  );

  private sortSellersReaction = {
    ['asc']: (current: ISeller, after: ISeller) => after.price - current.price,
    ['desc']: (current: ISeller, after: ISeller) => current.price - after.price
  };

  private sortSellers = (sortBy: string): void => {
    this.visibleSellers.sort(this.sortSellersReaction[sortBy]);
  }
}
