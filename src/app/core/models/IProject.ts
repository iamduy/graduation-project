import { IBuilding } from './IBuilding';

export class IProject {
  id: number;
  name: string;
  hotline: string;
  description: string;
  address: string;
  buildings?: IBuilding[];
  cycle_collect: number;
  extension_time: number;
}
