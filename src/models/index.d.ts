import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type NewProjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class NewProject {
  readonly id: string;
  readonly projectname: string;
  readonly password: string;
  readonly filesurl: string[];
  readonly userid: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<NewProject, NewProjectMetaData>);
  static copyOf(source: NewProject, mutator: (draft: MutableModel<NewProject, NewProjectMetaData>) => MutableModel<NewProject, NewProjectMetaData> | void): NewProject;
}