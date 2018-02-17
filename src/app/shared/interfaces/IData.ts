export interface IData {
  currency: string;
  deals: IDeals[]
}

export interface IDeals {
    transport: string;
    departure: string;
    arrival: string;
    cost: number;
    duration?: {
      h: string;
      m: string;
    },
    discount: number;
    reference?: string;

}
