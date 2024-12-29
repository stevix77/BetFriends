import { ApiProperty } from "@nestjs/swagger";

export class CompleteBetInput {
    @ApiProperty()  
    isSuccessful: boolean;
    @ApiProperty()  
    proof?: string
}