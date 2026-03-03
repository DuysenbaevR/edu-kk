import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { storage, db } from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import { MaterialType } from '@/lib/types'
import kk from '@/locales/kk'
import toast from 'react-hot-toast'

const MAX_SIZE_BYTES = 200 * 1024 * 1024 // 200MB

interface UploaderProps {
  onSuccess?: () => void
  onClose?: () => void
}

export default function FileUploader({ onSuccess, onClose }: UploaderProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<MaterialType>('presentation')
  const [uploader, setUploader] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onDrop = useCallback((accepted: File[], rejected: any[]) => {
    if (rejected.length > 0) {
      const reason = rejected[0].errors[0].code === 'file-too-large'
        ? 'Fayl ólshemi 200MB dan kem bolıwı kerek'
        : 'Fayl formati notoǵrı'
      toast.error(reason)
      return
    }
    if (accepted[0]) setFile(accepted[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_SIZE_BYTES,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
    },
    multiple: false,
  })

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = 'Atı kirgiziń'
    if (!uploader.trim()) newErrors.uploader = 'Jüklegen adamniń atın kirgiziń'
    if (!file) newErrors.file = 'Fayl tańlaw zarúr'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      const fileId = uuidv4()
      const ext = file.name.split('.').pop()
      const storagePath = `materials/${fileId}.${ext}`

      // 1. Upload main file
      const fileRef = ref(storage, storagePath)
      await new Promise<string>((resolve, reject) => {
        const task = uploadBytesResumable(fileRef, file)
        task.on(
          'state_changed',
          (snap) => {
            const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 80)
            setProgress(pct)
          },
          reject,
          async () => {
            const url = await getDownloadURL(fileRef)
            resolve(url)
          }
        )
      })
      const downloadUrl = await getDownloadURL(fileRef)

      // 2. Upload thumbnail (if provided)
      let thumbnailUrl = ''
      if (thumbnail) {
        const thumbPath = `thumbnails/${fileId}.${thumbnail.name.split('.').pop()}`
        const thumbRef = ref(storage, thumbPath)
        await new Promise<void>((resolve, reject) => {
          const task = uploadBytesResumable(thumbRef, thumbnail)
          task.on(
            'state_changed',
            (snap) => {
              const pct = 80 + Math.round((snap.bytesTransferred / snap.totalBytes) * 15)
              setProgress(pct)
            },
            reject,
            resolve
          )
        })
        thumbnailUrl = await getDownloadURL(thumbRef)
      }

      setProgress(95)

      // 3. Save metadata to Firestore
      await addDoc(collection(db, 'materials'), {
        id: fileId,
        title_kk: title.trim(),
        description_kk: description.trim(),
        type,
        storagePath,
        downloadUrl,
        thumbnailUrl,
        uploadedAt: Timestamp.now(),
        uploader: uploader.trim(),
      })

      setProgress(100)
      toast.success(kk.upload.success)
      onSuccess?.()

      // Reset form
      setTitle('')
      setDescription('')
      setType('presentation')
      setUploader('')
      setFile(null)
      setThumbnail(null)
      setProgress(0)
    } catch (err) {
      console.error(err)
      toast.error(kk.upload.error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#B2EBF2] p-6 max-w-lg w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">{kk.upload.title}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {kk.upload.titleLabel} *
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00B8C8] ${
              errors.title ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Materialdıń atı..."
            disabled={uploading}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {kk.upload.descLabel}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00B8C8] resize-none"
            placeholder="Qısqasha sıpatlama..."
            disabled={uploading}
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {kk.upload.typeLabel}
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as MaterialType)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00B8C8]"
            disabled={uploading}
          >
            <option value="presentation">Prezintaciya</option>
            <option value="video">Video material</option>
            <option value="quiz">Quiz</option>
            <option value="test">Test</option>
          </select>
        </div>

        {/* Uploader */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {kk.upload.uploaderLabel} *
          </label>
          <input
            value={uploader}
            onChange={(e) => setUploader(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00B8C8] ${
              errors.uploader ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Isim Familiya"
            disabled={uploading}
          />
          {errors.uploader && <p className="text-xs text-red-500 mt-1">{errors.uploader}</p>}
        </div>

        {/* File dropzone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {kk.upload.fileLabel} *
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-[#00B8C8] bg-[#E0F7FA]'
                : errors.file
                ? 'border-red-400 bg-red-50'
                : 'border-[#B2EBF2] hover:border-[#00B8C8] hover:bg-[#F0FDFE]'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div>
                <p className="text-sm font-semibold text-[#00B8C8]">{file.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {(file.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
            ) : (
              <div>
                <svg
                  className="mx-auto mb-2 text-[#00B8C8]"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                </svg>
                <p className="text-sm text-gray-500">{kk.upload.dragDrop}</p>
                <p className="text-xs text-gray-400 mt-1">{kk.upload.maxSize}</p>
              </div>
            )}
          </div>
          {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {kk.upload.thumbnailLabel}
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => e.target.files && setThumbnail(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#E0F7FA] file:text-[#00B8C8] file:font-semibold hover:file:bg-[#B2EBF2] cursor-pointer"
            disabled={uploading}
          />
        </div>

        {/* Progress bar */}
        {uploading && (
          <div className="mt-2">
            <div className="upload-progress">
              <div className="upload-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">{progress}%</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-[#00B8C8] hover:bg-[#0099AA] disabled:bg-gray-300 text-white font-bold py-2.5 rounded-xl transition-colors"
        >
          {uploading ? kk.upload.uploading : kk.upload.submit}
        </button>
      </form>
    </div>
  )
}
