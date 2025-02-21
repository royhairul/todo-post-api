import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TodoResponse } from './dto/todo-response.dto';
import { CreateTodoRequest } from './dto/create-todo-request.dto';
import { UpdateTodoRequest } from './dto/update-todo-request.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  // Get All Data Todo
  async getAll() {
    return await this.prismaService.todo.findMany();
  }

  // Get Spesific Todo
  async getById(id: string) {
    const todo = await this.prismaService.todo.findUnique({ where: { id } });

    if (!todo) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Todo not found.',
      });
    }

    return todo;
  }

  // Create Todo
  async create(request: CreateTodoRequest): Promise<TodoResponse> {
    // Add Logger
    this.logger.debug(`TodoService.create(${JSON.stringify(request)})`);

    const todo = await this.prismaService.todo.create({
      data: {
        id: crypto.randomUUID(),
        ...request,
      },
    });

    if (!todo) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Todo not found.',
      });
    }

    return todo;
  }

  // Edit / Update Todo
  async update(id: string, request: UpdateTodoRequest): Promise<TodoResponse> {
    // Add Logger
    this.logger.debug(
      `TodoService.update(id: ${id}, request: ${JSON.stringify(request)})`,
    );

    // Periksa apakah todo dengan ID tersebut ada
    const existingTodo = await this.prismaService.todo.findUnique({
      where: { id },
    });
    if (!existingTodo) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Todo with ID ${id} not found`,
      });
    }

    const updatedTodo = await this.prismaService.todo.update({
      where: { id },
      data: {
        ...request,
        updatedAt: new Date(),
      },
    });

    return updatedTodo;
  }

  // Delete Todo
  async delete(id: string): Promise<{ message: string }> {
    // Add Logger
    this.logger.debug(`TodoService.delete(id: ${id})`);

    // Periksa apakah todo dengan ID tersebut ada
    const existingTodo = await this.prismaService.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Todo with ID ${id} not found`,
      });
    }

    await this.prismaService.todo.delete({ where: { id } });

    return { message: `Todo with ID ${id} has been deleted successfully` };
  }
}
