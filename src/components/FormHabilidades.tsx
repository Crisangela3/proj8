import { useState, useRef } from 'react'
import type { DadosCurriculo } from '../types/curriculo'

export default function FormHabilidades({
  habilidades,
  onChange,
}: {
  habilidades: DadosCurriculo['habilidades']
  onChange: (h: DadosCurriculo['habilidades']) => void
}) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const add = () => {
    if (!text.trim()) return
    onChange([...habilidades, text.trim()])
    setText('')
    inputRef.current?.focus()
  }

  const limpar = () => {
    setText('')
    onChange([]) 
    inputRef.current?.focus()
  }

  return (
    <section className="secao">
      <h2>Habilidades</h2>

      <div className="float-group input-with-icon">
        <input
          ref={inputRef}
          type="text"
          placeholder=" "
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') add() }}
          id="nova-habilidade"
        />
        <label htmlFor="nova-habilidade">Adicionar habilidade</label>
      </div>

      <div style={{ marginTop: 8 }} className="chips">
        {habilidades.map((h, i) => (
          <span key={typeof h === 'string' ? `${h}-${i}` : h.id ?? `${i}`} className="chip">
            {typeof h === 'string' ? h : h.nome}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <button className="btn" type="button" onClick={add}>Adicionar</button>
        <button className="btn ghost" type="button" onClick={limpar}>Limpar</button>
      </div>
    </section>
  )
}
