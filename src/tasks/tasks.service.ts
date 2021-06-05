import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from 'schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }

  async getTaskbyId(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  async updateTask(updateTaskDto: UpdateTaskDto, id: string): Promise<Task> {
    return this.taskRepository.updateTask(updateTaskDto, id);
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  async deleteTask(id: string): Promise<void> {
    this.taskRepository.deleteTask(id);
  }
}
