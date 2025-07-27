import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { paymentSchema } from "../schemas/paymentSchema"
import type { PaymentFormValues } from "../types/PaymentFormValues";

export const usePaymentForm = () => {
    const today = new Date();
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    return useForm<PaymentFormValues>({
        resolver: yupResolver(paymentSchema),
        defaultValues: {
            montoReferencial: 0,
            numeroCuotas: 1,
            fechaInicio: formatDate(today),
            fechaFin: formatDate(today),
        },
    });
};