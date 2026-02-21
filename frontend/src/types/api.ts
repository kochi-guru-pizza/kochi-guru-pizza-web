// src/types/api.ts
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  name: string;
  message: string;
  details?: ValidationError[];
}
