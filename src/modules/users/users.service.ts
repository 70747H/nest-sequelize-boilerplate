import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('UsersRepository')
        private readonly usersRepository: typeof User,
    ) {}

    async findAll() {
        const users = await this.usersRepository.findAll<User>();
        return users.map(user => new UserDto(user));
    }

    async getUser(id: string) {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) {
            throw new HttpException(
                'User with given id not found',
                HttpStatus.NOT_FOUND,
            );
        }
        return new UserDto(user);
    }

    async getUserByEmail(email: string) {
        return this.usersRepository.findOne<User>({
            where: { email },
        });
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = new User();
            user.email = createUserDto.email.trim().toLowerCase();
            return  user.save();
        } catch (err) {
            if (err.original.constraint === 'user_email_key') {
                throw new HttpException(
                    `User with email '${err.errors[0].value}' already exists`,
                    HttpStatus.CONFLICT,
                );
            }
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        user.email = updateUserDto.email || user.email;

        try {
            const data = await user.save();
            return new UserDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string) {
        const user = await this.usersRepository.findByPk<User>(id);
        await user.destroy();
        return new UserDto(user);
    }
}
