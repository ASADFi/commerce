import connectDB from 'lib/mongodb/connection';
import Product from 'lib/mongodb/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';

    // Build query
    let query: any = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (category) {
      query.productType = { $regex: category, $options: 'i' };
    }

    // Build sort object
    let sort: any = {};
    switch (sortBy) {
      case 'price_low':
        sort = { 'priceRange.minVariantPrice.amount': 1 };
        break;
      case 'price_high':
        sort = { 'priceRange.minVariantPrice.amount': -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'name':
        sort = { title: 1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    // Execute query with pagination
    const products = await Product.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .lean();
    
    const total = await Product.countDocuments(query);

    return NextResponse.json({
      data: products,
      success: true,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.handle || !body.description) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if product with handle already exists
    const existingProduct = await Product.findOne({ handle: body.handle });
    if (existingProduct) {
      return NextResponse.json(
        { success: false, message: 'Product with this handle already exists' },
        { status: 409 }
      );
    }

    const product = new Product(body);
    await product.save();

    return NextResponse.json({
      data: product,
      success: true,
      message: 'Product created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    );
  }
}
