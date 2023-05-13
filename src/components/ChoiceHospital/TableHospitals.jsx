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

export default function TableHospitals({ hospitals, handleClickRow }) {

    const columns = [
        {
            field: 'CNES',
            headerName: 'CNES',
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
                hospitals.length === 0 ?
                    <Typography align='center' variant='h6'>
                        Não há hospitais que atendam os filtros aplicados
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