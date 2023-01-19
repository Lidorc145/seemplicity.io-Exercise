import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from "@mui/icons-material/Close";
import {TextField} from "@mui/material";
import {GetFindingsData} from "../MockData";
import Select from 'react-select';
import {JiraLogo, JiraLogoSmall, MondayLogo, MondayLogoSmall, ServiceNowLogo, ServiceNowLogoSmall} from "./SvgData";

const rows = GetFindingsData();
const projectOptions = [
    {value: 'seemplicity', label: 'seemplicity'},
    {value: 'project1', label: 'project 1'},
    {value: 'project2', label: 'project 2'},
    {value: 'project3', label: 'project 3'}
];
const issueTypeOptions = [
    {value: 'task', label: 'Task'},
    {value: 'bug', label: 'Bug'}
];

const ticketKinds = ['Monday', 'ServiceNow', 'Jira'];
const ticketLogos = [<MondayLogo/>, <ServiceNowLogo/>, <JiraLogo/>];
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
    const [issueTypeOption, setIssueTypeOption] = React.useState('');
    const [ticketService, setTicketService] = React.useState('Jira');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setIssueTypeOption('');
        setTicketService('Jira');
    };


    const columns = [
        {field: 'title', headerName: 'Title', flex: 1, padding: '59px'},
        {field: 'description', headerName: 'Description', flex: 2},
        {field: 'ticket', headerName: 'Ticket', flex: 1, renderCell: getTicket}
    ];

    const handleChange = (event) => {
        setTicketService(event.target.value);
    };

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
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="findingModal">
                        <div>
                            <div className='grid-container'>
                                <div className='text-2xl font-bold text-left modalTitle'>Create a ticket</div>
                                <div>
                                    <CloseIcon sx={{color: '#607AFF'}} onClick={handleClose}/>
                                </div>
                            </div>
                            <div className='separator'/>
                            <div className='flex mt-5 mb-10'>
                                {ticketKinds.map((val, idx) => (
                                    <label onChange={handleChange}>
                                        <div key={idx} className='flex mr-8'>
                                            <div className='grow mr-2'>
                                                <input type="radio" name="service" checked={val === ticketService}
                                                       value={val}/>
                                            </div>
                                            <div className='flex-none'>{ticketLogos[idx]}</div>
                                        </div>
                                    </label>)).reverse()}
                            </div>
                            <div>
                                <div className='grid-container'>
                                    <div className='grid-half text-1xl font-bold text-left cell1'> Project</div>
                                    <div className='grid-half text-1xl font-bold text-left cell2'>Issue Type</div>
                                </div>
                                <div className='grid-container'>
                                    <div className='grid-half text-1xl font-bold text-left cell1'>
                                        <Select placeholder="Select Project"
                                                options={projectOptions}/>
                                    </div>
                                    <div className='grid-half text-1xl font-bold text-left cell2'>
                                        <Select placeholder="Select Issue Type"
                                                options={issueTypeOptions} onChange={e => setIssueTypeOption(e.value)}/>
                                    </div>
                                </div>

                                {issueTypeOption === 'task' &&
                                    <div className='grid-container'>
                                        <div className='text-1xl font-bold text-left grid-full'> Project</div>
                                        <div className='grid-full'>
                                            <TextField fullWidth placeholder="Write a title"
                                                       id="fullWidth"/>
                                        </div>
                                        <div className='text-1xl font-bold text-left grid-full'>Description</div>
                                        <div className='grid-full'>
                                            <TextField fullWidth multiline minRows='3' maxRows={6}
                                                       placeholder="Write a title"
                                                       id="fullWidth"/>
                                        </div>
                                    </div>

                                }

                            </div>
                        </div>
                        <div className='h-10'/>
                        <div className='flex flex-row-reverse buttonGroup'>
                            <button className='buttons contained' disabled>Create ticket</button>
                            <button className='buttons outlined' onClick={handleClose}>Cancel</button>
                        </div>

                    </Box>
                </Modal>
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
            handleOpen();
        }}>Create Ticket</a>);
    }
}

export default FindingTable;
