import { CreateListingBody } from './create-listing-body';

export type UpdateListingBody = Partial<Omit<CreateListingBody, 'id'>>;
