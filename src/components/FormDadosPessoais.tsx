
import type { ChangeEvent } from 'react'
import Secao from './Secao'
import type { DadosPessoais } from '../types/curriculo'

interface Props {
  dados: DadosPessoais
  onChange: (parte: Partial<DadosPessoais>) => void
}

export default function FormDadosPessoais({ dados, onChange }: Props) {
  const onInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ [e.target.name]: e.target.value })

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const url = URL.createObjectURL(arquivo)
    onChange({ fotoUrl: url })
  }

  const invalido = {
    nome: !dados.nome.trim(),
    email: !/^\S+@\S+\.\S+$/.test(dados.email || ''),
    telefone: !dados.telefone.trim(),
    linkedin: !dados.linkedin.trim(),
  }

  return (
    <Secao titulo="Dados Pessoais">
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Foto de perfil</label>
          <input type="file" accept="image/*" onChange={onUpload} className="text-sm" />
        </div>
        {dados.fotoUrl ? (
          <img src={dados.fotoUrl} alt="Foto de perfil" className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
            Sem foto
          </div>
        )}
      </div>

      <input
        name="nome"
        value={dados.nome}
        onChange={onInput}
        placeholder="Nome completo"
        className={`w-full border px-3 py-2 rounded ${invalido.nome ? 'border-red-500' : 'border-gray-300'}`}
      />
      <input
        name="email"
        type="email"
        value={dados.email}
        onChange={onInput}
        placeholder="E-mail"
        className={`w-full border px-3 py-2 rounded ${invalido.email ? 'border-red-500' : 'border-gray-300'}`}
      />
      <input
        name="telefone"
        value={dados.telefone}
        onChange={onInput}
        placeholder="Telefone"
        className={`w-full border px-3 py-2 rounded ${invalido.telefone ? 'border-red-500' : 'border-gray-300'}`}
      />
      <input
        name="linkedin"
        value={dados.linkedin}
        onChange={onInput}
        placeholder="LinkedIn (URL)"
        className={`w-full border px-3 py-2 rounded ${invalido.linkedin ? 'border-red-500' : 'border-gray-300'}`}
      />
      <div>
        <textarea
          name="resumo"
          value={dados.resumo}
          onChange={onInput}
          placeholder="Resumo profissional"
          className="w-full border border-gray-300 px-3 py-2 rounded h-28"
          maxLength={500}
        />
        <p className="text-sm text-gray-500">{dados.resumo.length}/500 caracteres</p>
      </div>
    </Secao>
  )
}