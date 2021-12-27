import { IAssetsType, IProducer, IUnitAsset } from '.';

export class IAssets {
  id: number;
  name: string;
  price: number;
  unit_asset?: IUnitAsset;
  unit_asset_id: number;
  type_asset?: IAssetsType;
  asset_type_id: number;
  min_inventory: number;
  description: string;
  image: string;
  producer?: IProducer;
  producer_id: number;
}
