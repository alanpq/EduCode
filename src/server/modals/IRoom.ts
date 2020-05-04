import { IConn } from "./IConn";

export interface IRoom {
  name: string;
  password: string;
  capacity: number;
  connections: IConn[];
}