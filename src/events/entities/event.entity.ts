import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity()
@Index(['type', 'name'])
export class Event {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  name: string

  @Column('json')
  payload: Record<string, any>
}
