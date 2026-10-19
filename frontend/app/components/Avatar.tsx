
import Image from '@/app/components/SanityImage'

type Props = {
  person: {
    name?: string | null
    image?: {
      asset?: { _ref: string }
      hotspot?: { x: number; y: number }
      crop?: { top: number; bottom: number; left: number; right: number }
      alt?: string
    } | null
  }
  small?: boolean
}

export default function Avatar({ person, small = false }: Props) {
  const { name, image } = person

  return (
    <div className="flex items-center font-mono">
      {image?.asset?._ref && (
        <div className={`${small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'}`}>
          <Image
            id={image.asset._ref}
            alt={image.alt || (name ? `Portrait of ${name}` : '')}
            className="h-full rounded-full"
            height={small ? 32 : 48}
            width={small ? 32 : 48}
            hotspot={image.hotspot}
            crop={image.crop}
            mode="cover"
          />
        </div>
      )}
      {name && (
        <span className={small ? 'text-sm' : 'text-sm'}>
          {name}
        </span>
      )}
    </div>
  )
}
