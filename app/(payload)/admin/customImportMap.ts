import Logo from '../../../components/admin/Logo'
import Icon from '../../../components/admin/Icon'
import DashboardStats from '../../../components/admin/DashboardStats'
import { CollectionCards } from '@payloadcms/next/rsc'
import { VercelBlobClientUploadHandler } from '@payloadcms/storage-vercel-blob/client'

export const importMap = {
  '@/components/admin/Logo#default': Logo,
  '@/components/admin/Icon#default': Icon,
  '@/components/admin/DashboardStats#default': DashboardStats,
  '@payloadcms/next/rsc#CollectionCards': CollectionCards,
  '@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler': VercelBlobClientUploadHandler,
}
