import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  tags: string[];
  vendor: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  variants: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    price: {
      amount: string;
      currencyCode: string;
    };
  }>;
  images: Array<{
    url: string;
    altText: string;
    width: number;
    height: number;
  }>;
  featuredImage: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  seo: {
    title: string;
    description: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
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
  availableForSale: {
    type: Boolean,
    default: true
  },
  productType: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  vendor: {
    type: String,
    required: true
  },
  priceRange: {
    minVariantPrice: {
      amount: { type: String, required: true },
      currencyCode: { type: String, required: true, default: 'USD' }
    },
    maxVariantPrice: {
      amount: { type: String, required: true },
      currencyCode: { type: String, required: true, default: 'USD' }
    }
  },
  compareAtPriceRange: {
    minVariantPrice: {
      amount: { type: String, required: true },
      currencyCode: { type: String, required: true, default: 'USD' }
    },
    maxVariantPrice: {
      amount: { type: String, required: true },
      currencyCode: { type: String, required: true, default: 'USD' }
    }
  },
  options: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    values: [{ type: String }]
  }],
  variants: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    availableForSale: { type: Boolean, default: true },
    selectedOptions: [{
      name: { type: String, required: true },
      value: { type: String, required: true }
    }],
    price: {
      amount: { type: String, required: true },
      currencyCode: { type: String, required: true, default: 'USD' }
    }
  }],
  images: [{
    url: { type: String, required: true },
    altText: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  }],
  featuredImage: {
    url: { type: String, required: true },
    altText: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true }
  }
}, {
  timestamps: true
});

// Create indexes for better performance
ProductSchema.index({ handle: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ productType: 1 });
ProductSchema.index({ vendor: 1 });
ProductSchema.index({ availableForSale: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
