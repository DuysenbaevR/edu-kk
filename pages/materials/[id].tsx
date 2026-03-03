import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Material, TYPE_LABELS, TYPE_COLORS } from '@/lib/types'
import Link from 'next/link'
import kk from '@/locales/kk'

export default function MaterialView() {
  const router = useRouter()
  const { id } = router.query
  const [material, setMaterial] = useState<Material | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id || typeof id !== 'string') return
    const load = async () => {
      try {
        // Try by doc id first
        const docRef = doc(db, 'materials', id)
        const snap = await getDoc(docRef)
        if (snap.exists()) {
          setMaterial({ id: snap.id, ...snap.data() } as Material)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#00B8C8] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!material) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-6">Material tabılmadı</p>
        <Link
          href="/materials"
          className="text-[#00B8C8] font-semibold hover:underline"
        >
          ← {kk.general.back}
        </Link>
      </div>
    )
  }

  const isVideo = material.type === 'video'
  const isPdf =
    material.storagePath?.endsWith('.pdf') ||
    material.downloadUrl?.includes('.pdf')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/materials"
        className="inline-flex items-center gap-1 text-[#00B8C8] font-semibold mb-6 hover:underline"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        {kk.general.back}
      </Link>

      <div className="bg-white rounded-2xl border border-[#B2EBF2] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E0F7FA]">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${TYPE_COLORS[material.type]}`}
              >
                {TYPE_LABELS[material.type]}
              </span>
              <h1 className="text-2xl font-extrabold text-gray-800">{material.title_kk}</h1>
              {material.description_kk && (
                <p className="text-gray-500 mt-2 text-sm">{material.description_kk}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {material.uploader} ·{' '}
                {material.uploadedAt instanceof Date
                  ? material.uploadedAt.toLocaleDateString('ru-RU')
                  : typeof material.uploadedAt === 'string'
                  ? new Date(material.uploadedAt).toLocaleDateString('ru-RU')
                  : ''}
              </p>
            </div>
            {/* Download button */}
            {material.downloadUrl && (
              <a
                href={material.downloadUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#00B8C8] hover:bg-[#0099AA] text-white font-bold px-5 py-2.5 rounded-xl transition-colors shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
                {kk.materials.download}
              </a>
            )}
          </div>
        </div>

        {/* Viewer */}
        <div className="p-4">
          {isVideo && material.downloadUrl ? (
            <video
              src={material.downloadUrl}
              controls
              className="w-full rounded-xl max-h-[60vh]"
            />
          ) : isPdf && material.downloadUrl ? (
            <iframe
              src={`${material.downloadUrl}#toolbar=1`}
              className="w-full rounded-xl border border-[#B2EBF2]"
              style={{ height: '70vh' }}
              title={material.title_kk}
            />
          ) : material.downloadUrl ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#00B8C8">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
              </svg>
              <p>Bunı brauzerde kórsiw múmkin emes. Jüklep alıń:</p>
              <a
                href={material.downloadUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="bg-[#00B8C8] text-white font-bold px-6 py-2 rounded-xl hover:bg-[#0099AA] transition-colors"
              >
                {kk.materials.download}
              </a>
            </div>
          ) : (
            <div className="py-16 text-center text-gray-400">Fayl tabılmadı</div>
          )}
        </div>
      </div>
    </div>
  )
}
