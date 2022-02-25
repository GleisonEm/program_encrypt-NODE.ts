import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    PrimaryColumn,
    ObjectIdColumn
} from 'typeorm';
import { v4 as uuid} from "uuid";

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