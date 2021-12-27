import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelRoutingModule } from './wel-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { WelComponent } from './wel.component';

@NgModule({
  declarations: [WelComponent],
  imports: [CommonModule, WelRoutingModule, SharedModule],
})
export class WelModule {}
