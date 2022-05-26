import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasOne,
  ForeignKey,
} from "sequelize-typescript";
import Person from "./Person.model";
import Review from "./Review.model";

@Table
export default class Book extends Model {
  @Column({
    type: DataType.STRING,
  })
  title!: string;

  @ForeignKey(() => Person)
  @Column({ type: DataType.INTEGER })
  authorId!: number;

  @BelongsTo(() => Person)
  author!: Person;

  @HasOne(() => Review)
  review!: Review;
}
