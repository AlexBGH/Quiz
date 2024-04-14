import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  quizName!: string;
  question!: string;
  response!: string;
  quizs!: {question: string, response: string}[]

  ngOnInit() {
    this.quizName = "BLAGUE";
    this.quizs = [
      {question: "Quel est le résultat de 1+1 ?", response: "2"},
      {question: "Quel est la distance du couloir de Misha ?", response: "300 mètres"},
      {question: "Qui a dit : <<j'ai jamais dit ça>> ?", response: "Ninu"},
    ]
  }
  
  title = 'Quiz';
}
