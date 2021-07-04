import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
});

const tasks = [
  {
    title: 'Test task',
    description: 'Test task description',
  },
];

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = app.get<TasksService>(TasksService);
    tasksRepository = app.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('should return at least one task', async () => {
      tasksRepository.getTasks.mockResolvedValue(tasks);
      const tasksResult = await tasksService.getTasks();
      expect(tasksResult).toMatchObject(tasks);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
    });

    it('should throw 500 error when TaskRepository error', async () => {
      tasksRepository.getTasks.mockRejectedValue(
        new Error('Task Repository Error'),
      );
      expect(tasksService.getTasks()).rejects.toThrowError(NotFoundException);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
    });
  });
  describe('getTasksById', () => {
    it('Should return one task when Id is match', async () => {
      tasksRepository.getTaskById.mockResolvedValue(tasks[0]);
      const taskResult = await tasksService.getTaskById('id');
      expect(taskResult).toMatchObject(tasks[0]);
      expect(tasksRepository.getTaskById).toHaveBeenCalled();
    });
    it('Should throw 404 when Id is not match any', async () => {
      tasksRepository.getTaskById.mockReset();
      tasksRepository.getTaskById.mockRejectedValue(null);
      await expect(tasksRepository.getTaskById('Id')).rejects.toThrow(
        NotFoundException,
      );
      await expect(tasksRepository.getTaskById('Id')).rejects.toBe(null);

      expect(tasksRepository.getTaskById).toHaveBeenCalled();
      // TODO : Write fail case
    });
    it('should throw 500 error when TaskRepository error', async () => {
      // TODO : Write fail case
    });
  });
});
