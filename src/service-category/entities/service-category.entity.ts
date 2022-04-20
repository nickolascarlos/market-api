import { ServiceGroup } from "src/service-group/entities/service-group.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ServiceCategory')
export class ServiceCategory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @ManyToOne(() => ServiceGroup, (serviceGroup) => serviceGroup.categories, {
        onDelete: 'SET NULL'
    })
    group: ServiceGroup;

    @Column()
    name: String;

    @Column()
    icon: String;

    @Column()
    apiName: String;

    @Column("text", {
        array: true,
    })
    alternativeNames: String[];

    // services: Service[]
}
