import { Byte } from "@angular/compiler/src/util";

export interface Password{
    passwordHash:Byte[]
    passwordSalt:Byte[]
}

