
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import Secao from './Secao'
import type { Experiencia } from '../types/curriculo'

interface Props {
  experiencias: Experiencia[]
  onChange: (lista: Experiencia[]) => void
}

function id() {
  return Math.random().toString(36).slice(2, 10)
}

export default function FormExperiencias({ experiencias, onChange }: Props) {
  const inicial: Omit<Experiencia, 'id'> = {
    empresa: '',
    cargo: '',
    periodo: '',
    descricao: '',
    atual: false,
  }
  const [form, setForm] = useState(inicial)

  const onInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const adicionar = () => {
    if (!form.empresa.trim() || !form.cargo.trim()) return
    // Validação simples de período (opcional): "MMM AAAA – MMM AAAA" ou "atual"
    onChange([...experiencias, { ...form, id: id() }])
    setForm(inicial)
  }

  const remover = (eid: string) => onChange(experiencias.filter(e => e.id !== eid))

  return (
    <Secao titulo="Experiências">
      <input
        name="empresa"
        value={form.empresa}
        onChange={onInput}
        placeholder="Empresa"
        className={`w-full border px-3 py-2 rounded ${!form.empresa.trim() ? 'border-red-500' : 'border-gray-300'}`}
      />
      <input
        name="cargo"
        value={form.cargo}
        onChange={onInput}
        placeholder="Cargo"
        className={`w-full border px-3 py-2 rounded ${!form.cargo.trim() ? 'border-red-500' : 'border-gray-300'}`}
      />
      <input
        name="periodo"
        value={form.periodo}
        onChange={onInput}
        placeholder="Período (ex: Jan 2020 – Atual)"
        className="w-full border border-gray-300 px-3 py-2 rounded"
      />
      <textarea
        name="descricao"
        value={form.descricao}
        onChange={onInput}
        placeholder="Descrição das atividades"
        className="w-full border border-gray-300 px-3 py-2 rounded h-24"
      />
      <label className="inline-flex items-center">
        <input type="checkbox" name="atual" checked={form.atual} onChange={onInput} className="mr-2" />
        Trabalho atual
      </label>

      <button
        onClick={adicionar}
        disabled={!form.empresa.trim() || !form.cargo.trim()}
        className="bg-blue-600 disabled:opacity-40 text-white px-4 py-2 rounded"
      >
        Adicionar
      </button>

      <ul className="space-y-2">
        {experiencias.map(e => (
          <li key={e.id} className="flex justify-between items-center border border-gray-200 rounded px-3 py-2">
            <span>{e.cargo} @ {e.empresa}</span>
            <button onClick={() => remover(e.id)} className="text-red-600">remover</button>
          </li>
        ))}
        {experiencias.length === 0 && <li className="text-gray-400">Nenhuma experiência adicionada.</li>}
      </ul>
    </Secao>
  )
}