import { Test, TestingModule } from '@nestjs/testing'
import { RequirementPoolController } from './requirement-pool.controller'
import { RequirementPoolService } from './requirement-pool.service'

describe('requirementPoolController', () => {
  let controller: RequirementPoolController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequirementPoolController],
      providers: [RequirementPoolService],
    }).compile()

    controller = module.get<RequirementPoolController>(RequirementPoolController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
