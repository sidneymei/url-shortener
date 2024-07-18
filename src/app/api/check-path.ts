import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
  const { path } = await request.json()

  if (!path) {
    return new NextResponse('Path is required', { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('url_shortener')
    const collection = db.collection('redirects')
    const existing = await collection.findOne({ path })

    return NextResponse.json({ available: !existing })
  } catch (error) {
    console.error('Failed to check path availability:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
