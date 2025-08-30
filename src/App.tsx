import { useState } from 'react'
import FormDadosPessoais from './components/FormDadosPessoais'
import FormHabilidades from './components/FormHabilidades'
import FormExperiencias from './components/FormExperiencias'
import PreviewCurriculo from './components/PreviewCurriculo'
import type { DadosCurriculo } from './types/curriculo'

export default function App() {
  const [dadosCurriculo, setDadosCurriculo] = useState<DadosCurriculo>({
    pessoais: { nome: '', email: '', telefone: '', linkedin: '', resumo: '', fotoUrl: '' },
    habilidades: [],
    experiencias: [],
  })

  const atualizarPessoais = (parte: Partial<DadosCurriculo['pessoais']>) =>
    setDadosCurriculo(prev => ({ ...prev, pessoais: { ...prev.pessoais, ...parte } }))

  const atualizarHabilidades = (lista: DadosCurriculo['habilidades']) =>
    setDadosCurriculo(prev => ({ ...prev, habilidades: lista }))

  const atualizarExperiencias = (lista: DadosCurriculo['experiencias']) =>
    setDadosCurriculo(prev => ({ ...prev, experiencias: lista }))

  return (
    <div className="h-screen grid grid-cols-2 overflow-hidden">
      <div className="overflow-y-auto p-6">
        <FormDadosPessoais dados={dadosCurriculo.pessoais} onChange={atualizarPessoais} />
        <FormHabilidades habilidades={dadosCurriculo.habilidades} onChange={atualizarHabilidades} />
        <FormExperiencias experiencias={dadosCurriculo.experiencias} onChange={atualizarExperiencias} />
      </div>
      <div className="overflow-y-auto p-6 bg-gray-50">
        <PreviewCurriculo dados={dadosCurriculo} />
      </div>
    </div>
  )
}