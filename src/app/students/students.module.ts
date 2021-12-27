import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { StudentsRoutingModule } from './students-routing.module'

@NgModule({
  declarations: [],
  imports: [StudentsRoutingModule, SharedModule],
})
export class StudentsModule { }
