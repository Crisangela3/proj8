import { useState, useRef, type ChangeEvent } from 'react'
import Secao from './Secao'
import type { DadosCurriculo } from '../types/curriculo'

export default function FormExperiencias({
  experiencias,
  onChange,
}: {
  experiencias: DadosCurriculo['experiencias']
  onChange: (e: DadosCurriculo['experiencias']) => void
}) {
  const inicial = {
    empresa: '',
    cargo: '',
    periodo: '',
    descricao: '',
    atual: false,
  }
  const [form, setForm] = useState(inicial)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const adicionar = () => {
    if (!form.empresa.trim() || !form.cargo.trim()) return
    const novo = { ...form, id: `${Date.now()}-${Math.floor(Math.random() * 10000)}` }
    onChange([...experiencias, novo])
    setForm(inicial)
    inputRef.current?.focus()
  }

  const remover = (eid: string) => onChange(experiencias.filter(e => e.id !== eid))

  const limparTudo = () => {
    setForm(inicial)
    onChange([]) 
    inputRef.current?.focus()
  }

  return (
    <Secao titulo="Experiências">
      <div className="float-group">
        <input
          id="empresa"
          name="empresa"
          value={form.empresa}
          onChange={onInput}
          placeholder=" "
          ref={inputRef}
        />
        <label htmlFor="empresa">Empresa</label>
      </div>

      <div className="float-group">
        <input
          id="cargo"
          name="cargo"
          value={form.cargo}
          onChange={onInput}
          placeholder=" "
        />
        <label htmlFor="cargo">Cargo</label>
      </div>

      <div className="float-group">
        <input
          id="periodo"
          name="periodo"
          value={form.periodo}
          onChange={onInput}
          placeholder=" "
        />
        <label htmlFor="periodo">Período (ex: Jan 2020 – Atual)</label>
      </div>

      <div className="float-group">
        <textarea
          id="descricao"
          name="descricao"
          value={form.descricao}
          onChange={onInput}
          placeholder=" "
        />
        <label htmlFor="descricao">Descrição das atividades</label>
        <div className="textarea-counter">{form.descricao.length}/600</div>
      </div>

      <label className="inline-flex items-center mt-2">
        <input
          type="checkbox"
          name="atual"
          checked={form.atual}
          onChange={onInput}
          className="mr-2"
        />
        Trabalho atual
      </label>

      <div style={{ marginTop: 12, marginBottom: 8, display: 'flex', gap: 8 }}>
        <button
          onClick={adicionar}
          disabled={!form.empresa.trim() || !form.cargo.trim()}
          className="btn"
          type="button"
        >
          Adicionar
        </button>

        <button
          onClick={limparTudo}
          className="btn ghost"
          type="button"
        >
          Limpar
        </button>
      </div>

      <ul className="space-y-2">
        {experiencias.map(e => (
          <li key={e.id} className="flex justify-between items-center card">
            <div>
              <div style={{ fontWeight: 700 }}>{e.cargo} — {e.empresa}</div>
              <div className="muted" style={{ marginTop: 4 }}>{e.periodo}{e.atual ? ' (Atual)' : ''}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => remover(e.id)} className="btn ghost" type="button">Remover</button>
            </div>
          </li>
        ))}
        {experiencias.length === 0 && <li className="muted">Nenhuma experiência adicionada.</li>}
      </ul>
    </Secao>
  )
}