import {GetFindingsData} from "../MockData";
import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';

function FindingTable() {
    const rows = GetFindingsData();
    const columns = [
        {field: 'title', headerName: 'Title', flex: 1.5, padding: '59px'},
        {field: 'description', headerName: 'Description', flex: 3},
        {field: 'ticket', headerName: 'Ticket', flex: 1, renderCell: getTicket,}
    ];


    return (
        <div style={{height: '100%', width: '100%', paddingTop: '25px'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[]}
                initialState={{sorting: {sortModel: [{field: 'title', sort: 'desc'}]}}}
                disableSelectionOnClick
                autoHeight
            /></div>
    );

    function getTicket(params) {
        if (params.row.ticket) {
            return `${params.row.ticket.name || ''}-${params.row.ticket.id || ''}`;
        }
        return (<a href="#" className='link'>Create Ticket</a>);
    }
}

export default FindingTable;
