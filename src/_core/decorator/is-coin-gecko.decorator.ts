import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getManager } from 'typeorm';
import { CoinGecko } from '@crypto/coin.gecko.entity';

@ValidatorConstraint({ async: true })
export class IsCoinGeckoConstraint implements ValidatorConstraintInterface {
  async validate(id: string) {
    const result = await getManager()
      .getRepository(CoinGecko)
      .count({
        where: {
          id: id,
        },
      });
    return result > 0 ? true : false;
  }
}

export function IsCoinGecko(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCoinGeckoConstraint,
    });
  };
}
