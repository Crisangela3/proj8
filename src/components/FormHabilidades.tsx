import { useState, useRef } from 'react'
import type { DadosCurriculo } from '../types/curriculo'

/*
  FormHabilidades
  - Controle de input para adicionar uma habilidade.
  - Mostra chips com as habilidades adicionadas.
  - Botões: Adicionar e Limpar (limpa input e toda lista).
*/
export default function FormHabilidades({
  habilidades,
  onChange,
}: {
  habilidades: DadosCurriculo['habilidades']
  onChange: (h: DadosCurriculo['habilidades']) => void
}) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Adiciona a habilidade atual (string) à lista
  const add = () => {
    if (!text.trim()) return
    onChange([...habilidades, text.trim()])
    setText('')
    inputRef.current?.focus()
  }

  // Limpa o input e a lista completa
  const limpar = () => {
    setText('')
    onChange([]) // limpa também a lista de habilidades exibida
    inputRef.current?.focus()
  }

  return (
    <section className="secao">
      <h2>Habilidades</h2>

      {/* Input com floating label */}
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

      {/* Chips: exibe a lista atual de habilidades */}
      <div style={{ marginTop: 8 }} className="chips">
        {habilidades.map((h, i) => (
          <span key={typeof h === 'string' ? `${h}-${i}` : h.id ?? `${i}`} className="chip">
            {typeof h === 'string' ? h : h.nome}
          </span>
        ))}
      </div>

      {/* Ações: adicionar e limpar */}
      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <button className="btn" type="button" onClick={add}>Adicionar</button>
        <button className="btn ghost" type="button" onClick={limpar}>Limpar</button>
      </div>
    </section>
  )
}
