import { IsNotEmpty, IsEmail, IsString } from "class-validator"

export class RegisterUser {

    @IsNotEmpty()
    @IsEmail()
    email: string


    @IsNotEmpty()
    @IsString()
    password: string
}