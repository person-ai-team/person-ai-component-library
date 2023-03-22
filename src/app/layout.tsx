import './globals.css'


export const metadata = {
  title: 'PersonAI | Home',
  description: 'PersonAI is a platform for building and deploying AI models for personalization and recommendation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className='z-10'>

      {children}
      </body>
    </html>
  )
}
