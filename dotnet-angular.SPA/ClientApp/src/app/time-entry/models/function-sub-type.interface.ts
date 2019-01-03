export interface FunctionSubType {
  functionSubTypeId: number;
  functionTypeId: number;
  functionSubTypeDescription: string;
  deleted: boolean;
  deletedBy: string;
  dateCreated: Date;
  createdBy: string;
  comment: string;
  showNumberOfItems?: boolean;
  showTimeInMinutes?: boolean;
  standardMinutes?: number;
  trainingStandardPercent?: number;
  trainingTask?: boolean;
  linkedTrainingFunctionSubTypeId?: number;
  prepopulateComments: string;
  AverageFTEPerDay?: number;
}