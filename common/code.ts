export enum ERequestCode {
  // Send Username, Expect Initial Count, Profile Image
  CreateNotifier,
  // Send Username, Expect Initial Count, Profile Image
  EditNotifier,
  // Send Username
  DeleteNotifier,
};

export enum EResponseCode {
  CreateNotifier,
  CreateFailure,
  UpdateNotifier,
  UpdateFailure,
  EditNotifier,
  EditFailure,
  DeleteNotifier,
  DeleteFailure,
};

export type TRequest = 
  | { code: ERequestCode.CreateNotifier, username: string }
  | { code: ERequestCode.EditNotifier, oldUsername: string, newUsername: string }
  | { code: ERequestCode.DeleteNotifier, username: string };

export type TResponse =
  | { code: EResponseCode.CreateNotifier, username: string, count: number }
  | { code: EResponseCode.CreateFailure, username: string, msg: string }
  | { code: EResponseCode.UpdateNotifier, username: string, count: number }
  | { code: EResponseCode.UpdateFailure, username: string, msg: string }
  | { code: EResponseCode.EditNotifier, oldUsername: string, newUsername: string, count: number }
  | { code: EResponseCode.EditFailure, username: string, msg: string }
  | { code: EResponseCode.DeleteNotifier, username: string }
  | { code: EResponseCode.DeleteFailure, username: string, msg: string };