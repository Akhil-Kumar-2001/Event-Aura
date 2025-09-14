import { Model, Document } from "mongoose";
import { IBaseRepository } from "../interface/IBaseRepository";

export abstract class BaseRepository<T extends Document>
  implements IBaseRepository<T> {
  //   private model: Model<T>;

  constructor(private model: Model<T>) {
    // this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findByEmail(email: string): Promise<T | null> {
    return this.model.findOne({ email }).exec();
  }

  async findAll(): Promise<T[] | null> {
    return this.model.find().exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}