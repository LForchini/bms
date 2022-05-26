import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Book from "./Book.model";

@Table
export default class Review extends Model {
  @Column({
    type: DataType.STRING,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
  })
  body!: string;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  bookId!: number;

  @BelongsTo(() => Book)
  book!: Book;
}
