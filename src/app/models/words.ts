export interface Word {
  id: number;
  state: string;
  word: string;

  videos?: Video[];
}

export interface Video {
  id: number;
  state: string;
  path: string;
  preview: string;
  region: string;
  uploaded_by: {
    email: string;
    first_name: string;
    first_surname: string;
    id: number;
    password: string;
    role: number;
    second_name: string;
    second_surname: string;
    state: string;
  };
  uploaded_date: string;
}
