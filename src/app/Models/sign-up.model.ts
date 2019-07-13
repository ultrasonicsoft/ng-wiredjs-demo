import { SubscriptionModel } from './subscription.model';

export class SignUpModel {
  firstName: string;
  lastName: string;
  selectedSubscriptions: Array<SubscriptionModel> = [];
  updateFrequency: string;
  canSendSMS: boolean;
  gender: string = "female";

}