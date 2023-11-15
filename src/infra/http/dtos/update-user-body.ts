import { CreateUserBody } from './create-user-body';

export type UpdateUserBody = Partial<Omit<CreateUserBody, 'id'>>;
