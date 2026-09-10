export const EVENT_IMAGE_FALLBACK = '/campus/madaha-nursing-college-9.webp'

export interface NewsEventRow {
  id: string
  title: string
  description: string | null
  category: string | null
  event_date: string
  location: string | null
  image_url: string | null
  published: boolean
  featured: boolean
  created_at: string
  updated_at: string | null
}