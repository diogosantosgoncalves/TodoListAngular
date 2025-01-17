import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pessoa } from './models/pessoa';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TodoListAngular';
  http = inject(HttpClient);
  urlApi = 'https://localhost:7233';
  pessoas$?: Observable<Pessoa[]>;

  pessoaEncontrada$?: Observable<Pessoa>;

  valorBuscaPessoa = '';
  nomeAdicionar = '';
  
  ngOnInit(): void {
    this.obterPessoas();
  }

  obterPessoas() {
    this.pessoas$ = this.http.get<Pessoa[]>(`${this.urlApi}/pessoas`);
  }

  buscarPessoa() {
    if(!this.valorBuscaPessoa)
      return;
  this.pessoaEncontrada$ = this.http.get<Pessoa>(`${this.urlApi}/pessoas/${this.valorBuscaPessoa}`)
  }

  adicionarPessoa(){
    const pessoaAdicionar: Pessoa = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      nome: this.nomeAdicionar
    }

    this.http.post<void>(`${this.urlApi}/pessoas`, pessoaAdicionar).subscribe(_ => {
      this.obterPessoas();
      this.nomeAdicionar = '';
    });
  }
}
