import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  isEmail,
  isAlphanumeric,
} from 'class-validator';

export function IsValidUsernameOrEmail(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsValidUsernameOrEmail',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (isEmail(value)) {
            return true;
          }

          // if not email so we assume its a username
          return isAlphanumeric(value);
        },

        defaultMessage({ value }: ValidationArguments) {
          if (isEmail(value)) {
            return 'Please provide a valid email address';
          } else {
            return 'Username should only contain alpha-numeric characters';
          }
        },
      },
    });
  };
}
