import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "collections" })
export class Collection {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column()
    parentTweetId: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;
}