import type { PropsWithChildren } from 'react'

export default function Secao({ children, titulo }: PropsWithChildren<{ titulo: string }>) {
  return (
    <section className="space-y-4 mt-8 first:mt-0">
      <h2 className="text-xl font-semibold">{titulo}</h2>
      {children}
    </section>
  )
}
