import { EmailValidatorAdapter } from '~/common/adapters/validators/email-validator-adapter';
import { UserEmailValidation } from '../leaf/user-email-validation';
import { UserEmptyRequiredFieldsValidation } from '../leaf/user-empty-required-fields-validation';
import { UserPasswordsMustMatchValidation } from '../leaf/user-passwords-must-match-validation';
import { UserCompositeValidation } from './user-composite-validation';

export class CreateUserValidation extends UserCompositeValidation {
  constructor() {
    super();
    this.add(new UserEmptyRequiredFieldsValidation());
    this.add(new UserPasswordsMustMatchValidation());
    this.add(new UserEmailValidation(new EmailValidatorAdapter()));
  }
}
