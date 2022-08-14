function Adjuste (target: string): string {
  if (target.length < 2) { target = '0' + target }

  return (target)
}

export default function log (message: string): void {
  const date = new Date()
  const day = Adjuste(date.getDate().toString())
  const month = Adjuste(date.getMonth().toString())
  const fullYear = Adjuste(date.getFullYear().toString())
  const hours = Adjuste(date.getHours().toString())
  const minutes = Adjuste(date.getMinutes().toString())
  const seconds = Adjuste(date.getSeconds().toString())

  const dateString = `${month}/${day}/${fullYear} - ${hours}:${minutes}:${seconds}`

  console.log(`[${dateString}] -- ${message}`)
}
