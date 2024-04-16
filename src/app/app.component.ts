import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
 
  constructor(private sanitizer: DomSanitizer) {
  }
 
  iframeSrc!: SafeUrl;
  quizName!: string;
  quizs!: {
    question: string, 
    playerAnswer: string, 
    answer: string,
    possibleAnswers: string[], 
    visible: boolean, 
    hasAnswered: boolean, 
    hasGoodAnswer: boolean, 
    useFourChoices: boolean,
    fourChoises: string[],
    elements: {
      urlPicture?: string, 
      hasPicture: boolean, 
      widthPicture?: number,
      heightPicture?: number,
      urlVideo?: SafeUrl, 
      widthVideo?: number,
      heightVideo?: number,
      hasVideo: boolean
    },
  }[];
  points: number = 0;

  ngOnInit() {
    this.quizName = "PERSONNAGES";

    //questions ---------------------------------------
    this.quizs = 
    [
      // Question 1
        {
          question: "Qui est ce personnage ?", 
          playerAnswer: "", 
          answer: "Eikichi Onizuka",
          possibleAnswers: ["EIKICHI ONIZUKA", "GTO", "ONIZUKA", "ONIZUKA EIKICHI"],
          visible: true, 
          hasAnswered: false, 
          hasGoodAnswer: false, 
          useFourChoices: false, 
          fourChoises: [
            "Ekishi Onizuka", 
            "Nef", 
            "Eikichi Onizuka", 
            "Ekichi Onizuka"
          ],
          elements: {
            hasPicture: true,
            urlPicture: "data:image/jpeg;base64,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",
            widthPicture: 164,
            heightPicture: 120,
            hasVideo: false
          }
        },
      // Question 2
        {
          question: "Qui est ce personnage ?", 
          playerAnswer: "", 
          answer: "Silver Wolf", 
          possibleAnswers: ["LA WAIFU DE RYU", "SILVER WOLF"],
          visible: true, 
          hasAnswered: false, 
          hasGoodAnswer: false, 
          useFourChoices: false, 
          fourChoises: [
            "Silver Rabbit", 
            "La waifu de Ryu", 
            "Platinium Wolf", 
            "Silver Wolf"
          ],
          elements: {
            urlPicture: "https://assetsio.gnwcdn.com/Honkai-Star-Rail-Silver-Wolf-best-build%2C-Ascension-materials%2C-Trace-materials%2C-team%2C-and-Light-Cone-cover.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
            widthPicture: 164,
            heightPicture: 120,
            hasPicture: true,
            hasVideo: false
          }
        },
      // Question 3
        {
          question: "Qui est ce personnage ?", 
          playerAnswer: "", 
          answer: "Doctor Who", 
          possibleAnswers: ["DOCTOR WHO", "LE DOCTEUR", "DR WHO"],
          visible: true, 
          hasAnswered: false, 
          hasGoodAnswer: false, 
          useFourChoices: false, 
          fourChoises: [
          "Tki toi", 
          "Docteur Lui", 
          "Doctor Who", 
          "Doctor Wuu"
        ],
        elements: {
          hasPicture: true,
          widthPicture: 164,
          heightPicture: 120,
          urlPicture: "https://www.critictoo.com/wp-content/uploads/2015/12/David-Tennant-Doctor-Who.jpg",
          hasVideo: false
        }
      },
    ]
    //----------------------------------------------------
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
    let array: boolean[] = [];
    this.quizs[i].possibleAnswers.forEach(e => {
      array.push(playerAnswer.toUpperCase() === e);
    })
    this.quizs[i].hasGoodAnswer = array.includes(true);
    if(this.quizs[i].hasGoodAnswer && !this.quizs[i].useFourChoices) {
      this.points = this.points + 3;
    } else if (this.quizs[i].hasGoodAnswer && this.quizs[i].useFourChoices) {
      this.points = this.points + 1;
    }
    console.error(this.points); 
    this.quizs[i].visible = !this.quizs[i].visible;
  }
  title = 'Quiz';
}
