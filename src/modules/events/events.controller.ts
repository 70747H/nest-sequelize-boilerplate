import {
  Body, ClassSerializerInterceptor,
  Controller,
  Get, HttpException, HttpStatus, Logger,
  Param,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe
} from "@nestjs/common";
import {EventsService} from './events.service';
import {CreateEventDto} from './dto/create-event.dto';
import {PaginationPipe} from '../../pipes/pagination.pipe';
import { TransformResponseInterceptor } from "../../interceptors/transform-response.interceptor";
import { Event } from "./event.entity";
import { serialize } from "class-transformer";
import { UsersService } from "../users/users.service";
import { UserConsentsService } from "../user-consents/user-consents.service";
import { ConsentsService } from "../consents/consents.service";

@Controller('events')
@UseInterceptors(TransformResponseInterceptor)
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private consentsService: ConsentsService,
    private usersService: UsersService,
    private userConsentsService: UserConsentsService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body(new ValidationPipe({ transform: true })) createEventDto: CreateEventDto): Promise<Event> {
    const { user, consents } = createEventDto;
    const foundUser = await this.usersService.findUser(user.id);
    if(!foundUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    await consents.map(async (consent) => {
      const foundConsent = await this.consentsService.findConsent({ name: consent.id });
      const foundUserConsent = await this.userConsentsService.findUserConsent({ user_id: foundUser.id, consent_id: foundConsent.id });
      if(!foundUserConsent)
        await this.userConsentsService.createUserConsent({ user_id: foundUser.id, consent_id: foundConsent.id, enabled: consent.enabled });
      else
        await this.userConsentsService.updateUserConsent(foundConsent.uid, { enabled: consent.enabled });
    });
    createEventDto.user.id = foundUser.id;
    return this.eventsService.createEvent(createEventDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(
    @Query('page', PaginationPipe) pagination,
    @Query('search') search: string,
    @Query('sortBy') sortBy: string,
    @Query('sortValue') sortValue: string,
  ): Promise<{ rows: string, count: number, limit: number, currentPage: number }> {
    let query: any = {};

    let sortObj: any = {
      id: 'ASC',
    };

    if (sortBy && sortValue) {
      sortObj = {};
      sortObj[sortBy] = sortValue;
    }

    const [rows, count] = await this.eventsService.listAllEvents(query, pagination.offset, pagination.limit, sortObj);
    return {
      rows: serialize(rows),
      count,
      limit: pagination.limit,
      currentPage: pagination.pageNo,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uid')
  findOne(@Param('uid') uid: string): Promise<Event> {
    return this.eventsService.findEvent(uid);
  }
}
