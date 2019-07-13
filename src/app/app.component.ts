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
  @ViewChild("progress", { static: false }) progress: ElementRef;

  lastName: string = 'Chavan';

  allSubscriptions: Array<SubscriptionModel>;

  // @ViewChild("spinner", { static: false }) spinner: ElementRef;
  showSpinner = false;
  showSuccess = false;

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

    this.model.updateFrequency = "monthly";

  }
  setLastName(event: any) {
    this.lastName = event.target.value;
  }

  updateSubscription(event: any, subscription: SubscriptionModel) {
    subscription.selected = event.target.checked;
  }

  selectFrequency(event: any) {
    this.model.updateFrequency = event.target.value.value;
  }

  setSMSPermission(event: any) {
    this.model.canSendSMS = event.target.checked;
  }

  setGender(event: any) {
    this.model.gender = event.target.name;
  }

  signup() {
    this.showSpinner = true;
    this.model.firstName = (this.firstName.nativeElement as WiredInput).value;
    this.model.lastName = this.lastName;

    this.model.selectedSubscriptions = this.allSubscriptions.filter(sub => sub.selected);

    setTimeout(() => {
      this.showSpinner = false;
      this.showSuccess = true;
    }, 5000);

    var token = setInterval(() => {
      if (this.progress.nativeElement.value == 100) {
        clearInterval(token);
      }
      else {
        this.progress.nativeElement.value = this.progress.nativeElement.value + 10;
      }
    }, 500);

    console.log(this.model);
  }

  cancel() {
    alert("Canceling signup...");
  }
}
