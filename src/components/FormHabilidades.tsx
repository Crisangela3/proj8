
import { useState } from 'react'
import Secao from './Secao'
import type { Habilidade } from '../types/curriculo'

interface Props {
  habilidades: Habilidade[]
  onChange: (lista: Habilidade[]) => void
}

function id() {
  return Math.random().toString(36).slice(2, 10)
}

export default function FormHabilidades({ habilidades, onChange }: Props) {
  const [nome, setNome] = useState('')
  const [nivel, setNivel] = useState<Habilidade['nivel']>('Básico')

  const adicionar = () => {
    if (!nome.trim()) return
    onChange([...habilidades, { id: id(), nome: nome.trim(), nivel }])
    setNome('')
  }

  const remover = (hid: string) => onChange(habilidades.filter(h => h.id !== hid))

  return (
    <Secao titulo="Habilidades">
      <div className="flex gap-2">
        <input
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Habilidade"
          className="flex-1 border border-gray-300 px-3 py-2 rounded"
        />
        <select
          value={nivel}
          onChange={e => setNivel(e.target.value as Habilidade['nivel'])}
          className="border border-gray-300 px-3 py-2 rounded"
        >
          <option>Básico</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <button
          onClick={adicionar}
          disabled={!nome.trim()}
          className="bg-blue-600 disabled:opacity-40 text-white px-4 rounded"
        >
          +
        </button>
      </div>

      <ul className="space-y-2">
        {habilidades.map(h => (
          <li key={h.id} className="flex justify-between items-center border border-gray-200 rounded px-3 py-2">
            <span>{h.nome} ({h.nivel})</span>
            <button onClick={() => remover(h.id)} className="text-red-600">remover</button>
          </li>
        ))}
        {habilidades.length === 0 && <li className="text-gray-400">Nenhuma habilidade adicionada.</li>}
      </ul>
    </Secao>
  )
}
