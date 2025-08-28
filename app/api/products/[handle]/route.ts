import { NextRequest, NextResponse } from 'next/server';
import connectDB from 'lib/mongodb/connection';
import Product from 'lib/mongodb/models/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    await connectDB();
    
    const product = await Product.findOne({ handle: params.handle }).lean();
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: product,
      success: true
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    const product = await Product.findOneAndUpdate(
      { handle: params.handle },
      body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: product,
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    await connectDB();
    
    const product = await Product.findOneAndDelete({ handle: params.handle });
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
