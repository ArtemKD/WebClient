import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MapComponent } from './components/map/map.component';
import { TrainTrakingPageComponent } from './pages/train-traking-page/train-traking-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TrainPathComponent } from './components/train-path/train-path.component';
import { FormsModule } from '@angular/forms';
import { ThreadEditorComponent } from './components/thread-editor/thread-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ThreadEditorComponent,
    TrainPathComponent,

    // Pages
    MainPageComponent,
    TrainTrakingPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
