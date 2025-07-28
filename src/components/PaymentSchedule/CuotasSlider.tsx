import type React from "react";
import { usePaymentScheduleStore } from "../../store/paymentScheduleStore";
import { useEffect, useState } from "react";
import { diasAFecha, fechaADias } from "../../utils/fecha";
import { Slider } from "@mui/material";

interface CuotasSliderProps {
    onFechaActualizada: () => void;
}

export const CuotaSlider: React.FC<CuotasSliderProps> = ({ onFechaActualizada }) => {
    const { cuotas, updateDateCuota, startDate, endDate } = usePaymentScheduleStore();

    const totalDays = fechaADias(endDate,startDate);
    
    const initialDays = cuotas.map((cuota) => fechaADias(cuota.fecha, startDate));
    
    const [tempDays, setTempDays] = useState(initialDays);
    
    useEffect(() => {
        setTempDays(initialDays);
    }, [cuotas, startDate]);
        
    const handleChange = (_: any, newValue: number | number[]) => {
        const newDays = [...(newValue as number[])];
        const adjustedDays = [...tempDays];
    
        for (let index = 0; index < newDays.length; index++) {
            const min = index === 0 ? 0 : adjustedDays[index - 1] + 1;
            const max = index === newDays.length - 1 ? totalDays : adjustedDays[index + 1] - 1;
    
            if (newDays[index] >= min && newDays[index] <= max) {
                adjustedDays[index] = newDays[index];
            }
        }
    
        setTempDays(adjustedDays);
    };

    const handleCommit = () => {
        tempDays.forEach((day, i) => {
            const newDate = diasAFecha(day, startDate);
            updateDateCuota(cuotas[i].id, newDate);   
        });
        onFechaActualizada();
    }

    const marks = tempDays.map((day) => ({
        value: day,
        label: diasAFecha(day, startDate),
    }));


    return(
        <Slider
            value={tempDays}
            onChange={handleChange}
            onChangeCommitted={handleCommit}
            step={1}
            min={0}
            max={totalDays}
            marks={marks}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => diasAFecha(value, startDate)} 
            disableSwap
        />
    )
}