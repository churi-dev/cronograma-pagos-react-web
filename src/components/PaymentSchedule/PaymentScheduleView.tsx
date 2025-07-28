import type React from "react";
import { usePaymentScheduleStore } from "../../store/paymentScheduleStore";
import { Box, Button, Container, Typography } from "@mui/material";
import { CuotaSlider } from "./CuotasSlider";
import { CuotasTable } from "./CuotasTable";
import { AddBox } from "@mui/icons-material";

export const PaymentScheduleView: React.FC = () => {
    const { cuotas, agregarCuota } = usePaymentScheduleStore();

    if (cuotas.length === 0) {
        return <Typography variant="body1">No se han generado cuotas</Typography>
    }

    return (
        <Box
        sx={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)'
        }}
        >
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography 
                    variant="h4" 
                    fontWeight={700} 
                    >
                        Cronograma Interactivo
                    </Typography>
                    
                    <Button
                    disabled={cuotas.length >= 8}
                    variant="outlined"
                    onClick={agregarCuota}
                    startIcon={<AddBox /> }
                    sx={{
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 500
                    }}
                    >
                        Agregar cuota
                    </Button>
                </Box>
                <CuotaSlider onFechaActualizada={() => {}} />
                <CuotasTable />
            </Container>
        </Box>
    )
}