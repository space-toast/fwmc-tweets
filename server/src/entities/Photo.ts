import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "photos" })
export class Photo {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    url: string;

    @Column()
    tweetId: string;

    @CreateDateColumn()
    createdAt: Date;
}