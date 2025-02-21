import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { TodoPriority, TodoStatus } from '@prisma/client';

export class TodoResponse {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID unik dari todo',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'Promo Shopee 11.11',
    description: 'Judul dari todo',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'Menjadwalkan post promo Shopee 11.11 di Instagram',
    description: 'Deskripsi opsional',
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    example: 'Shopee Official',
    description: 'Nama brand atau akun sosial media',
  })
  @IsString()
  brand: string;

  @ApiProperty({
    example: '2025-03-01T10:00:00.000Z',
    description: 'Tanggal dan waktu deadline post (ISO format)',
  })
  @IsDateString()
  dueDate: Date;

  @ApiProperty({
    example: 'Instagram',
    description: 'Platform sosial media yang digunakan',
  })
  @IsString()
  platform: string;

  @ApiPropertyOptional({
    example: 150000,
    description: 'Budget untuk post berbayar (opsional)',
  })
  @IsOptional()
  @IsNumber()
  payment?: number | null;

  @ApiProperty({
    enum: TodoPriority,
    example: TodoPriority.HIGH,
    description: 'Prioritas todo',
  })
  @IsEnum(TodoPriority)
  priority: TodoPriority;

  @ApiProperty({
    enum: TodoStatus,
    example: TodoStatus.PENDING,
    description: 'Status todo',
  })
  @IsEnum(TodoStatus)
  status: TodoStatus;

  @ApiProperty({
    example: '2025-02-20T08:30:00.000Z',
    description: 'Waktu pembuatan todo',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2025-02-20T09:00:00.000Z',
    description: 'Waktu terakhir update todo',
  })
  @IsDateString()
  updatedAt: Date;
}
