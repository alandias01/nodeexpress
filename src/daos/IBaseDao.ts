export interface IBaseDao<T> {
  getAll: () => Promise<T[]>;
  get: (where: {}) => Promise<T[]>;
  getById: (id: any) => Promise<T>;
  add: (add: T) => Promise<T>;
  update: (update: T) => Promise<T>;
  delete: (itemToDelete: T) => Promise<T>;
}
