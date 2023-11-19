import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() user!: User;
  @Input() idx!: number;
  @Output() onClickEmitter: EventEmitter<any> = new EventEmitter();

  onClick() {
    this.onClickEmitter.emit(this.user);
  }
}
