import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';


// Type definition for Friend on the backend
export type Friend = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  UserA: Types.ObjectId;
  UserB: Types.ObjectId;
  status: string; //Status takes on the values of "FOLLOWER", "FOLLOWING", or "BLOCKED"
};

// Mongoose schema definition for interfacing with a MongoDB table
// Friends stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FriendSchema = new Schema<Friend>({
  // The author userId
  UserA: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  UserB: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    required: true
  }
});

const FriendModel = model<Friend>('Friend', FriendSchema);
export default FriendModel;