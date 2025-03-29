import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Transform } from "class-transformer";


export class  UserDto{

   
    @IsNotEmpty()
       firstName    : string;  
       @IsNotEmpty() 
       lastName     : string;   
       
       isActive     : boolean; 
       @IsNotEmpty()   
       @IsEmail()
       email        : string;    
       @Transform(({ value }: { value: string; }) => value.trim())
       @MinLength(6)
       @IsNotEmpty()  
       password     : string
   
       role : string;
   }

