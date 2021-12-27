import { IContract } from "./IContract";
import { IProjectService } from "./IProjectService";
import { IRoomType } from "./IRoomType";
export interface IContracts {
  id: number;
  name: string;
  nameStudent: string;
  price: number;
  price_deposit: number;
  room: {
    id: number;
    name: string;
    room_type: IRoomType;
    floor: {
      id: number;
      name: string;
      building: {
        id: number;
        name: string;
        project: {
          id: number;
          name: string;
          cycle_collect: number;
          extension_time: number;
          project_service: IProjectService[]
        }
      }
    }
  }
  contract: IContract
}
