import { DataSource } from 'typeorm';
import { ConfigService } from '../common/constants/config/config.service';

export const databaseProviders = [
  
  {
    provide: DataSource,
    inject : [ConfigService],
    useFactory: async (configService : ConfigService) => {
      const dataSource = new DataSource({
        type: configService.getDatabaseConfig().dialect as 'postgres',
        host: configService.getDatabaseConfig().host ,
        port: configService.getDatabaseConfig().port ,
        username: configService.getDatabaseConfig().username ,
        password: configService.getDatabaseConfig().password ,
        database: configService.getDatabaseConfig().database,
        entities: [
             __dirname.split('database')[0] + 'modules/**/entities/**.entity{.ts,.js}',
        ],
        synchronize: true,
        // logging : true
      });

      return dataSource.initialize();
      
    },
  },
];








