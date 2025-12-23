import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdDto } from '~/common/dto/id.dto'
import { CreateTaskNodeDto } from './dto/create-task-node.dto'
import { TaskNodeQueryDto } from './dto/task-node-query.dto'
import { UpdateTaskNodeDto } from './dto/update-task-node.dto'
import { TaskNodesService } from './task-nodes.service'

@Controller('task-nodes')
@ApiTags('任务节点管理')
export class TaskNodesController {
  constructor(private readonly taskNodesService: TaskNodesService) {}

  @Post()
  @ApiOperation({ summary: '创建任务节点' })
  @ApiResult({})
  create(@Body() createTaskNodeDto: CreateTaskNodeDto) {
    return this.taskNodesService.create(createTaskNodeDto)
  }

  @Get()
  @ApiOperation({ summary: '查询任务节点列表' })
  @ApiResult({})
  @ApiQuery({ type: TaskNodeQueryDto })
  findAll(@Query() query: TaskNodeQueryDto) {
    return this.taskNodesService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询单个任务节点' })
  @ApiResult({})
  findOne(@Param() { id }: IdDto) {
    return this.taskNodesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新任务节点' })
  @ApiResult({})
  update(@Param() { id }: IdDto, @Body() updateTaskNodeDto: UpdateTaskNodeDto) {
    return this.taskNodesService.update(id, updateTaskNodeDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除任务节点' })
  @ApiResult({})
  remove(@Param() { id }: IdDto) {
    return this.taskNodesService.remove(id)
  }
}
