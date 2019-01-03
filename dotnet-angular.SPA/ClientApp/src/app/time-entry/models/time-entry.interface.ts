export interface TimeEntry {
  timeEntryId: number;
  associateId: number;
  functionTypeId: number;
  functionSubTypeId: number;
  numberOfItems: number;
  timeInMinutes: number;
  description: string;
  entryDate: Date;
  dateCreated: Date;
  departmentId: number,
  departmentDescription: string;
  functionTypeDescription: string;
  functionSubTypeDescription: string;
  showNumberOfItems: boolean;
  showTimeInMinutes: boolean;
  standardMinutes: number;
  trainingTask: boolean;
}