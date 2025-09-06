import type { ChangeEvent } from 'react'
import Secao from './Secao'
import type { DadosCurriculo } from '../types/curriculo'

/*
  Componente: FormDadosPessoais
  - Recebe dados pessoais via props e notifica alterações através de onChange.
  - Cada bloco abaixo tem um comentário explicando sua responsabilidade.
*/
export default function FormDadosPessoais({
  dados,
  onChange,
}: {
  dados: DadosCurriculo['pessoais']
  onChange: (p: Partial<DadosCurriculo['pessoais']>) => void
}) {
  // onInput: handler genérico para inputs/textarea que propaga a alteração ao pai.
  const onInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ [e.target.name]: e.target.value })

  // onUpload: lê o arquivo selecionado, cria um object URL para preview e envia fotoUrl.
  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const url = URL.createObjectURL(arquivo)
    onChange({ fotoUrl: url })
  }

  // invalido: objeto com flags simples de validação (útil para mostrar bordas/vermelho).
  const invalido = {
    nome: !dados.nome.trim(),
    email: !/^\S+@\S+\.\S+$/.test(dados.email || ''),
    telefone: !dados.telefone.trim(),
    linkedin: !dados.linkedin.trim(),
  }

  return (
    // Secao: wrapper reutilizável que agrupa os campos de "Dados Pessoais"
    <Secao titulo="Dados Pessoais">
      {/* Foto de perfil: upload + preview */}
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Foto de perfil</label>
          <input type="file" accept="image/*" onChange={onUpload} className="text-sm" />
        </div>

        {/* Mostra a foto ou um placeholder se não houver foto */}
        {dados.fotoUrl ? (
          <img src={dados.fotoUrl} alt="Foto de perfil" className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
            Sem foto
          </div>
        )}
      </div>

      {/* Campo: Nome completo (floating label + validação visual) */}
      <div className="float-group">
        <input
          type="text"
          name="nome"
          placeholder=" "
          value={dados.nome}
          onChange={e => onChange({ nome: e.target.value })}
          id="nome"
          className={`w-full border px-3 py-2 rounded ${invalido.nome ? 'border-red-500' : 'border-gray-300'}`}
        />
        <label htmlFor="nome">Nome completo</label>
      </div>

      {/* Campo: E-mail (validação simples via invalido.email) */}
      <div className="float-group">
        <input
          type="email"
          name="email"
          placeholder=" "
          value={dados.email}
          onChange={e => onChange({ email: e.target.value })}
          id="email"
          className={`w-full border px-3 py-2 rounded ${invalido.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        <label htmlFor="email">E‑mail</label>
      </div>

      {/* Campo: Resumo profissional (textarea com contador de caracteres) */}
      <div className="float-group">
        <textarea
          name="resumo"
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

      {/* Espaço reservado para outros campos (telefone, linkedin, etc.) */}
      {}
    </Secao>
  )
}