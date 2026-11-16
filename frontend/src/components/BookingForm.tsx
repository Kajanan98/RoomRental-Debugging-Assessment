import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import type { BookingFormValues, Room } from '../types';

const schema = yup.object({
  roomId: yup.number().required('Room is required').min(1, 'Select a room'),
  tenantId: yup.number().required('Tenant is required').min(1, 'Enter a valid tenant ID'),
  checkIn: yup.string().required('Check-in date is required'),
  checkOut: yup.string().required('Check-out date is required')
});

type Props = { rooms: Room[]; onSubmit: (values: BookingFormValues) => Promise<void> };
export function BookingForm({ rooms, onSubmit }: Props) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<BookingFormValues>({
    resolver: yupResolver(schema), defaultValues: { roomId: 0, tenantId: 1, checkIn: '2026-12-01', checkOut: '2026-12-05' }
  });
  const [apiError, setApiError] = React.useState('');
  async function submit(values: BookingFormValues) {
    setApiError('');
    try { await onSubmit(values); } catch (e) { setApiError(e instanceof Error ? e.message : 'Unable to create booking'); }
  }
  return <Stack component="form" spacing={2} onSubmit={handleSubmit(submit)} sx={{ maxWidth: 480 }}>
    {apiError && <Alert severity="error">{apiError}</Alert>}
    <Controller name="roomId" control={control} render={({ field }) => <FormControl fullWidth error={!!errors.roomId}>
      <InputLabel>Room</InputLabel><Select {...field} label="Room">{rooms.map(r => <MenuItem key={r.roomId} value={r.roomId}>{r.name} — {r.monthlyRent.toFixed(2)}</MenuItem>)}</Select>
      {errors.roomId && <Alert severity="error">{errors.roomId.message}</Alert>}
    </FormControl>} />
    <Controller name="tenantId" control={control} render={({ field }) => <TextField {...field} type="number" label="Tenant ID" error={!!errors.tenantId} helperText={errors.tenantId?.message} />} />
    <Controller name="checkIn" control={control} render={({ field }) => <TextField {...field} type="date" label="Check in" InputLabelProps={{ shrink: true }} error={!!errors.checkIn} helperText={errors.checkIn?.message} />} />
    <Controller name="checkOut" control={control} render={({ field }) => <TextField {...field} type="date" label="Check out" InputLabelProps={{ shrink: true }} error={!!errors.checkOut} helperText={errors.checkOut?.message} />} />
    <Button type="submit" variant="contained" disabled={isSubmitting}>Create booking</Button>
  </Stack>;
}
import React from 'react';
