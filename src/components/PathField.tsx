import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/pro-light-svg-icons'

interface PathFieldProps {
  domain: string
  path: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  generateRandomPath: () => void
  error?: string
}

function PathField({
  domain,
  path,
  onChange,
  generateRandomPath,
  error,
}: PathFieldProps) {
  return (
    <div className="w-full mb-6">
      <div className="flex flex-col md:flex-row w-full items-end">
        <div className="w-full">
          <label className="block mb-2" htmlFor="custom-url">
            <span className="font-bold">Customize your URL</span>
            <p className="text-xs mt-1 text-gray-500">
              Enter a custom path or leave blank for a randomly generated one.
            </p>
          </label>
          <div
            className={`flex flex-grow rounded-lg overflow-hidden border ${
              error
                ? 'border-red-500'
                : 'border-gray-300 focus-within:border-blue-600'
            }`}
          >
            <span className="pl-4 py-3 text-gray-700 font-medium">
              {domain}
            </span>
            <span className="px-2 py-3 text-gray-400">/</span>
            <input
              className="flex-grow outline-none focus:ring-0 border-none pl-0 py-3"
              placeholder="some-path"
              id="path"
              type="text"
              value={path}
              onChange={onChange}
            />
            <button
              className="text-gray-700 hover:text-black py-3 px-4 leading-none"
              onClick={generateRandomPath}
              type="button"
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-sm md:text-base text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}

export default PathField
