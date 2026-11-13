import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/customImportMap'
import { serverFunction } from './admin/serverAction'
import configPromise from '@payload-config'
import '@payloadcms/next/css'

type Args = {
  children: React.ReactNode
}

export default function Layout({ children }: Args) {
  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
