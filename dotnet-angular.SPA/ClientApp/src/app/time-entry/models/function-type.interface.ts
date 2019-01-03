export interface FunctionType {
  functionTypeId: number;
  functionTypeDescription: string;
  deleted: boolean;
  deletedBy: string;
  dateCreated: Date;
  createdBy: string;
  comment: string;
  includeInFTEUtilization?: boolean;
}