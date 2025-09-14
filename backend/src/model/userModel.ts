
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    about?: string;
    password: string;
    role?: 'attendee' | 'organizer'; 
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        username: { 
            type: String, 
            required: true, 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        about: { 
            type: String, 
            default: '' 
        },
        password: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String, 
            enum: ['attendee', 'organizer'],
            required: true,
            default: 'attendee' 
        }
    },
    {
        timestamps: true 
    }
);

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
