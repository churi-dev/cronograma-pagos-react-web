import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { addDays, differenceInDays, format, parseISO } from "date-fns";

export interface Cuota {
    id: string;
    fecha: string;
    monto: number;
}

interface PaymentScheduleState {
    cuotas: Cuota[];
    startDate: string;
    endDate: string;
    montoTotal: number;
    setCuotas: (cuotas: Cuota[], start: string, end: string, total: number) => void;
    updateDateCuota: (id: string, newDate: string) => void;
    eliminarCuota: (id: string) => void;
    agregarCuota: () => void;
    updateMontoCuota: (id: string, newMonto: number) => void;
}

export const usePaymentScheduleStore = create<PaymentScheduleState>((set, get) => ({
    cuotas: [],
    startDate: '',
    endDate: '',
    montoTotal: 0,
    
    setCuotas: (cuotas, start, end, total) => 
        set({ cuotas, startDate: start, endDate: end, montoTotal: total }),

    updateDateCuota: (id, newDate) => 
        set((state) => ({
            cuotas: state.cuotas.map((cuota) =>
            cuota.id === id ? { ...cuota, fecha: newDate} : cuota
        ),
    })),

    eliminarCuota: (id) => {
        const { cuotas, montoTotal } = get(); 
        const nuevasCuotas = cuotas.filter((cuota) => cuota.id !== id);
        const montoEquilibrado = montoTotal / nuevasCuotas.length;

        set({
            cuotas: nuevasCuotas.map((cuota) => ({
                ...cuota,
                monto: parseFloat(montoEquilibrado.toFixed(2))
            }))
        });
    },

    agregarCuota: () => {
        set((state) => {
            const { cuotas, montoTotal, startDate, endDate } = state;
            const nuevaCantidad = cuotas.length + 1;

            const nuevoMonto = parseFloat((montoTotal / nuevaCantidad).toFixed(2));

            const nuevoCuotas = cuotas.map((cuota) => ({
                ...cuota,
                monto: nuevoMonto,
            }));

            const fechaNueva = format(
                addDays(parseISO(startDate), Math.floor((differenceInDays(parseISO(endDate), parseISO(startDate))) * (cuotas.length / nuevaCantidad))),
                'yyyy-MM-dd'
            );

            nuevoCuotas.push({
                id: uuidv4(),
                fecha: fechaNueva,
                monto: nuevoMonto,
            });

            return {
                cuotas: nuevoCuotas,
            };
        });
    },

    updateMontoCuota: (id, newMonto) => 
        set((state) => ({
            cuotas: state.cuotas.map((cuota) =>
            cuota.id === id ? { ...cuota, monto: newMonto } : cuota )
        }))
    
}))