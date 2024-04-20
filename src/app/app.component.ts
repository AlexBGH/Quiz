import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import data from '././shared/quizs.json';
import { SafePipe } from './shared/app.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, CommonModule, FormsModule],
  providers: [ SafePipe ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) {}
  
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
      urlPicture: string, 
      hasPicture: boolean, 
      widthPicture: number,
      heightPicture: number,
      hasAudio: boolean, 
      urlAudio: string,
      urlVideo: string, 
      widthVideo: number,
      heightVideo: number,
      hasVideo: boolean
    },
  }[];
  points: number = 0;

  ngOnInit() {
    this.quizName = "CULTURE";
    this.quizs = data;
  }

  sanitizeURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.quizs[0].elements.urlVideo);
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
      array.push(playerAnswer.toUpperCase() === e.toUpperCase());
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
