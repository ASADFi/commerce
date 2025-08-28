import mongoose, { Document, Schema } from 'mongoose';

export interface ICollection extends Document {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  seo: {
    title: string;
    description: string;
  };
  path: string;
  updatedAt: Date;
}

const CollectionSchema: Schema = new Schema({
  handle: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  descriptionHtml: {
    type: String,
    required: true
  },
  image: {
    url: { type: String, required: true },
    altText: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  path: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: { createdAt: false, updatedAt: true }
});

// Create indexes for better performance
CollectionSchema.index({ handle: 1 });
CollectionSchema.index({ path: 1 });

export default mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);
