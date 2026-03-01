import Image from 'next/image'
import Link from 'next/link'
import { Material, TYPE_LABELS, TYPE_COLORS } from '@/lib/types'
import kk from '@/locales/kk'

interface MaterialCardProps {
  material: Material
  index: number
}

export default function MaterialCard({ material, index }: MaterialCardProps) {
  return (
    <Link href={`/materials/${material.id}`} className="block">
      <div className="material-card bg-white rounded-2xl border border-[#B2EBF2] overflow-hidden cursor-pointer">
        {/* Thumbnail */}
        <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] overflow-hidden">
          {material.thumbnailUrl ? (
            <Image
              src={material.thumbnailUrl}
              alt={material.title_kk}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PlaceholderIcon type={material.type} />
            </div>
          )}

          {/* Type badge */}
          <span
            className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[material.type]}`}
          >
            {TYPE_LABELS[material.type]}
          </span>
        </div>

        {/* Footer label */}
        <div className="px-3 py-2 bg-[#E0F7FA] text-center">
          <p className="text-sm font-bold text-[#00B8C8] truncate">
            {index + 1}-{kk.materials.tema}
          </p>
          <p className="text-xs text-gray-600 truncate mt-0.5">{material.title_kk}</p>
        </div>
      </div>
    </Link>
  )
}

function PlaceholderIcon({ type }: { type: string }) {
  if (type === 'video') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="#00B8C8">
        <path d="M8 5v14l11-7z" />
      </svg>
    )
  }
  if (type === 'presentation') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="#00B8C8">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
      </svg>
    )
  }
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="#00B8C8">
      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
    </svg>
  )
}
