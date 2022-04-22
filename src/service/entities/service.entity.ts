import { Provider } from "src/provider/entities/provider.entity";
import { ServiceCategory } from "src/service-category/entities/service-category.entity";
import { Amenity, PossibleServices } from "src/types";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Service')
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Provider, (provider) => provider.services, {
        onDelete: 'CASCADE'
    })
    provider: Provider;

    @Column({ nullable: true })
    providerId: string;

    @ManyToOne(() => ServiceCategory)
    category: ServiceCategory;

    @Column({ nullable: true })
    categoryId: string;

    @Column()
    description: string;

    @Column("decimal", {
        precision: 5,
        scale: 2
    })
    price: number;

    @Column("text", {
        array: true,
    })
    amenities: Amenity[];
    
    @Column()
    acceptsCards: boolean;
    
    @Column("jsonb")
    details: PossibleServices;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
