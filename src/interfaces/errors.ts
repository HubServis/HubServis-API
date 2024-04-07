export interface IObjectCustomError {
  type?: string;
  statusCode?: number;
  message?: string;
}

export class CustomError implements IObjectCustomError {
  type?: string;
  statusCode?: number;
  message?: string;

  constructor(data: Partial<IObjectCustomError>) {
    Object.assign(this, data);
  }
}
