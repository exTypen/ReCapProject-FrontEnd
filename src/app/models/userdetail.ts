import { Byte } from "@angular/compiler/src/util";
import { Rental } from "./rental";

export interface UserDetail {
	userId: number;
	firstName: string;
	lastName: string;
	email: string;
	passwordHash: Byte[]
	passwordSalt: Byte[]
	operationClaimsId: number[];
	cardIds: number[]
	rentals: Rental[]
	findexPoint:number
}