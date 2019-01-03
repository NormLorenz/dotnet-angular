export interface Department {
  departmentId: number;
  departmentDescription: string;
  departmentAbbreviation: string;
  deleted: boolean;
  dateDeleted?: Date;
  deletedBy: string;
}