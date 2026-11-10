import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'
import configPromise from '@payload-config'

type Args = {
  children: React.ReactNode
}

export default function Layout({ children }: Args) {
  return RootLayout({ config: configPromise, children, importMap })
}
