import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {GetFindingsData} from "../MockData";
import {JiraLogoSmall, MondayLogoSmall, ServiceNowLogoSmall} from "./SvgData";
import FindingModal from "./FindingModal";

const rows = GetFindingsData();

const ticketLogosSmall = (ticketService) => {
    switch (ticketService) {
        case 'Jira':
            return <JiraLogoSmall/>;
            break;
        case 'ServiceNow':
            return <ServiceNowLogoSmall/>;
            break;
        case 'Monday':
            return <MondayLogoSmall/>;
            break;
    }
};

function FindingTable() {
    const [open, setOpen] = React.useState(false);
    let [row, setRow] = React.useState(null);
    const handleOpen = (val) => {
        setOpen(true);
        setRow(val);
    };


    const columns = [
        {field: 'title', headerName: 'Title', flex: 1, padding: '59px'},
        {field: 'description', headerName: 'Description', flex: 2},
        {field: 'ticket', headerName: 'Ticket', flex: 1, renderCell: getTicket}
    ];


    return (
        <div>
            <h1 className="text-3xl font-bold text-left">
                Findings
            </h1>

            <div style={{height: '100%', paddingTop: '25px'}}>
                <DataGrid
                    loading={rows.length === 0}
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    initialState={{sorting: {sortModel: [{field: 'title', sort: 'desc'}]}}}
                    disableSelectionOnClick
                    disableColumnMenu
                    autoHeight
                />
                <FindingModal open={open} setOpen={setOpen} row={row}/>
            </div>
        </div>
    );


    function getTicket(params) {
        if (params.row.ticket) {
            return (
                <div className='flex'>
                    <div>{ticketLogosSmall(params.row.ticket.name)}</div>
                    <div className='pl-3'>{params.row.ticket.name || ''}-{params.row.ticket.id || ''}</div>
                </div>
            );
        }
        return (<a href="#" className='link' onClick={(e) => {
            //params.row.ticket = {id: Math.floor(Math.random() * 9999), name: 'Ticket'};
            //console.log(params);
            handleOpen(params.row);
        }}>Create Ticket</a>);
    }
}

export default FindingTable;
