import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Nunito, sans-serif',
            borderRadius: '10px',
          },
          success: { style: { border: '1px solid #00B8C8' } },
          error: { style: { border: '1px solid #ef4444' } },
        }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
