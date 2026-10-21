
'use client'

import { useEffect, useState } from 'react'
import { Copy, Mail, Check } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

export default function ShareLinks() {
  const [articleUrl, setArticleUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setArticleUrl(window.location.href)
  }, [])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this article link:', window.location.href)
    }
  }

  const iconClass =
    'inline-flex h-9 w-9 items-center justify-centern text-gray-600 transition-colors hover:text-red-700'

  const encodedUrl = encodeURIComponent(articleUrl)

  return (
    <nav aria-label="Share this article" className="flex items-center gap-2">

      <a
        href={`mailto:?subject=${encodeURIComponent('An article from The Visible Hand')}&body=${encodedUrl}`}
        aria-label="Share by email"
        title="Email"
        className={iconClass}
      >
        <Mail size={16} />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        title="Facebook"
        className={iconClass}
      >
        <FaFacebookF size={16} />
      </a>


      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Instagram"
        title="Instagram"
        className={iconClass}
      >
        <FaInstagram size={16} />
      </a>
       <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Link copied' : 'Copy article link'}
        title={copied ? 'Link copied' : 'Copy link'}
        className={iconClass}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </nav>
  )
}
