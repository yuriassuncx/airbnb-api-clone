import type { User as TUser } from '@prisma/client';

export class User implements TUser {
  public readonly id: string;

  public name: string;
  public email: string;
  public emailVerified: Date;
  public hashedPassword: string;
  public image: string;
  public createdAt: Date;
  public updatedAt: Date;
  public favoriteIds: string[];

  constructor(props: User) {
    Object.assign(this, props);
  }
}
