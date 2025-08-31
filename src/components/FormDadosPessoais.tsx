import type { ChangeEvent } from 'react'
import Secao from './Secao'
import type { DadosCurriculo } from '../types/curriculo'

export default function FormDadosPessoais({
  dados,
  onChange,
}: {
  dados: DadosCurriculo['pessoais']
  onChange: (p: Partial<DadosCurriculo['pessoais']>) => void
}) {
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

      <div className="float-group">
        <input
          type="text"
          placeholder=" "
          value={dados.nome}
          onChange={e => onChange({ nome: e.target.value })}
          id="nome"
          className={`w-full border px-3 py-2 rounded ${invalido.nome ? 'border-red-500' : 'border-gray-300'}`}
        />
        <label htmlFor="nome">Nome completo</label>
      </div>

      <div className="float-group">
        <input
          type="email"
          placeholder=" "
          value={dados.email}
          onChange={e => onChange({ email: e.target.value })}
          id="email"
          className={`w-full border px-3 py-2 rounded ${invalido.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        <label htmlFor="email">E‑mail</label>
      </div>

      <div className="float-group">
        <textarea
          placeholder=" "
          value={dados.resumo}
          onChange={e => onChange({ resumo: e.target.value })}
          id="resumo"
          className="w-full border border-gray-300 px-3 py-2 rounded h-28"
          maxLength={500}
        />
        <label htmlFor="resumo">Resumo profissional</label>
        <div className="textarea-counter">{dados.resumo?.length ?? 0}/600</div>
      </div>

      {}
    </Secao>
  )
}