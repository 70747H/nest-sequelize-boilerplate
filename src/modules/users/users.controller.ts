import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    Delete,
    Req,
    UseGuards,
    Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOkResponse({ type: UserDto })
    register(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserDto> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOkResponse({ type: [UserDto] })
    findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: UserDto })
    async getUser(@Req() request): Promise<UserDto> {
        return this.usersService.getUser(request.user.id);
    }

    @Put(':id')
    @ApiOkResponse({ type: UserDto })
    update(
        @Body() updateUserDto: UpdateUserDto,
        @Req() request,
    ): Promise<UserDto> {
        return this.usersService.update(request.user.id, updateUserDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: UserDto })
    delete(@Req() request): Promise<UserDto> {
        return this.usersService.delete(request.user.id);
    }
}
