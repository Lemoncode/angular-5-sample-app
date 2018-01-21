import { ITax } from './tax.model';

export interface ISellerCategory {
  id: number;
  name: string;
  taxes: Array<ITax>;
}
