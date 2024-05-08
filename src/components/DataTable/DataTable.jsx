import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Panel from '../Layout/Panel/Panel';

const DataTable = ({
    topic,
    district,
    data,
    paginationModel,
    pageChangeHandler,
    districtChangeHandler
}) => {
    const { columns, rows } = data;
    return (
        <Panel heading={`${topic} by district`}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={pageChangeHandler}
                onRowSelectionModelChange={(district, det) => {
                    if (district.length) {
                        districtChangeHandler(district[0]);
                    }
                }}
                rowSelectionModel={district ? [district] : []}
                density='compact'
                sx={{
                    fontSize: '0.8rem',
                    '& .MuiDataGrid-columnHeaderTitle': {
                        whiteSpace: 'normal',
                        lineHeight: '1.1em',
                        py: '0.3rem',
                        // overflow: 'visible',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        height: 'unset !important',
                        alignSelf: 'end',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        maxHeight: '8rem !important',
                    },
                    '& .MuiDataGrid-columnHeaderRow': {
                        // alignItems: 'flex-end',
                    },
                }}
                autoHeight
                autosizeOnMount
                autosizeOptions={{ expand: true, includeHeaders: true}}
                disableColumnSelector
                hideFooterSelectedRowCount
                keepNonExistentRowsSelected
                disableColumnMenu
                disableMultipleRowSelection
            />
        </Panel>
    )
};

export default DataTable;
