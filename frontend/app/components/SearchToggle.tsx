
'use client'

import { useEffect, useRef, useState } from 'react'

export function SearchToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const frame = requestAnimationFrame(() => inputRef.current?.focus())

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const searchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  )

  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m18 6-12 12M6 6l12 12" />
    </svg>
  )

  return (
    <>
      {/* Desktop search */}
      <div className="relative hidden h-10 w-10 shrink-0 items-center justify-end min-[901px]:flex">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close search' : 'Open search'}
          aria-expanded={isOpen}
          className={`relative z-10 p-2 transition-colors hover:text-red-800 ${isOpen ? 'text-gray-500' : 'text-gray-600'
            }`}
        >
          {isOpen ? closeIcon : searchIcon}
        </button>

<form
  action="/search"
  method="GET"
  role="search"
  aria-hidden={!isOpen}
  className={`absolute right-0 top-1/2 flex -translate-y-1/2 items-center overflow-hidden transition-[width] duration-300 ease-out ${
    isOpen
      ? 'w-60 max-[950px]:w-52 pr-10'
      : 'pointer-events-none w-0'
  }`}
>
  <div
    className={`flex min-w-0 flex-1 items-center border-b transition-[opacity,border-color] duration-150 ${
      isOpen
        ? 'border-gray-400 opacity-100 focus-within:border-red-800'
        : 'border-transparent opacity-0'
    }`}
  >
    <input
      ref={inputRef}
      type="search"
      name="q"
      placeholder="Search articles"
      aria-label="Search articles"
      tabIndex={isOpen ? 0 : -1}
      className="search-input min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-gray-400"
    />
  </div>
</form>
      </div>

      {/* Mobile search trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open search"
        aria-expanded={isOpen}
        className=" text-gray-600 transition-colors hover:text-red-800 min-[901px]:hidden"
      >
        {searchIcon}
      </button>

      {/* Mobile popup */}
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center bg-black/40 px-4 pt-[18vh] backdrop-blur-[2px] min-[901px]:hidden"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search articles"
            className="w-full max-w-md border border-gray-200 bg-white p-5 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-serif text-xl font-semibold text-gray-900">
                Search articles
              </p>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close search"
                className="p-2 text-gray-500 transition-colors hover:text-red-800"
              >
                {closeIcon}
              </button>
            </div>

            <form action="/search" method="GET" role="search">
              <div className="flex items-center border-b border-gray-400 focus-within:border-red-800">
                <input
                  ref={inputRef}
                  type="search"
                  name="q"
                  placeholder="Enter a title or keyword..."
                  aria-label="Search articles"
                  className="search-input min-w-0 flex-1 bg-transparent py-3 text-base outline-none placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  aria-label="Submit search"
                  className="p-2 text-gray-600 transition-colors hover:text-red-800"
                >
                  {searchIcon}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
