'use client'

import { useState } from 'react'
import validator from 'validator'
import { generate } from 'random-words'
import UrlField from '@/components/UrlField'
import PathField from '@/components/PathField'
import Modal from '@/components/Modal'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000'

interface Errors {
  url?: string
  path?: string
  form?: string
}

export default function Page() {
  const [url, setUrl] = useState('')
  const [path, setPath] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (id === 'url') setUrl(value)
    else if (id === 'path') setPath(value)

    // Clear error for the changed field
    if (errors[id as keyof Errors]) {
      setErrors((prevErrors) => {
        const { [id as keyof Errors]: _, ...newErrors } = prevErrors
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let newErrors: Errors = {}

    if (!validator.isURL(url)) {
      newErrors.url = 'Please provide a valid URL like "https://example.com"'
    }

    if (path && !validator.isSlug(path)) {
      newErrors.path =
        'Only letters, numbers, hyphens, and underscores are allowed'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, url }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ form: data.error })
        return
      }

      setShortUrl(`${domain}/${data.path}`)
      setIsOpen(true)
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred. Please try again.' })
    }
  }

  const generateRandomPath = () => {
    setPath(generate({ exactly: 3, join: '-' }))
  }

  return (
    <>
      <div className="px-4 sm:mx-6 md:mx-auto max-w-2xl w-full">
        <div className="mb-5">
          <h2 className="text-4xl font-black mb-5">Shorten a long URL</h2>
          <p className="text-sm font-light mb-5">
            This is a URL shortening tool created using Next.js and MongoDB.
          </p>
        </div>

        {errors.form && (
          <p className="alert">
            {errors.form}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <UrlField value={url} onChange={handleChange} error={errors.url} />

          <PathField
            domain={domain}
            path={path}
            onChange={handleChange}
            generateRandomPath={generateRandomPath}
            error={errors.path}
          />

          <button
            type="submit"
            className="mb-4 px-4 py-3 bg-blue-500 font-semibold text-white rounded-lg"
          >
            Generate
          </button>
        </form>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} shortUrl={shortUrl} />
    </>
  )
}
