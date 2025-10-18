// Define the ProductPrice interface
export type ProductPrice = {
  ppId: number;
  ppPrice: number;
  ppPriceStatus: string;
  ppStartDate: string;
  ppEndDate: string | null;
  ppProduct: number;
};