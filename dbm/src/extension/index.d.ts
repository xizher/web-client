interface Date {
  format (mark: string): string
}
interface Array {
  remove (index: number): void
  insert (index: number, item: any): void
  clear (): void
  reset (...arr) : void
}