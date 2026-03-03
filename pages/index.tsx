import type { NextPage } from 'next'
import Link from 'next/link'
import kk from '@/locales/kk'

const HomePage: NextPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{kk.home.heroTitle}</h1>
      <p className="text-gray-600 text-lg mb-8">{kk.home.heroSubtitle}</p>
      <Link
        href="/materials"
        className="inline-block bg-[#00B8C8] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#0099AA] transition-colors"
      >
        {kk.home.cta}
      </Link>
    </div>
  )
}

export default HomePage
