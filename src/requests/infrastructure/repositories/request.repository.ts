import { Injectable } from '@nestjs/common';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from '../entities/request.entity';
import { RequestMapper } from '../mappers/request.mapper';
import { RequestRepository } from '../../application/ports/request.repository';
import { RequestDomain } from 'src/requests/domain/request';
import { RequestStatus } from 'src/requests/domain/enums/request-status.enum';

@Injectable()
export class RequestRepositoryImpl implements RequestRepository {
    constructor(
        @InjectRepository(RequestEntity)
        private readonly ormRepository: Repository<RequestEntity>,
    ) { }

    async save(request: RequestDomain): Promise<RequestDomain> {
        const entity = RequestMapper.toEntity(request);
        const savedEntity = await this.ormRepository.save(entity);
        return RequestMapper.toDomain(savedEntity);
    }

    async findOneById(id: number): Promise<RequestDomain | null> {
        const entity = await this.ormRepository.findOne({ where: { id } });
        return entity ? RequestMapper.toDomain(entity) : null;
    }

    async findByUserId(userId: number): Promise<RequestDomain[]> {
        const entities = await this.ormRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
        return entities.map(RequestMapper.toDomain);
    }

    async findByStatus(status: RequestStatus): Promise<RequestDomain[]> {
        const entities = await this.ormRepository.find({ where: { status }, order: { createdAt: 'DESC' } });
        return entities.map(RequestMapper.toDomain);
    }

    async filterByTimeRangeAndStatus(userId: number, status: RequestStatus, startTime: Date, endTime: Date): Promise<RequestDomain[]> {
        const where: any = { userId };
        if (status)
            where.status = status;

        if (startTime)
            if (endTime)
                where.createdAt = Between(startTime, endTime);
            else
                where.createdAt = MoreThanOrEqual(startTime);
        else if (endTime)
            where.createdAt = LessThanOrEqual(endTime);

        console.log(where);



        const entities = await this.ormRepository.find({
            where,
            order: { createdAt: 'DESC' },
        });
        return entities.map(RequestMapper.toDomain);
    }
}
