import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pessoa } from './models/pessoa';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TodoListAngular';
  http = inject(HttpClient);
  urlApi = 'http://localhost:7233';
  pessoas: Pessoa[] = [];
  
  ngOnInit(): void {
    this.obterPessoas();
  }

  obterPessoas() {
    this.http.get<Pessoa[]>(`${this.urlApi}/pessoas`)
      .subscribe(pessoas => this.pessoas = pessoas)
  }
}
