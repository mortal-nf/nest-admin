import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectsModule } from '../projects/projects.module'
import { TaskNode } from './entities/task-node.entity'
import { TaskNodesController } from './task-nodes.controller'
import { TaskNodesService } from './task-nodes.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskNode]),
    ProjectsModule,
  ],
  controllers: [TaskNodesController],
  providers: [TaskNodesService],
})
export class TaskNodesModule {}
