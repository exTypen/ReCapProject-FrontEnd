import { Byte } from "@angular/compiler/src/util";

export interface verifyPassword {
	password: string;
	passwordHash: Byte[];
	passwordSalt: Byte[];
}