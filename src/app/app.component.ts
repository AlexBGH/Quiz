import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  quizName!: string;
  quizs!: {
    question: string, 
    playerAnswer: string, 
    answer: string, visible: boolean, 
    hasAnswered: boolean, 
    hasGoodAnswer: boolean, 
    useFourChoices: boolean,
    fourChoises: string[],
    elements: {
      urlPicture?: string, 
      hasPicture: boolean,
      urlVideo?: string, 
      widthVideo?: number,
      heightVideo?: number,
      hasVideo: boolean
    },
  }[];
  points: number = 0;

  ngOnInit() {
    this.quizName = "ANIME";
    this.quizs = 
    [
        {
          question: "Quel est le résultat de 1+1 ?", 
          playerAnswer: "", answer: "2", 
          visible: true, 
          hasAnswered: false, 
          hasGoodAnswer: false, 
          useFourChoices: false, 
          fourChoises: [
            "4", 
            "2", 
            "6", 
            "8"
          ],
          elements: {
            hasPicture: false,
            hasVideo: false
          }
        },
        {
          question: "Quel est le résultat de 2+2 ?", 
          playerAnswer: "", 
          answer: "4", 
          visible: true, 
          hasAnswered: false, 
          hasGoodAnswer: false, 
          useFourChoices: false, 
          fourChoises: [
            "6", 
            "4", 
            "2", 
            "8"
          ],
          elements: {
            urlPicture: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            urlVideo: "https://www.youtube.com/embed/tgbNymZ7vqY",
            widthVideo: 100,
            heightVideo: 100,
            hasPicture: true,
            hasVideo: true
          }
        },
        {
          question: "Quel est le résultat de 3+3 ?", 
          playerAnswer: "", 
          answer: "6", 
          visible: true, 
          hasAnswered: false, 
          hasGoodAnswer: false, 
          useFourChoices: false, 
          fourChoises: [
          "8", 
          "4", 
          "6", 
          "2"
        ],
        elements: {
          hasPicture: false,
          hasVideo: false
        }
      },
    ]
  }
  onClickPlayerAnswer(playerAnswer: string, i: number) {
    if(!this.quizs[i].hasAnswered) {
      this.onSubmit(playerAnswer, i);
      this.quizs[i].hasAnswered = !this.quizs[i].hasAnswered;
    }
  }
  onClickFourChoices(useFourChoices: boolean, i: number) {
    this.quizs[i].useFourChoices = !useFourChoices;
  }
  onSubmit(playerAnswer: string, i: number) {
    this.quizs[i].playerAnswer = playerAnswer;
    this.quizs[i].hasGoodAnswer = (playerAnswer === this.quizs[i].answer)
    if(this.quizs[i].hasGoodAnswer && !this.quizs[i].useFourChoices) {
      this.points = this.points + 3;
    } else if (this.quizs[i].hasGoodAnswer && this.quizs[i].useFourChoices) {
      this.points = this.points + 1;
    }
    this.quizs[i].visible = !this.quizs[i].visible;
  }
  title = 'Quiz';
}
