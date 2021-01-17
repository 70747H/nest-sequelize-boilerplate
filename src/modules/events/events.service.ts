import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import {Inject, Injectable} from '@nestjs/common';
import { User } from '../users/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @Inject('EVENTS_REPOSITORY')
    private readonly eventRepository: typeof Event,
  ) {}

  createEvent = async (createEventDto: CreateEventDto) => {
    const createObject = { user_id: createEventDto.user.id, consents: createEventDto.consents, createdAt:createEventDto.createdAt };
    return this.eventRepository.create(createObject);
  }

  findEvent = async (uid: string) => {
    return this.eventRepository.findOne({ where: { uid }, include: [{ model: User }] });
  }

  listAllEvents = async (query: any, offset, limit, sort) => {
    return this.eventRepository.findAndCountAll({where: query, offset, limit, order: sort, include: [{ model: User }] });
  }
}