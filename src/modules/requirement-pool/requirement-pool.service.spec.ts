import { Test, TestingModule } from '@nestjs/testing'
import { RequirementPoolService } from './requirement-pool.service'

describe('requirementPoolService', () => {
  let service: RequirementPoolService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequirementPoolService],
    }).compile()

    service = module.get<RequirementPoolService>(RequirementPoolService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
