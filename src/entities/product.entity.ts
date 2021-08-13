import { Collection, Entity, ManyToMany, PrimaryKey } from '@mikro-orm/core';
import { Tag } from './tag.entity';


@Entity()
export class Product {
  @PrimaryKey()
  id!: number;
  @ManyToMany(() => Tag)
  tags = new Collection<Tag>(this);

}
