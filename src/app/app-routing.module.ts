import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TrainTrakingPageComponent } from './pages/train-traking-page/train-traking-page.component';

const routes: Routes = [
  { path: "", component: MainPageComponent},
  { path: "tracking", component: TrainTrakingPageComponent},
  { path: "**", component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
