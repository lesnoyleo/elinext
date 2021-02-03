export interface Data {
  data: User[];
  total: number;
  page: number;
  limit: number;
  offset: number;
}

export interface User {
    id: string;
    lastName: string;
    firstName: string;
    email: string;
    title: string;
    picture: string;
  }
