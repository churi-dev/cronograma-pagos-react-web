import { addDays, differenceInDays, parseISO } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

export function generarCuotasPorQuincena(
    montoTotal: number,
    numeroCuotas: number,
    fechaInicio: string,
    fechaFin: string
) {
    const startDate = parseISO(fechaInicio);
    const endDate = parseISO(fechaFin);


    const totalDays = differenceInDays(endDate, startDate);
    if (totalDays < 0  || numeroCuotas <= 0) return [];


    const daysCuota = Math.floor(totalDays / (numeroCuotas - 1 || 1));

    const montoCuota = Number((montoTotal / numeroCuotas).toFixed(2));

    const cuotas = [];

    for (let index = 0; index < numeroCuotas; index++) {
        const fecha = addDays(startDate, index * daysCuota);
        cuotas.push({
            id: uuidv4(),
            fecha: fecha.toISOString().split("T")[0],
            monto: montoCuota,
        });
    }

    return cuotas;
}