export function localDateStr(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// An event is upcoming while its date is today or in the future.
export function isUpcomingDate(eventDate: string): boolean {
  return eventDate >= localDateStr()
}
