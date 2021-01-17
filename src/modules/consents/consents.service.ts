import {Inject, Injectable} from '@nestjs/common';
import { Consent } from './consent.entity';
import { CreateConsentsDto } from './dto/create-consent.dto';
import { UpdateConsentDto } from './dto/update-consent.dto';

@Injectable()
export class ConsentsService {
  constructor(
    @Inject('CONSENTS_REPOSITORY')
    private readonly consentRepository: typeof Consent,
  ) {}

  createConsent = async (createConsentsDto: CreateConsentsDto) => {
    return this.consentRepository.findOrCreate({ defaults: createConsentsDto, where: { name: createConsentsDto.name } });
  }

  findConsent = async (query: any) => {
    return this.consentRepository.findOne({ where: query });
  }

  listAllConsent = async (query: any, offset, limit, sort) => {
    return this.consentRepository.findAndCountAll({where: query, offset, limit, order: sort});
  }

  updateConsent = async (id: string, updateConsentDto: UpdateConsentDto) => {
    return this.consentRepository.update({ ...updateConsentDto }, { where: { id } });
  }

  removeConsent = async (uid: string) => {
    await this.consentRepository.findOne({ where: { uid } });
    return this.consentRepository.destroy({ where: { uid } });
  }
}