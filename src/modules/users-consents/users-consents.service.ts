import {Inject, Injectable} from '@nestjs/common';
import { UsersConsents } from './users.consents.entity';
import { CreateUserConsentsDto } from './dto/create-user-consents.dto';
import { UpdateUserConsentsDto } from './dto/update-user-consents.dto';
import { User } from '../users/user.entity';

@Injectable()
export class UserConsentsService {
  constructor(
    @Inject('USER_CONSENTS_REPOSITORY')
    private readonly usersConsentRepository: typeof UsersConsents,
  ) {}

  createUserConsent = async (createUserConsentsDto: CreateUserConsentsDto) => {
    return this.usersConsentRepository.create(createUserConsentsDto);
  }

  findUserConsent = async (query: any) => {
    return this.usersConsentRepository.findOne({ where: query, include: [{ model: User }] });
  }

  listAllUserConsents = async (query: any, offset, limit, sort) => {
    return this.usersConsentRepository.findAndCountAll({where: query, offset, limit, order: sort, include: [{ model: User }] });
  }

  updateUserConsent = async (uid: string, updateUserConsentsDto: UpdateUserConsentsDto) => {
    return this.usersConsentRepository.update({ ...updateUserConsentsDto }, { where: { uid } });
  }

  removeUserConsent = async (uid: string) => {
    return this.usersConsentRepository.destroy({ where: { uid } });
  }
}