export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findByEmail(email: string): Promise<T | null>;
    findAll(): Promise<T[]|null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
  }