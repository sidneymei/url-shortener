interface UrlFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

function UrlField({ value, onChange, error }: UrlFieldProps) {
  return (
    <div className="mb-5">
      <label className="block font-bold mb-2" htmlFor="url">
        What&apos;s the URL?
      </label>
      <input
        className={`px-4 py-3 border w-full rounded-lg ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="https://example.com"
        id="url"
        type="text"
        value={value}
        onChange={onChange}
      />
      {error && (
        <p className="text-sm md:text-base text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}

export default UrlField
