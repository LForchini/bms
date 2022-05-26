export interface Book {
  id: number;

  title: string;

  author: Person;
  authorId: number;

  reviews: Review[];
}

export interface Person {
  id: number;

  name: string;
}

export interface Review {
  id: number;
  title: string;
  body: string;
}
