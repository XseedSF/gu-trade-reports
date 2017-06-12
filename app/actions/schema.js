import { schema } from 'normalizr';

const schemaOptions = { idAttribute: 'Id' };

export const option = new schema.Entity('options', {}, schemaOptions);
export const question = new schema.Entity('questions', {
	Options: [option]
}, schemaOptions);

export const answer = new schema.Entity('answers', {}, schemaOptions);

export const completedForm = new schema.Entity('completedForms', {
	answers: [answer]
}, schemaOptions);

export const form = new schema.Entity('forms', {
	questions: [question],
	completedForms: [completedForm]
});