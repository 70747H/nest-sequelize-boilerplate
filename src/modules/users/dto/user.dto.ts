import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly email: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
    }
}
