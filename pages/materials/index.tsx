import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Material, MaterialType } from '@/lib/types'
import MaterialCard from '@/components/MaterialCard'
import FileUploader from '@/components/FileUploader'
import kk from '@/locales/kk'

type FilterType = MaterialType | 'all'

const sidebarItems: { key: FilterType; label: string }[] = [
  { key: 'all', label: kk.materials.all },
  { key: 'presentation', label: kk.materials.sidebar.presentations },
  { key: 'video', label: kk.materials.sidebar.videos },
  { key: 'quiz', label: kk.materials.sidebar.quizzes },
  { key: 'test', label: kk.materials.sidebar.tests },
]

// Demo materials shown when Firebase isn't connected
const DEMO_MATERIALS: Material[] = Array.from({ length: 9 }, (_, i) => ({
  id: `demo-${i + 1}`,
  title_kk: `Jasalma intellekt – ${i + 1}-tema`,
  description_kk: 'Jasalma intellekt haqqında prezintaciya',
  type: (['presentation', 'video', 'quiz', 'test'] as MaterialType[])[i % 4],
  storagePath: '',
  thumbnailUrl: '',
  downloadUrl: '',
  uploadedAt: new Date().toISOString(),
  uploader: 'Mirzabaeva M.B.',
}))

const MaterialsPage: NextPage = () => {
  const [materials, setMaterials] = useState<Material[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState(true)
  const [showUploader, setShowUploader] = useState(false)
  const [isFirebaseReady, setIsFirebaseReady] = useState(false)

  const loadMaterials = async (activeFilter: FilterType) => {
    setLoading(true)
    try {
      let q
      if (activeFilter === 'all') {
        q = query(collection(db, 'materials'), orderBy('uploadedAt', 'desc'))
      } else {
        q = query(
          collection(db, 'materials'),
          where('type', '==', activeFilter),
          orderBy('uploadedAt', 'desc')
        )
      }
      const snap = await getDocs(q)
      const docs = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        uploadedAt: d.data().uploadedAt?.toDate?.() ?? d.data().uploadedAt,
      })) as Material[]
      setMaterials(docs)
      setIsFirebaseReady(true)
    } catch (err) {
      console.warn('Firebase not configured, using demo data.', err)
      setIsFirebaseReady(false)
      const filtered =
        activeFilter === 'all'
          ? DEMO_MATERIALS
          : DEMO_MATERIALS.filter((m) => m.type === activeFilter)
      setMaterials(filtered)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMaterials(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="bg-[#F0FDFE] rounded-2xl border border-[#B2EBF2] p-5">
            <nav className="flex flex-col gap-4">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`text-left transition-all font-semibold text-sm ${
                    filter === item.key
                      ? 'text-gray-900 font-extrabold'
                      : 'text-[#00B8C8] hover:text-[#0099AA]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Upload button */}
          <button
            onClick={() => setShowUploader(true)}
            className="mt-4 w-full bg-[#00B8C8] hover:bg-[#0099AA] text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
            </svg>
            {kk.materials.uploadBtn}
          </button>
        </aside>

        {/* Main grid */}
        <section className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-[#E0F7FA] animate-pulse aspect-[16/10]"
                />
              ))}
            </div>
          ) : materials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="mb-3">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
              </svg>
              <p>{kk.materials.noMaterials}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {materials.map((m, i) => (
                <MaterialCard key={m.id} material={m} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Upload modal */}
      {showUploader && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <FileUploader
            onClose={() => setShowUploader(false)}
            onSuccess={() => {
              setShowUploader(false)
              loadMaterials(filter)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default MaterialsPage
