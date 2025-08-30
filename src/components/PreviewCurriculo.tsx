import type { DadosCurriculo } from '../types/curriculo'

interface Props { dados: DadosCurriculo }

export default function PreviewCurriculo({ dados }: Props) {
  const { pessoais, habilidades, experiencias } = dados

  return (
    <div className="mx-auto max-w-3xl bg-white shadow-sm border border-gray-200 p-8">
      <header className="flex items-center gap-6 pb-6 border-b">
        {pessoais.fotoUrl ? (
          <img src={pessoais.fotoUrl} alt="Foto de perfil" className="w-24 h-24 rounded-full object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
            Foto
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{pessoais.nome || 'Seu Nome'}</h1>
          <p className="text-sm text-gray-600">
            {pessoais.email || 'seu@email'}
            {pessoais.telefone ? ` • ${pessoais.telefone}` : ''}
            {pessoais.linkedin ? ` • ${pessoais.linkedin}` : ''}
          </p>
        </div>
      </header>

      <section className="mt-6">
        <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-700">Perfil Profissional</h2>
        <p className={`mt-2 ${pessoais.resumo ? '' : 'text-gray-400 italic'}`}>
          {pessoais.resumo || 'Seu resumo aparecerá aqui...'}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-700">Habilidades</h2>
        {habilidades.length ? (
          <ul className="grid grid-cols-2 mt-2 list-disc ml-5 gap-y-1">
            {habilidades.map(h => <li key={h.id}>{h.nome} — {h.nivel}</li>)}
          </ul>
        ) : (
          <p className="mt-2 text-gray-400 italic">Nenhuma habilidade adicionada.</p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-700">Experiência Profissional</h2>
        {experiencias.length ? (
          <div className="mt-2 space-y-4">
            {experiencias.map(e => (
              <div key={e.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold">{e.cargo} — {e.empresa}</h3>
                  <span className="text-sm text-gray-600">{e.periodo}{e.atual ? ' (Atual)' : ''}</span>
                </div>
                <p className="text-sm">{e.descricao}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-gray-400 italic">Nenhuma experiência adicionada.</p>
        )}
      </section>
    </div>
  )
}