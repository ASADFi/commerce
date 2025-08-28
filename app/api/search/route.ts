import { NextRequest, NextResponse } from 'next/server';
import connectDB from 'lib/mongodb/connection';
import Product from 'lib/mongodb/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category') || '';
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const sortBy = searchParams.get('sortBy') || 'relevance';

    if (!query) {
      return NextResponse.json(
        { success: false, message: 'Search query is required' },
        { status: 400 }
      );
    }

    // Build search query
    let searchQuery: any = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
        { productType: { $regex: query, $options: 'i' } },
        { vendor: { $regex: query, $options: 'i' } }
      ]
    };

    // Add filters
    if (category) {
      searchQuery.productType = { $regex: category, $options: 'i' };
    }

    if (priceMin || priceMax) {
      searchQuery['priceRange.minVariantPrice.amount'] = {};
      if (priceMin) searchQuery['priceRange.minVariantPrice.amount'].$gte = priceMin;
      if (priceMax) searchQuery['priceRange.minVariantPrice.amount'].$lte = priceMax;
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
      case 'relevance':
      default:
        // For relevance, we'll use text score if available, otherwise default to creation date
        sort = { createdAt: -1 };
    }

    // Execute search with pagination
    const products = await Product.find(searchQuery)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .lean();
    
    const total = await Product.countDocuments(searchQuery);

    // Get unique categories for filtering
    const categories = await Product.distinct('productType');

    return NextResponse.json({
      data: {
        products,
        filters: {
          query,
          category,
          priceMin: priceMin ? parseFloat(priceMin) : undefined,
          priceMax: priceMax ? parseFloat(priceMax) : undefined,
          categories
        },
        pagination: {
          page: Math.floor(offset / limit) + 1,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      },
      success: true
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to search products' },
      { status: 500 }
    );
  }
}
