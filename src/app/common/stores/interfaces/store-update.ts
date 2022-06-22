export interface StoreUpdate<TUpdate> {
  update(entity: TUpdate): Promise<void>;
}
