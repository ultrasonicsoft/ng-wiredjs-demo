import { Component, ViewChild, ElementRef } from '@angular/core';
import { WiredInput } from "wired-elements"
import { SignUpModel } from './Models/sign-up.model';
import { SubscriptionModel } from "./Models/subscription.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  model: SignUpModel = new SignUpModel();

  @ViewChild("firstName", { static: false }) firstName: ElementRef;

  lastName: string = 'Chavan';

  allSubscriptions: Array<SubscriptionModel>;

  ngOnInit() {
    this.allSubscriptions = [];
    let subscription = new SubscriptionModel();
    subscription.name = "Google";
    this.allSubscriptions.push(subscription);

    subscription = new SubscriptionModel();
    subscription.name = "Microsoft";
    this.allSubscriptions.push(subscription);

    subscription = new SubscriptionModel();
    subscription.selected = true;
    subscription.name = "Amazon";
    this.allSubscriptions.push(subscription);

  }
  setLastName(event: any) {
    this.lastName = event.target.value;
  }

  updateSubscription(event: any, subscription: SubscriptionModel) {
    subscription.selected = event.target.checked;
  }

  signup(_firstName: WiredInput) {
    this.model.firstName = (this.firstName.nativeElement as WiredInput).value;
    this.model.lastName = this.lastName;

    this.model.selectedSubscriptions = this.allSubscriptions.filter(sub => sub.selected);

    console.log(this.model);
  }

}
