import {ApiProperty} from "@nestjs/swagger";

export class CreateTransactionDto {
    @ApiProperty()
    readonly dateTime:string;
    @ApiProperty()
    readonly author:string;
    @ApiProperty()
    readonly sum:number;
    @ApiProperty()
    readonly category:string;
    @ApiProperty()
    readonly comment:string;
}
