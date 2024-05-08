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

  constructor(private sanitizer: DomSanitizer) {
  }
  
  iframeSrc!: SafeUrl;
  dangerousUrl!: string;
  quizName!: string;
  badAnswerWithChoices!: boolean;
  count!: number;
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
    this.quizName = "";
    this.quizs = data;
    this.countProperties();
  }

  updateVideoUrl(url: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    this.dangerousUrl = url;
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  sanitizeURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.quizs[0].elements.urlVideo);
  }

  onClickPlayerAnswer(playerAnswer: string, i: number) {
    this.onSubmit(playerAnswer, i);
    if(!this.quizs[i].useFourChoices) {
      this.badAnswerWithChoices = false;
    } 
    this.quizs[i].hasAnswered = !this.quizs[i].hasAnswered;
  }

  onClickPlayerAnswerAfterBadAnswer(playerAnswer: string, i: number) {
    this.quizs[i].useFourChoices = true;
    this.badAnswerWithChoices = true;
    this.onSubmit(playerAnswer, i);
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
    if(!this.badAnswerWithChoices){
      this.quizs[i].visible = !this.quizs[i].visible;
    }
  }

  countProperties() {
    var count = 0;

    for(var quiz in this.quizs) {
     ++count;
    }

    this.count = count;
}

  title = 'Quiz';
}
