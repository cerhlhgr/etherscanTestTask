import { BeforeUpdate, CreateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;
}
