export type MaterialType = 'presentation' | 'video' | 'quiz' | 'test'

export interface Material {
  id: string
  title_kk: string
  description_kk: string
  type: MaterialType
  storagePath: string
  thumbnailUrl: string
  downloadUrl: string
  uploadedAt: Date | string
  uploader: string
}

export const TYPE_LABELS: Record<MaterialType, string> = {
  presentation: 'Prezintaciyalar',
  video: 'Video materiyallar',
  quiz: 'Quiz oynılar',
  test: 'Testler',
}

export const TYPE_COLORS: Record<MaterialType, string> = {
  presentation: 'bg-blue-100 text-blue-700',
  video: 'bg-purple-100 text-purple-700',
  quiz: 'bg-green-100 text-green-700',
  test: 'bg-orange-100 text-orange-700',
}
