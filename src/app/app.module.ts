import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ChartsModule,FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
