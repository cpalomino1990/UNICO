import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"



export class RegisterDto{
    @IsNotEmpty()
    firstName    : string;  
    @IsNotEmpty() 
    lastName     : string;   
    
    isActive     : boolean; 
    @IsNotEmpty()   
    @IsEmail()
    email        : string;    
    @Transform(({ value }: { value: string }) => value.trim())
    @MinLength(6)
    @IsNotEmpty()  
    password     : string

    role : string;
}

