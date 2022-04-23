import { ServiceCategory } from "src/service-category/entities/service-category.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('ServiceGroup')
export class ServiceGroup extends BaseEntity {
    @Column()
    name: String;

    @PrimaryColumn()
    apiName: String;

    @Column()
    icon: String;

    @OneToMany(() => ServiceCategory, (serviceCategory) => serviceCategory.group)
    categories: ServiceCategory[];
}
