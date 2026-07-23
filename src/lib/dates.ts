/** Verdadeiro se a data já passou (comparando só o dia, ignora hora). */
export function isPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/** Formato curto, ex: "15 ago" — usado em cards e badges. */
const SHORT_MONTHS = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
  'jul', 'ago', 'set', 'out', 'nov', 'dez',
];
export function formatDateShort(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  return `${day} ${SHORT_MONTHS[date.getMonth()]}`;
}

/** Formato longo, ex: "15 de agosto de 2026" — usado na página de detalhe. */
export function formatDateLong(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
