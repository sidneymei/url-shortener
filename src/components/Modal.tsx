import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/pro-light-svg-icons'

interface ModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  shortUrl: string
}

function Modal({ isOpen, setIsOpen, shortUrl }: ModalProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setIsOpen(false)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-black leading-6 text-gray-900"
                >
                  Your shortened URL is ready!
                </Dialog.Title>
                <p className="mt-2 text-sm font-light">
                  This URL will remain active and accessible for the next 30
                  days.
                </p>
                <div className="mt-6 flex border rounded-lg overflow-hidden bg-gray-100">
                  <input
                    className="outline-none focus:ring-0 border-none py-3 px-4 text-gray-700 flex-grow bg-transparent"
                    value={shortUrl}
                    readOnly
                  />
                  <button
                    className="text-gray-700 hover:text-black py-3 px-5 bg-transparent"
                    onClick={copyToClipboard}
                  >
                    <FontAwesomeIcon icon={faClipboard} />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
