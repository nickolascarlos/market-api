import { ServiceCategory } from "src/service-category/entities/service-category.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ServiceGroup')
export class ServiceGroup extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    name: String;

    @Column()
    apiName: String;

    @Column()
    icon: String;

    @OneToMany(() => ServiceCategory, (serviceCategory) => serviceCategory.group)
    categories: ServiceCategory[];
}
