import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'http://localhost:8000/api/tarefas';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      catchError(() => of([
        { id: 1, title: 'Tarefa offline 1', completed: false },
        { id: 2, title: 'Tarefa offline 2', completed: true }
      ]))
    );
  }

  addTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { title }).pipe(
      catchError(() => of({
        id: Math.floor(Math.random() * 1000),
        title,
        completed: false
      }))
    );
  }

  removeTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
