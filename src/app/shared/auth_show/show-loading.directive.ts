import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoadingService, UserService } from 'src/app/core';
@Directive({
  selector: '[appShowLoading]',
})
export class ShowLoadingDirective implements OnInit {
  constructor(
    private loadingService: LoadingService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  status: boolean;
  ngOnInit(): void {
    this.loadingService.loading.subscribe((status) => {
      if (status === this.status) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  @Input() set appShowLoading(status: boolean) {
    this.status = status;
  }
}
