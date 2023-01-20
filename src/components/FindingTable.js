import * as React from 'react';
import {useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {JiraLogoSmall, MondayLogoSmall, ServiceNowLogoSmall} from "./SvgData";
import FindingModal from "./FindingModal";


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
    const [rows, setRows] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);

    useEffect(() => {
        if (rows.length === 0) {
            global.axios.get("/findings").then(function (response) {
                setRows(response.data);
            });
        }
    }, []);

    const handleOpen = (val) => {
        setOpen(true);
        setSelectedRow(val);
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
                <FindingModal open={open} setOpen={setOpen} row={selectedRow}/>
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
            e.preventDefault();
            handleOpen(params.row);
        }}>Create Ticket</a>);
    }
}

export default FindingTable;
