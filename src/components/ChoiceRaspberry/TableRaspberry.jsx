import { Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { DataGrid, GridToolbarExport} from '@mui/x-data-grid';

const classes = {
    dataGrid: {
        '& .MuiDataGrid-row:hover': {
            backgroundColor: '#D5F0FF',
            cursor: 'pointer'
        }
    }
}

export default function TableRaspberry({ raspberry, handleClickRow }) {

    const columns = [
        {
            field: 'propertyIdentification',
            headerName: 'Número de Identificação',
            width: 180
        },
        {
            field: 'measuredPatients',
            headerName: 'Numero de pacientes atendidos',
            width: 350,
            valueFormatter: (row) => {
                if(row.value && Array.isArray(row.value) ){
                    return row.value.length
                }
                return 0
            }
        },
    ];

    return (
        <>
            {
                raspberry && Array.isArray(raspberry) && raspberry.length === 0 ?
                    <Typography align='center' variant='h6'>
                        Não há módulos que atendam os filtros aplicados
                    </Typography> :
                    <Box sx={{ height: 300, width: '100%' }}>
                        <DataGrid
                            onRowClick={handleClickRow}
                            columns={columns}
                            getRowId={(row) => row.id}
                            rows={raspberry}
                            sx={classes.dataGrid}
                            pageSize={5}
                            
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
            }
        </>
    );
}