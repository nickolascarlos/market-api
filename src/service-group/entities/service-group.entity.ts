import { ServiceCategory } from "src/service-category/entities/service-category.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ServiceGroup')
export class ServiceGroup extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    name: String;

    @Column()
    icon: String;

    @ManyToMany(() => ServiceCategory, (serviceCategory) => serviceCategory.groups)
    @JoinTable()
    categories: ServiceCategory[];
}
