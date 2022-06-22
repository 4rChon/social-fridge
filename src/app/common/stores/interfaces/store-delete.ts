export interface StoreDelete<TDelete> {
  delete(entity: TDelete): Promise<void>;
}
