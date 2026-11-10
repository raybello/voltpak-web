import Logo from '../../../components/admin/Logo'
import Icon from '../../../components/admin/Icon'
import { importMap as generatedImportMap } from './importMap'

export const importMap = {
  ...generatedImportMap,
  '@/components/admin/Logo#default': Logo,
  '@/components/admin/Icon#default': Icon,
}
