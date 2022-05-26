import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Book from "./Book.model";

@Table
export default class Person extends Model {
  @Column({ type: DataType.STRING })
  name!: string;

  @HasMany(() => Book)
  books!: Book[];
}
