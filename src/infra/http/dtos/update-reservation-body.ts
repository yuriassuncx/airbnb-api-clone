import { CreateReservationBody } from './create-reservation-body';

export type UpdateReservationBody = Partial<Omit<CreateReservationBody, 'id'>>;
