import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequirementPool } from '~/modules/requirement-pool/entities/requirement-pool.entity'
import { RequirementPoolController } from './requirement-pool.controller'
import { RequirementPoolService } from './requirement-pool.service'

@Module({
  imports: [TypeOrmModule.forFeature([RequirementPool])],
  controllers: [RequirementPoolController],
  providers: [RequirementPoolService],
})
export class RequirementPoolModule {
}
