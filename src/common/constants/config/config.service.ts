import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as DefaultConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(DefaultConfigService) 
    private readonly defaultConfigService: DefaultConfigService
  ) {}

    ENVIRONMENT = {
        DEVELOPMENT : 'DEVELOPMENT',
        TEST : 'TEST',
        PRODUCTION : 'PRODUCTION',
    }

    PORT= this.defaultConfigService.getOrThrow<number>('PORT')

    SECRET_TOKENS ={
      JWT_SECRET: this.defaultConfigService.getOrThrow<string>('JWT_SECRET'),
      JWT_EXPIRES_IN: this.defaultConfigService.getOrThrow<string>('JWT_EXPIRES_IN')
    }

  readonly development = {
    username: this.defaultConfigService.getOrThrow<string>('DEVELOPMENT_USERNAME'),
    password: this.defaultConfigService.getOrThrow<string>('DEVELOPMENT_PASSWORD'),
    database: this.defaultConfigService.getOrThrow<string>('DEVELOPMENT_DATABASE'),
    host: this.defaultConfigService.getOrThrow<string>('DEVELOPMENT_HOST_NAME'),
    port: this.defaultConfigService.getOrThrow<number>('DEVELOPMENT_DB_PORT'),
    dialect: this.defaultConfigService.getOrThrow<string>('DIALECT') as 'postgres',
  };

  readonly test = {
    username: this.defaultConfigService.getOrThrow<string>('TEST_USERNAME'),
    password: this.defaultConfigService.getOrThrow<string>('TEST_PASSWORD'),
    database: this.defaultConfigService.getOrThrow<string>('TEST_DATABASE'),
    host: this.defaultConfigService.getOrThrow<string>('TEST_HOST_NAME'),
    port: this.defaultConfigService.getOrThrow<number>('TEST_DB_PORT'),
    dialect: this.defaultConfigService.getOrThrow<string>('DIALECT') as 'postgres',
  };

  readonly production = {
    username: this.defaultConfigService.getOrThrow<string>('PRODUCTION_USERNAME'),
    password: this.defaultConfigService.getOrThrow<string>('PRODUCTION_PASSWORD'),
    database: this.defaultConfigService.getOrThrow<string>('PRODUCTION_DATABASE'),
    host: this.defaultConfigService.getOrThrow<string>('PRODUCTION_HOST_NAME'),
    port: this.defaultConfigService.getOrThrow<number>('PRODUCTION_DB_PORT'),
    dialect: this.defaultConfigService.getOrThrow<string>('DIALECT') as 'postgres',
  };

  getDatabaseConfig() {
    const environment = this.defaultConfigService.get<string>('NODE_ENV');
    
    switch (environment) {
      case this.ENVIRONMENT.DEVELOPMENT :
        return this.development;
      // case this.ENVIRONMENT.TEST :
      //   return this.test;
      // case this.ENVIRONMENT.PRODUCTION:
      //   return this.production;
      default:
        return this.development;
    }
  }

}
