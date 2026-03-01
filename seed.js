/**
 * Seed script: creates demo materials in Firestore
 * Usage: node scripts/seed.js (after setting up Firebase Admin SDK)
 *
 * Requires: npm install firebase-admin
 * Set GOOGLE_APPLICATION_CREDENTIALS env or use serviceAccount.json
 */

const admin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')

// Option A: Use service account file
// const serviceAccount = require('../serviceAccount.json')
// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

// Option B: Use application default credentials (GOOGLE_APPLICATION_CREDENTIALS env)
admin.initializeApp()

const db = admin.firestore()

const demoMaterials = [
  {
    id: uuidv4(),
    title_kk: 'Jasalma intellekt — 1-tema',
    description_kk: 'Jasalma intellektiń tiykarları hám qollanılıwı haqqında prezintaciya.',
    type: 'presentation',
    storagePath: '',
    downloadUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf',
    thumbnailUrl: 'https://via.placeholder.com/400x250/00B8C8/ffffff?text=1-tema',
    uploadedAt: admin.firestore.Timestamp.now(),
    uploader: 'Mirzabaeva M.B.',
  },
  {
    id: uuidv4(),
    title_kk: 'Jasalma intellekt — 2-tema',
    description_kk: 'Machine Learning tiykarlari haqqında.',
    type: 'presentation',
    storagePath: '',
    downloadUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf',
    thumbnailUrl: 'https://via.placeholder.com/400x250/7C3AED/ffffff?text=2-tema',
    uploadedAt: admin.firestore.Timestamp.now(),
    uploader: 'Mirzabaeva M.B.',
  },
  {
    id: uuidv4(),
    title_kk: 'AI Trendleri 2024 — Video',
    description_kk: 'Zamanagóy AI trendleri haqqında video dáris.',
    type: 'video',
    storagePath: '',
    downloadUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://via.placeholder.com/400x250/0099AA/ffffff?text=Video',
    uploadedAt: admin.firestore.Timestamp.now(),
    uploader: 'Mirzabaeva M.B.',
  },
  {
    id: uuidv4(),
    title_kk: 'AI Bilim tekseriw testi',
    description_kk: 'Jasalma intellekt haqqında bilimdi tekseriw testi.',
    type: 'test',
    storagePath: '',
    downloadUrl: '',
    thumbnailUrl: 'https://via.placeholder.com/400x250/EA580C/ffffff?text=Test',
    uploadedAt: admin.firestore.Timestamp.now(),
    uploader: 'Mirzabaeva M.B.',
  },
]

async function seed() {
  console.log('🌱 Seeding Firestore with demo materials...')
  for (const material of demoMaterials) {
    const docRef = db.collection('materials').doc(material.id)
    await docRef.set(material)
    console.log(`  ✅ Created: ${material.title_kk}`)
  }
  console.log(`\n✨ Done! ${demoMaterials.length} materials created.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
