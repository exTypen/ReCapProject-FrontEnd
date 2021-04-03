import { Rental } from "./rental";

export interface CarDetail {
  carId: number;
  brandName: string;
  colorName: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  images: string[];
  rentals: Rental[];
}
