import type { NextPage } from 'next'
import kk from '@/locales/kk'

const ProfilePage: NextPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl border border-[#B2EBF2] overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-8 md:p-12">
          {/* Left column: photo + name */}
          <div className="flex flex-col items-center md:items-start gap-4 md:w-56 shrink-0">
            {/* Profile photo placeholder */}
            <div
              className="w-48 h-56 bg-[#E0F7FA] rounded-2xl flex items-center justify-center border-2 border-[#B2EBF2]"
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="#00B8C8">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            <div className="text-center md:text-left">
              <p className="font-extrabold text-gray-800 text-sm leading-snug uppercase tracking-wide">
                {kk.profile.name}
              </p>
              <p className="text-[#00B8C8] font-semibold text-sm mt-2 leading-snug">
                {kk.profile.position}
              </p>
            </div>
          </div>

          {/* Right column: about text in blob shape */}
          <div className="flex-1 relative flex items-center">
            {/* Decorative background image hint */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden rounded-2xl">
              <div className="w-full h-full bg-gradient-to-br from-[#00B8C8] to-[#B2EBF2]" />
            </div>

            {/* Text blob */}
            <div
              className="relative w-full bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] p-8 md:p-10"
              style={{ borderRadius: '60% 40% 30% 70% / 40% 50% 50% 60%' }}
            >
              <p className="text-gray-700 font-semibold leading-relaxed text-base">
                {kk.profile.aboutText}
              </p>
            </div>
          </div>
        </div>

        {/* Site about section */}
        <div className="border-t border-[#E0F7FA] p-8 md:p-12 bg-[#F0FDFE]">
          <h2 className="text-xl font-extrabold text-gray-800 mb-4">{kk.profile.siteAbout}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[#B2EBF2] p-5">
              <div className="w-10 h-10 bg-[#00B8C8] rounded-full flex items-center justify-center text-white mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">Prezintaciyalar</h3>
              <p className="text-xs text-gray-500">Tayın PPT hám PDF prezintaciyalar</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#B2EBF2] p-5">
              <div className="w-10 h-10 bg-[#00B8C8] rounded-full flex items-center justify-center text-white mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">Video dársler</h3>
              <p className="text-xs text-gray-500">Beineli túsindirmeler hám ders jazbalari</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#B2EBF2] p-5">
              <div className="w-10 h-10 bg-[#00B8C8] rounded-full flex items-center justify-center text-white mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">Testler & Quizlar</h3>
              <p className="text-xs text-gray-500">Bilimlerin tekseriwge arnalǵan tapshırıqlar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
