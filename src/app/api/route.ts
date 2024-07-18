import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import clientPromise from '@/lib/mongodb'
import { error } from 'console'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000'

let indexesCreated = false

async function createIndexes(db) {
  if (!indexesCreated) {
    await db.collection('redirects').createIndex({ path: 1 }, { unique: true })
    await db
      .collection('redirects')
      .createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 }) // 30 days
    indexesCreated = true
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  
  const originDomain = origin.replace(/^https?:\/\//, '')

  if (originDomain !== domain) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const data = await request.json()

  if (!data.url) {
    return NextResponse.json(
      { error: 'URL field is required' },
      { status: 400 }
    )
  }

  // Remove any existing protocol from the URL
  data.url = data.url.replace(/^https?:\/\//i, '')

  // Generate a short random link if not provided
  if (!data.path) {
    data.path = nanoid(7)
  }

  data.createdAt = new Date()

  try {
    const client = await clientPromise
    const db = client.db('url_shortener')

    await createIndexes(db)

    await db.collection('redirects').insertOne(data)

    return NextResponse.json(data)
  } catch (error) {
    // Default error message and code
    let errorMessage = 'Failed to create short URL. Please try again.'
    let statusCode = 500
    
    if (error.code === 11000) {
      errorMessage = 'This custom link is already in use. Please try a different one.'
      statusCode = 409
    }

    return NextResponse.json(
      { error: errorMessage, code: error.code },
      { status: statusCode }
    )
  }
}