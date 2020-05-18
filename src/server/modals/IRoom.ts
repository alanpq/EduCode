import { IConn } from "./IConn";

export interface IRoom {
  id?: string;
  name: string;
  password: string;
  capacity: number;
  host?: string;
  connections?: IConn[];
}