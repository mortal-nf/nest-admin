import { Test, TestingModule } from '@nestjs/testing'
import { CreateProjectDto } from './dto/create-project.dto'
import { ProjectQueryDto } from './dto/project-query.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { Project } from './entities/projects.entity'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'

describe('projectsController', () => {
  let controller: ProjectsController
  let service: ProjectsService

  const mockProject: Partial<Project> = {
    id: 1,
    name: 'Test Project',
    description: 'Test Description',
    status: 'planning',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    requirementPoolId: 1,
    serviceObjectId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),

  }

  const mockProjectsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        },
      ],
    }).compile()

    controller = module.get<ProjectsController>(ProjectsController)
    service = module.get<ProjectsService>(ProjectsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should create a project', async () => {
      const createProjectDto: CreateProjectDto = {
        name: 'Test Project',
        description: 'Test Description',
      }

      mockProjectsService.create.mockResolvedValue(mockProject)

      const result = await controller.create(createProjectDto)

      expect(result).toEqual(mockProject)
      expect(service.create).toHaveBeenCalledWith(createProjectDto)
    })
  })

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      const query: ProjectQueryDto = { page: 1, pageSize: 10 }
      const paginationResult = {
        items: [mockProject],
        meta: {
          total: 1,
          page: 1,
          pageSize: 10,
        },
      }

      mockProjectsService.findAll.mockResolvedValue(paginationResult)

      const result = await controller.findAll(query)

      expect(result).toEqual(paginationResult)
      expect(service.findAll).toHaveBeenCalledWith(query)
    })
  })

  describe('findOne', () => {
    it('should return a single project', async () => {
      const projectId = '1'

      mockProjectsService.findOne.mockResolvedValue(mockProject)

      const result = await controller.findOne(projectId)

      expect(result).toEqual(mockProject)
      expect(service.findOne).toHaveBeenCalledWith(1)
    })
  })

  describe('update', () => {
    it('should update a project', async () => {
      const projectId = '1'
      const updateProjectDto: UpdateProjectDto = {
        name: 'Updated Project Name',
      }

      mockProjectsService.update.mockResolvedValue({
        ...mockProject,
        ...updateProjectDto,
      })

      const result = await controller.update(projectId, updateProjectDto)

      expect(result).toEqual({
        ...mockProject,
        ...updateProjectDto,
      })
      expect(service.update).toHaveBeenCalledWith(1, updateProjectDto)
    })
  })

  describe('remove', () => {
    it('should remove a project', async () => {
      const projectId = '1'

      mockProjectsService.remove.mockResolvedValue(undefined)

      await controller.remove(projectId)

      expect(service.remove).toHaveBeenCalledWith(1)
    })
  })
})
