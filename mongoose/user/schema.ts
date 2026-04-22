import { InferSchemaType, Schema } from "mongoose";

export const UserSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN', 'BOT'],
            default: 'USER',
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export declare type UserType = InferSchemaType<typeof UserSchema>