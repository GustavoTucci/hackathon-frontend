import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

export default function QuizEligibility({ onNavigate, onOpenAppointment }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100);

  const handleSelectOption = (optionIndex) => {
    setAnswers({
      ...answers,
      [question.id]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsFinished(false);
  };

  // Check eligibility results
  const ineligiblePoints = [];
  QUIZ_QUESTIONS.forEach((q) => {
    const selectedIdx = answers[q.id];
    if (selectedIdx !== undefined) {
      const selectedOption = q.options[selectedIdx];
      if (!selectedOption.isEligible) {
        ineligiblePoints.push({
          question: q.title,
          feedback: selectedOption.feedback
        });
      }
    }
  });

  const isEligible = ineligiblePoints.length === 0;
  const currentSelectedIdx = answers[question?.id];
  const selectedOptionObj = currentSelectedIdx !== undefined ? question?.options[currentSelectedIdx] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* 1. Wizard Header & ANVISA Certification */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              Protocolo Técnico ANVISA RDC 34/2014 & MS
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Autoavaliação Rápida de Aptidão para Doação
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Responda a 6 perguntas fundamentais de pré-triagem médica para verificar sua aptidão em menos de 1 minuto.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl self-start md:self-auto flex items-center gap-2 text-primary font-bold text-xs">
            <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
            Triagem 100% Anônima & Confidencial
          </div>
        </div>

        {/* Progress Bar */}
        {!isFinished && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                Pergunta {currentStep + 1} de {QUIZ_QUESTIONS.length}
              </span>
              <span className="font-bold text-primary">{progressPercent}% Concluído</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Wizard Body or Result */}
      {isFinished ? (
        <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200/80 shadow-sm space-y-8 animate-fadeIn">
          {isEligible ? (
            /* Eligible View */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20 animate-bounce">
                <span className="material-symbols-outlined text-[48px]">celebration</span>
              </div>

              <div className="max-w-xl mx-auto space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wide">
                  Diagnóstico: Totalmente Apto para Doar
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Parabéns! Você está pronto para salvar até 4 vidas hoje.
                </h2>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Com base nas suas respostas aos critérios da ANVISA e do Ministério da Saúde, você cumpre todos os requisitos para realizar a doação de sangue total com total segurança.
                </p>
              </div>

              {/* What to bring / Preparation Checklist */}
              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-left max-w-xl mx-auto space-y-3">
                <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-[20px]">checklist</span>
                  Orientações para o dia da doação:
                </h4>
                <ul className="space-y-2 text-xs text-emerald-900">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-700 shrink-0">check_circle</span>
                    <span>Leve um documento oficial com foto (RG, CNH ou Carteira de Trabalho).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-700 shrink-0">check_circle</span>
                    <span>Alimente-se normalmente evitando refeições excessivamente gordurosas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-700 shrink-0">check_circle</span>
                    <span>Mantenha-se bem hidratado (beba água antes de sair de casa).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-700 shrink-0">check_circle</span>
                    <span>Evite bebidas alcoólicas nas 12 horas antecedentes.</span>
                  </li>
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => onOpenAppointment()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                  Agendar Minha Doação Agora
                </button>
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                >
                  Refazer Autoavaliação
                </button>
              </div>
            </div>
          ) : (
            /* Ineligible View */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-[48px]">pending_actions</span>
              </div>

              <div className="max-w-xl mx-auto space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wide">
                  Aptidão Temporariamente Pendente
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  No momento você não pode doar, mas logo estará liberado!
                </h2>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  As normas técnicas de hemoterapia existem tanto para resguardar a sua saúde quanto a do paciente que receberá a transfusão.
                </p>
              </div>

              {/* Ineligible specifics */}
              <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-left max-w-xl mx-auto space-y-3">
                <h4 className="font-bold text-sm text-amber-950 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-800 text-[20px]">info</span>
                  Motivos técnicos identificados:
                </h4>
                <div className="space-y-3">
                  {ineligiblePoints.map((pt, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-amber-200/80 text-xs space-y-1">
                      <strong className="text-slate-800 block">{pt.question}</strong>
                      <p className="text-amber-900">{pt.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-xl mx-auto">
                <strong className="block text-slate-800 mb-1">Você ainda pode ajudar muito!</strong>
                Compartilhe o HemoVida com seus amigos e familiares para que outros voluntários com estoque crítico possam comparecer.
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
                >
                  Refazer Autoavaliação
                </button>
                <button
                  onClick={() => onNavigate('estoque')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
                >
                  Ver Estoques Regionais
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Stepper Question View */
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide">
              <span className="material-symbols-outlined text-[20px]">{question.icon}</span>
              <span>Critério {currentStep + 1} de {QUIZ_QUESTIONS.length}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              {question.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              {question.description}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {question.options.map((opt, idx) => {
              const isSelected = currentSelectedIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                    isSelected
                      ? 'border-primary bg-red-50/50 shadow-md ring-2 ring-primary/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs md:text-sm font-semibold block ${
                      isSelected ? 'text-primary' : 'text-slate-800'
                    }`}>
                      {opt.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Immediate Medical Feedback Pill */}
          {selectedOptionObj && (
            <div className={`p-4 rounded-xl border text-xs flex items-start gap-2.5 animate-fadeIn ${
              selectedOptionObj.isEligible
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}>
              <span className={`material-symbols-outlined text-[18px] shrink-0 ${
                selectedOptionObj.isEligible ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {selectedOptionObj.isEligible ? 'verified' : 'info'}
              </span>
              <p className="leading-relaxed">
                <strong>Parecer Clínico:</strong> {selectedOptionObj.feedback}
              </p>
            </div>
          )}

          {/* Wizard Action Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                currentStep === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Voltar
            </button>

            <button
              onClick={handleNext}
              disabled={currentSelectedIdx === undefined}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
                currentSelectedIdx === undefined
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-primary hover:bg-primary-dark text-white shadow-primary/20 active:scale-95'
              }`}
            >
              <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? 'Ver Resultado Final' : 'Próxima Pergunta'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
