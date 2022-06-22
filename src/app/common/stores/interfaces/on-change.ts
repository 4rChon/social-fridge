import { Subscription } from "rxjs";

export interface OnChange<TEntity> {
  onChange(fn: (entity: TEntity) => void): Subscription;
}
