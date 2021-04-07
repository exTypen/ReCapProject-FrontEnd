import { Rental } from "./rental";

export interface CarDetail {
  carId: number;
  brandName: string;
  brandId: number;
  colorName: string;
  colorId: number;
  modelYear: number;
  dailyPrice: number;
  description: string;
  images: string[];
  rentals: Rental[];
}
