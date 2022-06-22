import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FoodViewModel } from '@common/models/food.model';
import { UserViewModel } from '@common/models/user.model';
import { AuthService } from '@common/services/auth.service';
import { UserStore } from '@common/stores';
import { ObservableEventHandler } from '@common/util/observable-event-handler';

@Component({
  selector: 'app-simple-item',
  templateUrl: './simple-item.component.html',
  styleUrls: ['./simple-item.component.scss']
})
export class SimpleItemComponent implements OnInit {
  @Input() food!: FoodViewModel;

  unitType: string = '';
  isOwner: boolean = false;
  isLoading: boolean = false;
  currentUserId: string = '';


  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.unitType = this.food.units === 1 ? this.food.unitType.singular : this.food.unitType.plural;
    this.currentUserId = this.authService.user?.uid ?? '';
    this.isOwner = this.authService.user?.uid === this.food.owner;
  }
}
