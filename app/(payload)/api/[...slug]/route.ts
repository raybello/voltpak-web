import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'
import configPromise from '@payload-config'

export const GET = (req: Request) => REST_GET(req, configPromise)
export const POST = (req: Request) => REST_POST(req, configPromise)
export const DELETE = (req: Request) => REST_DELETE(req, configPromise)
export const PATCH = (req: Request) => REST_PATCH(req, configPromise)
export const PUT = (req: Request) => REST_PUT(req, configPromise)
export const OPTIONS = (req: Request) => REST_OPTIONS(req, configPromise)
