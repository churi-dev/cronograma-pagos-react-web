import { Button, Grid, TextField} from "@mui/material";
import type React from "react";
import { usePaymentForm } from "../hooks/usePaymentForm";
import { Controller } from "react-hook-form";

export const PaymentForm:React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = usePaymentForm();

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid  container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <Controller
                    name="montoReferencial"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        label="Monto Referencial"
                        type="number"
                        fullWidth
                        error={!!errors.montoReferencial}
                        helperText={errors.montoReferencial?.message} 
                        />
                    )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                    name="numeroCuotas"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        label="Número de Cuotas"
                        type="number"
                        fullWidth
                        error={!!errors.numeroCuotas}
                        helperText={errors.numeroCuotas?.message} 
                        />
                    )} 
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                    name="fechaInicio"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        label="Fecha de Inicio"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.fechaInicio}
                        helperText={errors.fechaInicio?.message}
                        inputProps={{ min: new Date().toISOString().split("T")[0] }}
                        />
                    )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                    name="fechaFin"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        label="Fecha de Fin"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.fechaFin}
                        helperText={errors.fechaFin?.message} 
                        />
                    )}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Button type="submit" variant="contained" fullWidth>
                        Enviar
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}