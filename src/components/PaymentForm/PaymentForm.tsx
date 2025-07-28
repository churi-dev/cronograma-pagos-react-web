import { Box, Button, Card, CardContent, CardHeader, Grid, TextField, Typography} from "@mui/material";
import type React from "react";
import { usePaymentForm } from "../../hooks/usePaymentForm";
import { Controller } from "react-hook-form";
import { generarCuotasPorQuincena } from "../../utils/generateInstallments";
import { usePaymentScheduleStore } from "../../store/paymentScheduleStore";
import { Receipt as ReceiptIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const PaymentForm:React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = usePaymentForm();

    const { setCuotas } = usePaymentScheduleStore();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    const onSubmit = (data: any) => {
        setLoading(true);

        const cuotas = generarCuotasPorQuincena(
            data.montoReferencial,
            data.numeroCuotas,
            data.fechaInicio,
            data.fechaFin
        )
        setCuotas(cuotas, data.fechaInicio, data.fechaFin, data.montoReferencial);

        setTimeout(() => {
            navigate("/cronograma");
        }, 500);
    }

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        p={2}
        >
            <Card
                sx={{
                maxWidth: 800,
                width: '100%',
                borderRadius: 3,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
            >
            <CardHeader
                title={
                <Box display="flex" alignContent="center" gap={1}>
                    <ReceiptIcon color="primary" />
                    <Typography>
                        Cronograma de pagos
                    </Typography>
                </Box>
            } 
            subheader="Ingresa valores para generar tu conograma de pagos"
            sx={{ pb: 1}}
            />
            <CardContent >
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
                    <Grid size={{ xs: 6 }}>
                        <Button 
                        type="submit" 
                        variant="contained"
                        size="large" 
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            textTransform: 'none'
                        }}
                        >
                            {loading ? "Generando..." : "Generar cronograma"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
        </Card>
    </Box>
    )
}