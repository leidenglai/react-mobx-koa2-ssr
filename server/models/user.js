import mongoose from 'mongoose'
import BaseModel from './base'

const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    uid: { type: Number },
    avatar: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    birthDate: { type: Date, default: Date.now },
    workDate: { type: Date, default: Date.now },
    slogan: String,
    education: String,
    company: String,
    position: String,
    expectedWork: {
      // 期望工作
      position: String,
      city: String,
      salary: Number
    },
    socialList: [
      // 社交平台
      {
        platform: String,
        title: String,
        url: String
      }
    ],
    techList: [
      // 个人技能评价
      {
        skill: String,
        score: Number
      }
    ],
    skillList: [String],
    workList: [
      {
        company: String,
        logo: String,
        team: String,
        position: String,
        period: String,
        tag: [String],
        description: String
      }
    ],
    projectList: [
      {
        name: String,
        period: String,
        tag: [String],
        description: String
      }
    ],
    schoolList: [
      {
        name: String,
        logo: String,
        position: String,
        period: String
      }
    ]
  },
  { collection: 'userColletion' }
)

userSchema.plugin(BaseModel)

userSchema.index({ uid: 1 }, { unique: true })

mongoose.model('userColletion', userSchema)
