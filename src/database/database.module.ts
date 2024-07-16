import { Global, Module } from '@nestjs/common';
import { databaseProviders } from "./database.provider";
import { CommonModule } from 'src/common/common.module';

@Global()
@Module({
  imports: [CommonModule],
  providers: [...databaseProviders],
  exports : [...databaseProviders]
})
export class DatabaseModule {}
