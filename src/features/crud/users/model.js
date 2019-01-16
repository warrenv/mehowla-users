import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const editableFields = ['name', 'playlist', 'textSize', 'theme']
export const displayFields = ['id', 'email', ...editableFields, 'createdAt', 'updatedAt']
export const validRequestFields = ['id', 'email', ...editableFields]

let UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, max: 100 },
    email: { type: String, required: true, unique: true, max: 100 },
    playlist: { type: String, required: false, max: 100 },
    textSize: { type: Number, default: 8 },
    theme: { type: String, default: 'light' },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
