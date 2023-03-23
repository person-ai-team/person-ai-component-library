import './globals.css'
import "@aws-amplify/ui-react/styles.css";


export const metadata = {
  title: 'PersonAI | Home',
  description: 'PersonAI is a platform for building and deploying AI models for personalization and recommendation.',
}

function RootLayout({
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

export default RootLayout
