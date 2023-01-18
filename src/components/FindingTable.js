import {GetFindingsData} from "../MockData";
import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Grid, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function FindingTable() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const rows = GetFindingsData();
    const columns = [
        {field: 'title', headerName: 'Title', flex: 1.5, padding: '59px'},
        {field: 'description', headerName: 'Description', flex: 3},
        {field: 'ticket', headerName: 'Ticket', flex: 1, renderCell: getTicket}
    ];


    return (
        <div>
            <h1 className="text-3xl font-bold text-left">
                Findings
            </h1>

            <div style={{height: '100%', width: '100%', paddingTop: '25px'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[]}
                    initialState={{sorting: {sortModel: [{field: 'title', sort: 'desc'}]}}}
                    disableSelectionOnClick
                    disableColumnMenu
                    autoHeight
                />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="findingModal">
                        <Grid container spacing={3}>
                            <Grid className="text-2xl font-bold text-left modalTitle" item xs={11}>

                                Create a ticket

                            </Grid>
                            <Grid item xs={1}>
                                <IconButton style={{marginRight: '20px'}} edge="start" color="red"
                                            onClick={handleClose}>
                                    <CloseIcon sx={{color: '#607AFF'}}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <div>


                        </div>
                        <div className='separator'/>
                        <Typography sx={{mt: 2}}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    );

    function getTicket(params) {
        if (params.row.ticket) {
            return `${params.row.ticket.name || ''}-${params.row.ticket.id || ''}`;
        }
        return (<a href="#" className='link' onClick={(e) => {
            params.row.ticket = {id: Math.floor(Math.random() * 9999), name: 'Ticket'};
            console.log(params);
            handleOpen();
        }}>Create Ticket</a>);
    }
}

export default FindingTable;
