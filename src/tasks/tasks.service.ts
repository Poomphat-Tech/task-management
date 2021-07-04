import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  private async catchError(fn: Promise<any>): Promise<any> {
    const result = await fn
      .then((resolve) => {
        return Promise.resolve(resolve);
      })
      .catch((error) => {
        console.log(error.message);
        throw new NotFoundException();
      });
    return result;
  }

  async getTasks(): Promise<Task[]> {
    const result = await this.catchError(this.taskRepository.getTasks());
    return result;
  }

  async getTaskById(id: string): Promise<Task> {
    const result = await this.catchError(this.taskRepository.getTaskById(id));
    return result;
  }

  async updateTask(updateTaskDto: UpdateTaskDto, id: string): Promise<Task> {
    const result = await this.catchError(
      this.taskRepository.updateTask(updateTaskDto, id),
    );
    return result;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.catchError(this.taskRepository.createTask(createTaskDto));
  }
  async deleteTask(id: string): Promise<void> {
    this.catchError(this.taskRepository.deleteTask(id));
  }
}
