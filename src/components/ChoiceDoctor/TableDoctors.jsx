import { Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const classes = {
    dataGrid: {
        '& .MuiDataGrid-row:hover': {
            backgroundColor: '#D5F0FF',
            cursor: 'pointer'
        }
    }
}

export default function TableDoctors({ doctors, handleClickRow }) {

    const columns = [
        {
            field: 'CRM',
            headerName: 'CRM',
            width: 180
        },
        {
            field: 'name',
            headerName: 'Nome',
            width: 350
        },
    ];

    return (
        <>
            {
                doctors.length === 0 ?
                    <Typography align='center' variant='h6'>
                        Não há médicos que atendam os filtros aplicados
                    </Typography> :
                    <Box sx={{ height: 300, width: '100%' }}>
                        <DataGrid
                            onRowClick={handleClickRow}
                            columns={columns}
                            getRowId={(row) => row.id}
                            rows={doctors}
                            sx={classes.dataGrid}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
            }
        </>
    );
}