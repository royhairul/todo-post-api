import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super({
      log: [
        {
          level: 'info',
          emit: 'event',
        },
        {
          level: 'warn',
          emit: 'event',
        },
        {
          level: 'error',
          emit: 'event',
        },
        {
          level: 'query',
          emit: 'event',
        },
      ],
    });
  }
  onModuleInit() {
    this.$on('info', (e) => this.logger.log(e));
    this.$on('warn', (e) => this.logger.warn(e));
    this.$on('error', (e) => this.logger.error(e));
    this.$on('query', (e) => this.logger.log(e));
  }
}
