import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    PrimaryColumn,
    ObjectIdColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { v4 as uuid} from "uuid";
import { User } from './User';

@Entity('encrypties')
export class Encrypt {
    @ObjectIdColumn()
    _id: string;

    @Column()
    description: string;

    @Column()
    encrypted: string;

    @Column()
    originalContent: string;

    @Column()
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    provider: User;

    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    updatedAt: Date;

    constructor() {
        if (!this._id) {
            this._id = uuid();
        }
    }
}