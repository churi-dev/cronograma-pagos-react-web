import * as yup from 'yup';

export const paymentSchema = yup.object({
    montoReferencial: yup
        .number()
        .typeError("Debe ser un número")
        .required('El monto referencial es requerido')
        .positive('El monto referencial debe ser mayor que cero'),
    numeroCuotas: yup
        .number()
        .typeError("Debe ser un número")
        .required('El número de cuotas es requerido')
        .integer('El número de cuotas debe ser un entero')
        .positive('El número de cuotas debe ser mayor que cero')
        .max(8, "Las cuotas deben estar entre 1 y 8"),
    fechaInicio: yup
        .string()
        .required('La fecha de inicio es requerida')
        .test('is-date', 'La fecha de inicio debe ser una fecha válida', value => !!value && !isNaN(Date.parse(value)))
        .test('is-today-or-future', 'La fecha de inicio no puede ser pasada', value => {
            if (!value) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selected = new Date(value);
            selected.setHours(0, 0, 0, 0);
            return selected >= today && selected.getFullYear() >= 2025;
        })
        .test('year-range', 'El año debe estar entre 2025 y 2030', value => {
            if (!value) return false;
            const year = new Date(value).getFullYear();
            return year >= 2025 && year <= 2030;
        }),
    fechaFin: yup
        .string()
        .required('La fecha de fin es requerida')
        .test('is-date', 'La fecha de fin debe ser una fecha válida', value => !!value && !isNaN(Date.parse(value)))
        .test('is-after', 'La fecha de fin debe ser después de la fecha de inicio', function(value) {
            const { fechaInicio } = this.parent;
            return !!value && !!fechaInicio && new Date(value) > new Date(fechaInicio);
        })
        .test('year-range', 'El año debe estar entre 2025 y 2030', value => {
            if (!value) return false;
            const year = new Date(value).getFullYear();
            return year >= 2025 && year <= 2030;
        }),
})