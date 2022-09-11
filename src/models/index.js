// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { NewProject } = initSchema(schema);

export {
  NewProject
};