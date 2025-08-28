# MongoDB Setup Guide

This project has been updated to use MongoDB instead of Shopify. Here's how to set it up and run it.

## Prerequisites

1. **MongoDB** - You need MongoDB installed and running locally, or a MongoDB Atlas connection string
2. **Node.js** - Version 18 or higher
3. **pnpm** - Package manager

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables in `.env.local`:
```bash
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/commerce

# Site Configuration
SITE_NAME=Next.js Commerce
COMPANY_NAME=Your Company Name
```

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB locally:
   - **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. Start MongoDB service:
   - **Windows**: MongoDB runs as a service
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `.env.local` with your Atlas connection string:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/commerce
```

## Database Seeding

After setting up MongoDB, seed the database with initial data:

```bash
pnpm seed
```

This will create:
- Sample products (Basic Tee, Denim Jeans)
- Sample collections (Clothing, Accessories)
- Sample cart data

## Running the Application

1. Start the development server:
```bash
pnpm dev
```

2. The application will be available at `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - List all products with pagination and filtering
- `POST /api/products` - Create a new product
- `GET /api/products/[handle]` - Get product by handle
- `PUT /api/products/[handle]` - Update product
- `DELETE /api/products/[handle]` - Delete product

### Collections
- `GET /api/collections` - List all collections
- `POST /api/collections` - Create a new collection

### Cart
- `GET /api/cart` - Get current cart
- `POST /api/cart` - Add product to cart

### Search
- `GET /api/search?q=query` - Search products with filters

## API Features

- **Pagination**: Use `limit` and `offset` parameters
- **Search**: Full-text search across product titles, descriptions, tags
- **Filtering**: By category, price range, availability
- **Sorting**: By price, date, name, relevance
- **Real-time cart**: Add/remove items with automatic total calculation

## Database Models

### Product
- Basic info (title, description, handle)
- Variants with options (size, color)
- Pricing and availability
- Images and SEO metadata

### Collection
- Group products by category
- Custom descriptions and images
- SEO optimization

### Cart
- Shopping cart with line items
- Automatic total calculation
- Product variant selection

## Development

### Adding New Products

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Product",
    "handle": "new-product",
    "description": "Product description",
    "priceRange": {
      "minVariantPrice": { "amount": "29.99", "currencyCode": "USD" },
      "maxVariantPrice": { "amount": "29.99", "currencyCode": "USD" }
    }
  }'
```

### Querying Products

```bash
# Get products with pagination
GET /api/products?limit=10&offset=0

# Search products
GET /api/search?q=shirt&category=clothing&sortBy=price_low

# Get specific product
GET /api/products/basic-tee
```

## Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running
- Verify connection string in `.env.local`
- Check firewall settings for remote connections

### API Errors
- Check browser console for error messages
- Verify MongoDB connection
- Check API route parameters

### Performance Issues
- Ensure MongoDB indexes are created
- Use pagination for large datasets
- Implement caching for frequently accessed data

## Next Steps

1. **Customize Data**: Update mock data in `lib/api/mock-data.ts`
2. **Add Authentication**: Implement user authentication and authorization
3. **Add Payment**: Integrate with Stripe or other payment providers
4. **Add Admin Panel**: Create admin interface for managing products
5. **Add Images**: Implement image upload and storage
6. **Add Analytics**: Track user behavior and sales metrics

## Support

For issues or questions:
1. Check the MongoDB logs
2. Review API response errors
3. Check the browser console
4. Verify environment variables
