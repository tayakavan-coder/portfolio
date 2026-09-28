import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: string;
  description: string;
  fullDetails: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  fullDetails: { type: String, required: true },
  techStack: [{ type: String }],
  liveUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
