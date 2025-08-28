import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: Array<{
    id: string;
    quantity: number;
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
    merchandise: {
      id: string;
      title: string;
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
      product: {
        id: string;
        handle: string;
        title: string;
        featuredImage: {
          url: string;
          altText: string;
          width: number;
          height: number;
        };
      };
    };
  }>;
  totalQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema = new Schema({
  checkoutUrl: {
    type: String,
    required: true
  },
  cost: {
    subtotalAmount: {
      amount: { type: String, required: true },
      currencyCode: { type: String, required: true, default: 'USD' }
    },
    totalAmount: {
      amount: { type: String, required: true },
      currencyCode: { type: String, required: true, default: 'USD' }
    },
    totalTaxAmount: {
      amount: { type: String, required: true },
      currencyCode: { type: String, required: true, default: 'USD' }
    }
  },
  lines: [{
    id: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    cost: {
      totalAmount: {
        amount: { type: String, required: true },
        currencyCode: { type: String, required: true, default: 'USD' }
      }
    },
    merchandise: {
      id: { type: String, required: true },
      title: { type: String, required: true },
      selectedOptions: [{
        name: { type: String, required: true },
        value: { type: String, required: true }
      }],
      product: {
        id: { type: String, required: true },
        handle: { type: String, required: true },
        title: { type: String, required: true },
        featuredImage: {
          url: { type: String, required: true },
          altText: { type: String, required: true },
          width: { type: Number, required: true },
          height: { type: Number, required: true }
        }
      }
    }
  }],
  totalQuantity: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create indexes for better performance
CartSchema.index({ createdAt: 1 });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
