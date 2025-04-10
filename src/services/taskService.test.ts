import { taskService } from './taskService';
import { getTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import { Task } from '../types/task';

jest.mock('./api/taskApi');

const mockTask: Task = {
  id: '1',
  title: 'Item',
  completed: false,
  createdAt: '2025-04-09',
  updatedAt: '2025-04-09'
};

describe('taskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should return a list of tasks', async () => {
      const mockTasks: Task[] = [mockTask];

      (getTasks as jest.Mock).mockResolvedValue(mockTasks);

      const result = await taskService.getTasks();

      expect(getTasks).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTasks);
    });

    it('should throw error when request fails', async () => {
      const error = new Error('Erro de rede');

      (getTasks as jest.Mock).mockRejectedValue(error);

      await expect(taskService.getTasks()).rejects.toThrow(error);

      expect(getTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask = { ...mockTask, id: '2', title: 'Item 2' };

      (createTask as jest.Mock).mockResolvedValue(newTask);

      const result = await taskService.createTask('Item 2');

      expect(createTask).toHaveBeenCalledTimes(1);
      expect(createTask).toHaveBeenCalledWith('Item 2');
      expect(result).toEqual(newTask);
    });

    it('should throw error when creation fails', async () => {
      const error = new Error('Falha na criação');

      (createTask as jest.Mock).mockRejectedValue(error);

      await expect(taskService.createTask('Item 2')).rejects.toThrow(error);

      expect(createTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const updatedTask = { ...mockTask, title: 'Título atualizado', completed: true };

      (updateTask as jest.Mock).mockResolvedValue(updatedTask);

      const result = await taskService.updateTask('1', { 
        title: 'Título atualizado', 
        completed: true 
      });

      expect(updateTask).toHaveBeenCalledTimes(1);
      expect(updateTask).toHaveBeenCalledWith('1', {
        title: 'Título atualizado',
        completed: true
      });
      expect(result).toEqual(updatedTask);
    });

    it('should throw error when update fails', async () => {
      const error = new Error('Falha na atualização');
      
      (updateTask as jest.Mock).mockRejectedValue(error);

      await expect(taskService.updateTask('1', { title: 'Título atualizado' }))
        .rejects.toThrow(error);

      expect(updateTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', async () => {
      (deleteTask as jest.Mock).mockResolvedValue(undefined);

      await taskService.deleteTask('1');

      expect(deleteTask).toHaveBeenCalledTimes(1);
      expect(deleteTask).toHaveBeenCalledWith('1');
    });
  });
});