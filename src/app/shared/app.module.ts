import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './app.pipe';

@NgModule({
  declarations: [SafePipe],
  imports: [
    CommonModule,
    SafePipe
  ]
})
export class AppModule { }
