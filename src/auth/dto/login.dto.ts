import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

 
 export class LoginDto{
  @IsNotEmpty()   
    @IsEmail()
    email        : string;    
    @Transform(({ value }: { value: string }) => value.trim())
    @MinLength(6)
    @IsNotEmpty()  
    password     : string
}



 