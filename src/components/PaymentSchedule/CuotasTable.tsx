import type React from "react";
import { usePaymentScheduleStore } from "../../store/paymentScheduleStore";
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import { formatDate } from "../../utils/fecha";

export const CuotasTable: React.FC = () => {
    const { cuotas, eliminarCuota, updateMontoCuota } = usePaymentScheduleStore();

    return(
        <Paper elevation={3} sx={{ mt: 4}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {cuotas.map((cuota) => (
                            <TableRow key={cuota.id}>
                                <TableCell>{formatDate(cuota.fecha)}</TableCell>
                                <TableCell>
                                    <TextField
                                    type="number"
                                    value={cuota.monto}
                                    onChange={(e) =>
                                        updateMontoCuota(cuota.id, Number(e.target.value))
                                    }
                                    size="small"
                                    inputProps={{
                                        min: 0,
                                        step: 0.01,
                                    }} 
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => eliminarCuota(cuota.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
        </Paper>
    )
}