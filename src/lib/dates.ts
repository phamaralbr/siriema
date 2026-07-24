/**
 * IMPORTANTE — fuso horário: datas do tipo "2026-11-22" (sem hora) são
 * interpretadas pelo JavaScript como meia-noite em UTC, não no fuso local.
 * Se usássemos os métodos locais (getDate/getMonth/getFullYear) num
 * servidor/navegador em fuso atrás de UTC (como o Brasil, UTC-3), a data
 * "voltava" um dia (22 virava 21). Por isso TODA leitura abaixo usa os
 * métodos UTC (getUTCDate/getUTCMonth/getUTCFullYear) — nunca troque por
 * getDate()/getMonth()/getFullYear() sem os "UTC".
 */

/** Verdadeiro se a data já passou (comparando só o dia, em UTC). */
export function isPast(date: Date): boolean {
  const todayUTC = new Date();
  todayUTC.setUTCHours(0, 0, 0, 0);
  return date.getTime() < todayUTC.getTime();
}

const SHORT_MONTHS = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
  'jul', 'ago', 'set', 'out', 'nov', 'dez',
];
const LONG_MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/** Formato curto, ex: "15 ago" — usado em cards e badges. */
export function formatDateShort(date: Date): string {
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${day} ${SHORT_MONTHS[date.getUTCMonth()]}`;
}

/** Formato longo, ex: "15 de agosto de 2026" — usado na página de detalhe. */
export function formatDateLong(date: Date): string {
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${day} de ${LONG_MONTHS[date.getUTCMonth()]} de ${date.getUTCFullYear()}`;
}

/**
 * Formato curto de intervalo pra cards, ex: "11–14 set" (mesmo mês) ou
 * "28 ago–02 set" (meses diferentes). Se `end` não vier ou for igual a
 * `start`, cai no formato de data única ("15 ago").
 */
export function formatDateRangeShort(start: Date, end?: Date): string {
  if (!end || end.getTime() === start.getTime()) {
    return formatDateShort(start);
  }
  const startDay = start.getUTCDate().toString().padStart(2, '0');
  const endDay = end.getUTCDate().toString().padStart(2, '0');
  if (start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear()) {
    return `${startDay}–${endDay} ${SHORT_MONTHS[start.getUTCMonth()]}`;
  }
  return `${startDay} ${SHORT_MONTHS[start.getUTCMonth()]}–${endDay} ${SHORT_MONTHS[end.getUTCMonth()]}`;
}

/**
 * Formato longo de intervalo, ex: "11 a 14 de setembro de 2026" (mesmo mês),
 * "28 de agosto a 2 de setembro de 2026" (meses diferentes) ou
 * "30 de dezembro de 2026 a 2 de janeiro de 2027" (anos diferentes).
 * Se `end` não vier ou for igual a `start`, cai no formato de data única.
 */
export function formatDateRangeLong(start: Date, end?: Date): string {
  if (!end || end.getTime() === start.getTime()) {
    return formatDateLong(start);
  }

  const startDay = start.getUTCDate();
  const endDay = end.getUTCDate();

  if (start.getUTCFullYear() !== end.getUTCFullYear()) {
    return `${startDay} de ${LONG_MONTHS[start.getUTCMonth()]} de ${start.getUTCFullYear()} a ${endDay} de ${LONG_MONTHS[end.getUTCMonth()]} de ${end.getUTCFullYear()}`;
  }
  if (start.getUTCMonth() !== end.getUTCMonth()) {
    return `${startDay} de ${LONG_MONTHS[start.getUTCMonth()]} a ${endDay} de ${LONG_MONTHS[end.getUTCMonth()]} de ${end.getUTCFullYear()}`;
  }
  return `${startDay} a ${endDay} de ${LONG_MONTHS[start.getUTCMonth()]} de ${start.getUTCFullYear()}`;
}
