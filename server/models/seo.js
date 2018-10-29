import mongoose from 'mongoose'
import BaseModel from './base'

const Schema = mongoose.Schema
const seoSchema = new Schema(
  {
    url: String,
    title: String,
    description: String
  },
  { collection: 'seoColletion' }
)

seoSchema.plugin(BaseModel)
seoSchema.index({ url: 1 }, { unique: true })

mongoose.model('seoColletion', seoSchema)
