import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from 'src/app/core';
@Directive({
  selector: '[appShowTable]',
})
export class ShowTableDirective implements OnInit {
  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  key: string = '';
  ngOnInit(): void {
    this.authService.currentUser.subscribe((data) => {
      let module = data.permission_data.module ?? [];
      let permissions = data.permission_data.permissions ?? [];
      let tables = data.permission_data.tables ?? [];
      if (tables.find((item: string) => item.trim() == this.key.trim())) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  @Input() set appShowTable(key: string) {
    this.key = key;
  }
}
