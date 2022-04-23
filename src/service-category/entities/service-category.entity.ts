import { ServiceGroup } from "src/service-group/entities/service-group.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('ServiceCategory')
export class ServiceCategory extends BaseEntity {
    @ManyToOne(() => ServiceGroup, (serviceGroup) => serviceGroup.categories, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({name: 'groupName'})
    group: ServiceGroup;

    @Column()
    name: String;

    @Column()
    icon: String;

    @PrimaryColumn()
    apiName: String;

    @Column("text", {
        array: true,
    })
    alternativeNames: String[];

    // services: Service[]
}
