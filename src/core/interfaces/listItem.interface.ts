export interface listItem {
  id: number;
  name: string;
  listId: number;
  list: string;
  marked: boolean;
  qty: number;
  unitType: UnitType;
}

export enum UnitType {
  KG = "KG",
  UN = "UN",
}
