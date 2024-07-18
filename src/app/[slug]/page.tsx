import { notFound, redirect } from 'next/navigation'
import clientPromise from '@/lib/mongodb'
import { Db, MongoClient, WithId, Document as MongoDocument } from 'mongodb'

async function fetchRedirectData(
  slug: string
): Promise<WithId<MongoDocument> | null> {
  try {
    const client: MongoClient = await clientPromise
    const db: Db = client.db('url_shortener')
    const redirect: WithId<MongoDocument> | null = await db
      .collection('redirects')
      .findOne({ path: slug })
    return redirect
  } catch (error) {
    console.error('Failed to fetch redirect data:', error)
    return null
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const redirectData = await fetchRedirectData(params.slug)

  if (!redirectData || typeof redirectData.url !== 'string') {
    notFound()
  }

  // Always prepend 'https://' to the stored URL if it doesn't already have a protocol
  const url =
    redirectData.url.startsWith('http://') ||
    redirectData.url.startsWith('https://')
      ? redirectData.url
      : `https://${redirectData.url}`

  redirect(url)
}
