import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css'],
})
export class PaginateComponent implements OnInit {
  public _lastButton: number;
  public _currentButton: number;
  public buttons: number[];
  public _totalItem: number = 0;
  public _totalButton: number = 5;

  @Input('total_button') set totalButton(value: number) {
    this._totalButton = value;
  }

  @Input('total_item') set totalItem(value: number) {
    this._totalItem = value;
  }

  @Input('current_button') set currentButton(value: number) {
    this._currentButton = value;
    if (this._lastButton) {
      this.renderItem();
    }
  }

  @Input('last_button') set lastButton(value: number) {
    this._lastButton = value;
    this.renderItem();
  }

  @Output() eventChangePage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  renderItem() {
    let start = this._currentButton;
    let end = this._currentButton;

    start = 1;
    // nếu last_button = 1;
    if (this._lastButton == 1) {
      end = 1;
    } else {
      // Nếu button hiện tại (current_button) <= tổng số button cần hiện(total_button/2)
      if (this._currentButton <= this._totalButton / 2) {
        end = this._totalButton;
      }

      // Nếu current_button > total_button/2
      if (this._currentButton > this._totalButton / 2) {
        end = this._currentButton + Math.floor(this._totalButton / 2);
        // Nếu button cuối dùng được show !== last_button;
        if (
          this._currentButton + Math.floor(this._totalButton / 2) <=
          this._lastButton
        ) {
          start = this._currentButton - Math.floor(this._totalButton / 2);
          // Nếu total_button là số chẵn
          if (this._totalButton % 2 == 0) {
            start = start + 1;
          }
        } else {
          // button cuối cùng được show === last_page;
          if (this._lastButton > this._totalButton) {
            start = this._lastButton - this._totalButton + 1;
          }
        }
      }
      // Nếu current_button == last_button
      if (this._currentButton == this._lastButton) {
        end = this._currentButton;
      }
    }

    // Tạo list number buttons
    const arrayButtons = [];
    for (let i = start; i <= this._lastButton; i++) {
      arrayButtons.push(i);
      if (i == end) break;
    }
    this.buttons = arrayButtons;
  }

  changePage(page: number) {
    this.eventChangePage.emit(page);
  }
}
