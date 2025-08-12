import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { Todo, TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Todo List';
  todos: Todo[] = [];
  newTodo: string = '';
  isLoading = false;
  errorMsg: string | null = null;

  constructor(
  private readonly todoService: TodoService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTodos();
  }

  // Load todos from the server
  loadTodos() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.onError('Erro ao carregar tarefas.');
      }
    });
  }

  // Add a new todo
  addTodo() {
    const title = this.newTodo.trim();
    if (!title) return;
    this.isLoading = true;
    this.todoService.addTodo(title).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.newTodo = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.onError('Erro ao adicionar tarefa.');
      }
    });
  }

  // Remove a todo
  removeTodo(id: number) {
    this.isLoading = true;
    this.todoService.removeTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.isLoading = false;
      },
      error: (err) => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.isLoading = false;
        this.onError('Erro ao remover tarefa.');
      }
    });
  }

  // Handle errors
  onError(errorMsg: string) {
    this.errorMsg = errorMsg;
    alert(errorMsg);
  }
}
