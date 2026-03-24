export interface InputForm {
  type: "email" | "text" | "password";
  label: string;
  title?: string;
  showPassword?: boolean;
  focus?: boolean;
}

export interface ButtonForm {
  content: string;
  type: number;
}
