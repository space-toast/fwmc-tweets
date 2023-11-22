import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryColumn
} from "typeorm";

@Entity({ name: "tweets" })
export class Tweet {
    @PrimaryColumn()
    id: string;

    @Column()
    conversationId: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    userId: string;

    @Column()
    permanentUrl: string;

    @Column()
    text: string;
    
    @Column()
    timeParsed: Date;

    @Column()
    timestamp: number;

    @Column()
    inReplyToStatusId: string;

    @Column({ nullable: true, default: null })
    collectionId?: string;

    @CreateDateColumn()
    createdAt: Date;
}