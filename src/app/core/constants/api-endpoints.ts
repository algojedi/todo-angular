
// src/app/core/constants/api-endpoints.ts

import { environment } from "../../../environments/environment";

export const api = {
  todos: {
    list: `${environment.apiBaseUrl}/todos`,
    getById: (id: string | number) => `${environment.apiBaseUrl}/todos/${id}`,
    create: `${environment.apiBaseUrl}/todos`,
    update: (id: string | number) => `${environment.apiBaseUrl}/todos/${id}`,
    delete: (id: string | number) => `${environment.apiBaseUrl}/todos/${id}`,
  },
  users: {
    list: `${environment.apiBaseUrl}/users`,
    login: `${environment.apiBaseUrl}/auth/login`,
    register: `${environment.apiBaseUrl}/auth/register`,
  },
};
