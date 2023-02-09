import React from 'react';
import { NotificationCustomProvider } from './NotificationContext'
import NotificationCustom from '../components/Notification/NotificationCustom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import "moment/locale/pt-br"
import moment from 'moment';

moment.locale("pt-br");

export function Providers({ children }) {

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <NotificationCustomProvider>
                {children}
                <NotificationCustom />
            </NotificationCustomProvider>
        </LocalizationProvider>
    )
}