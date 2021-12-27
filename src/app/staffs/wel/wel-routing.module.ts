import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelComponent } from './wel.component';

const routes: Routes = [
  {
    path: '',
    component: WelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class WelRoutingModule {}
