export const metadata = {
  title: 'Shop India',
    icons: {
    icon: "/2.png", // ✅ this sets your favicon
  },
  description: 'Generated by Next.js',
}

import '../globals.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <ToastContainer
          autoClose={1200}
        />
        {children}
      </body>
    </html>
  )
}
