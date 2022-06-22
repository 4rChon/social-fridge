export interface StoreAdd<TAdd> {
  add(entity: TAdd): Promise<void>;
}
