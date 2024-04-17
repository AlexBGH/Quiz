import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
//import * as data from '../quizs.json';

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
    this.quizName = "CULTURE";

    //questions ---------------------------------------
    this.quizs = 
    [
      // Question 1
        {
          question: "Qui est cette personne ?", 
          playerAnswer: "", 
          answer: "Charlemagne",
          possibleAnswers: ["CHARLEMAGNE", "CAROLUS MAGNUS", "CHARLES 1ER", "CHARLES PREMIER", "CHARLES LE GRAND"],
          visible: true, 
          hasAnswered: false, 
          hasGoodAnswer: false, 
          useFourChoices: false, 
          fourChoises: [
            "Charles Martel", 
            "Charlemagne", 
            "Charles X", 
            "Charle II"
          ],
          elements: {
            hasPicture: true,
            urlPicture: "https://www.meisterdrucke.fr/kunstwerke/1260px/Unknown_Artist_-_Portrait_of_Charlemagne_%28742_-_814%29_King_of_France_-_in_Histoire_des_Franais_by_-_%28MeisterDrucke-913795%29.jpg",
            widthPicture: 164,
            heightPicture: 120,
            hasVideo: false
          }
        },
      // Question 2
        {
          question: "Quand débutat la guerre de cent ans (écrire juste l'année à plus ou moins 5 ans près)?", 
          playerAnswer: "", 
          answer: "1337", 
          possibleAnswers: ["1337", "1336", "1335", "1334", "1332", "1338", "1339", "1340", "1342", "1341"],
          visible: true, 
          hasAnswered: false, 
          hasGoodAnswer: false, 
          useFourChoices: false, 
          fourChoises: [
            "1331", 
            "1330", 
            "1337", 
            "1343"
          ],
          elements: {
            urlPicture: "https://www.histoire-pour-tous.fr/images/articles/dossiers/battle_of_crecy_froissart.jpg",
            widthPicture: 164,
            heightPicture: 120,
            hasPicture: true,
            hasVideo: false
          }
        },
      // Question 3
        {
          question: "Quel empereur romain régnait quand Jésus fut crucifié ?", 
          playerAnswer: "", 
          answer: "Auguste", 
          possibleAnswers: ["AUGUSTE", "Caius Octavius", "Caius Iulius Caesar Octavianus", "Imperator Caesar Divi Filius Augustus"],
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
          urlPicture: "https://francearchives.gouv.fr/fr/file/e3898a703dd619f5a7d2da4e81b56899a8e891c7/static_7203.jpeg",
          hasVideo: false
        }
      },
      // Question 4
        {
          question: "Qui est ce personnage ?", 
          playerAnswer: "", 
          answer: "Firefly", 
          possibleAnswers: ["FIREFLY", "LUCIOLE"],
          visible: true, 
          hasAnswered: false, 
          hasGoodAnswer: false, 
          useFourChoices: false, 
          fourChoises: [
          "Abeille", 
          "Firefly", 
          "Maya", 
          "Guepe"
        ],
        elements: {
          hasPicture: true,
          urlPicture: "https://editors.dexerto.com/wp-content/uploads/2023/12/15/Firefly-Honkai-Star-Rail.jpg",
          widthPicture: 164,
          heightPicture: 120,
          hasVideo: false,
          urlVideo: this.sanitizer.bypassSecurityTrustUrl("https://www.youtube-nocookie.com/embed/AkaynDV6O3I?playlist=AkaynDV6O3I&autoplay=1&iv_load_policy=3&loop=1&start="),
          widthVideo: 200,
          heightVideo: 200
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
