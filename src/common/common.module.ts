import { Module } from '@nestjs/common';
import { ConstantService } from './constants/common/constant.service';
import { ConfigService } from './constants/config/config.service';

@Module({
  providers: [ ConstantService, ConfigService],
  exports:[ConstantService, ConfigService]
})
export class CommonModule {}
