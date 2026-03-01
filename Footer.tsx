import Link from 'next/link'
import kk from '@/locales/kk'

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-[#00B8C8] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{kk.footer.rights}</p>
        <div className="flex gap-4 text-sm">
          <Link href="/profile" className="text-[#00B8C8] hover:underline">
            {kk.nav.about}
          </Link>
          <Link href="/admin" className="text-gray-400 hover:text-[#00B8C8] transition-colors">
            {kk.nav.admin}
          </Link>
        </div>
      </div>
    </footer>
  )
}
