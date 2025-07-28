import { addDays, differenceInDays, format, parseISO } from "date-fns";

export const fechaADias = (fecha: string, inicio: string) =>
    differenceInDays(parseISO(fecha), parseISO(inicio));

export const diasAFecha = (dias: number, inicio: string) =>
    format(addDays(parseISO(inicio), dias), 'yyyy-MM-dd');

export const formatDate = (fechaStr: string) => {
    const date = new Date(fechaStr);
    const formated = date.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return formated.charAt(0).toUpperCase() + formated.slice(1);
}