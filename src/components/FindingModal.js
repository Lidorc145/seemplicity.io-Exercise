import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import {Snackbar, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import {JiraLogo, MondayLogo, ServiceNowLogo} from "./SvgData";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {issueTypeOptions, projectOptions, ticketKinds} from "../MockData";
import {forwardRef, useEffect, useState} from "react";
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ticketLogos = [<JiraLogo/>, <ServiceNowLogo/>, <MondayLogo/>];

export default function FindingModal(props) {
    const {open, setOpen, row} = props;
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const schema = yup.object().shape({
        service: yup.string().required("Service is required"),
        project: yup.object().nullable("sadas").required("Project is required"),
        issueType: yup.object().required("Issue type is required"),
        title: yup.string().min(2).required("Title is required"),
        description: yup.string().min(2).required("Description is required")
    });

    const {register, control, handleSubmit, watch, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        if (!shouldDisabled()) {
            global.axios.post("/ticket/open", {
                id: row?.id, title: watch('title'),
                description: watch('description'),
                ticket: {
                    id: Math.floor(Math.random() * 9999),
                    name: watch("service"),
                    project: watch('project').value,
                    issueType: watch('issueType').value
                }
            }).then(function (response) {
                const newData = JSON.parse(response.data().data);
                row['title'] = newData.title;
                row['description'] = newData.description;
                row['ticket'] = newData.ticket;
                handleClose();
                setSnackBarOpen(true);
            });
        }
    };
    useEffect(() => {
        reset({service: 'Jira', title: row?.title, description: row?.description});
    }, [row]);

    const handleClose = () => {
        setOpen(false);
        reset({service: 'Jira'});
    };

    const shouldDisabled = () => {
        return Object.getOwnPropertyNames(errors).length !== 0;
    };

    return (<div>
        <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={() => setSnackBarOpen(false)}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert severity="success" sx={{width: '100%'}}>
                Success: Ticket created!
            </Alert>
        </Snackbar>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="findingModal">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                <label key={idx}>
                                    <div className='flex mr-8'>
                                        <div className='grow mr-2'>
                                            <input type="radio" {...register('service')} onChange={(e) => {
                                                register('service').onChange(e);
                                                reset({
                                                    service: watch('service'),
                                                    project: null,
                                                    issueType: watch('issueType')
                                                });
                                            }}
                                                   defaultChecked={val === watch('service')}
                                                   value={val}/>
                                        </div>
                                        <div className='flex-none'>{ticketLogos[idx]}</div>
                                    </div>
                                </label>))}
                        </div>
                        {errors.service && <p className='alert'>{errors.service.message}</p>}
                        <div>
                            <div className='grid-container'>
                                <div className='grid-half text-1xl font-bold text-left cell1'> Project</div>
                                <div className='grid-half text-1xl font-bold text-left cell2'>Issue Type</div>
                            </div>
                            <div className='grid-container'>
                                <div className='grid-half text-1xl font-bold text-left cell1'>
                                    <Controller
                                        control={control}
                                        name="project"
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <Select
                                                placeholder="Select Project"
                                                name={name}
                                                value={value}
                                                options={projectOptions[(watch('service') || 'Jira')]}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                inputRef={ref}/>
                                        )}/>
                                    {errors.project && <p className='alert'>{errors.project.message}</p>}
                                </div>
                                <div className='grid-half text-1xl font-bold text-left cell2'>
                                    <Controller
                                        control={control}
                                        name="issueType"
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <Select
                                                placeholder="Select Issue Type"
                                                name={name}
                                                value={value}
                                                options={issueTypeOptions}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                inputRef={ref}/>
                                        )}/>
                                    {errors.issueType && <p className='alert'>{errors.issueType.message}</p>}
                                </div>
                            </div>
                            {watch("issueType")?.value &&
                                <div className='grid-container'>
                                    <div className='text-1xl font-bold text-left grid-full'>Title</div>
                                    <div className='grid-full'>
                                        <TextField fullWidth placeholder="Write a title" defaultValue={row?.title}
                                                   {...register('title')}
                                                   id="fullWidth"/>
                                        {errors.title && <p className='alert'>{errors.title.message}</p>}
                                    </div>
                                    <div className='text-1xl font-bold text-left grid-full'>Description</div>
                                    <div className='grid-full'>
                                        <TextField fullWidth multiline minRows='3' maxRows={6}
                                                   defaultValue={row?.description}
                                                   placeholder="Write a title"
                                                   {...register('description')}
                                                   id="fullWidth"/>
                                        {errors.description && <p className='alert'>{errors.description.message}</p>}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='h-10'/>
                    <div className='flex flex-row-reverse buttonGroup'>
                        <button className='buttons contained'
                                disabled={shouldDisabled()}
                                onClick={handleSubmit(onSubmit)}>Create ticket
                        </button>
                        <button className='buttons outlined' onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </Box>
        </Modal></div>);
}