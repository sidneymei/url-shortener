import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-xl p-4 sm:p-0">
      <h2 className="text-4xl font-black mb-5">Oops!</h2>
      <p className="text-gray-700">
        We couldn&apos;t find a valid redirect for the provided link. It looks
        like the link you followed may be broken or have expired. Please check
        the link and try again. Meanwhile, you can return to the{' '}
        <Link className="underline hover:text-black hover:font-bold" href="/">
          main page
        </Link>
        .
      </p>
    </div>
  )
}
