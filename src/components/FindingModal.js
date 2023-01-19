import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import {TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import {JiraLogo, MondayLogo, ServiceNowLogo} from "./SvgData";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

const projectOptions = [
    {value: 'seemplicity', label: 'seemplicity'},
    {value: 'project1', label: 'project 1'},
    {value: 'project2', label: 'project 2'},
    {value: 'project3', label: 'project 3'},

];
const issueTypeOptions = [
    {value: 'task', label: 'Task'},
    {value: 'bug', label: 'Bug'}
];

const ticketKinds = ['Monday', 'ServiceNow', 'Jira'];
const ticketLogos = [<MondayLogo/>, <ServiceNowLogo/>, <JiraLogo/>];

export default function FindingModal(props) {
    const {open, setOpen, row} = props;

    const schema = yup.object().shape({
        service: yup.string().required(),
        project: yup.object().required(),
        issueType: yup.object().required(),
        title: yup.string().when("issueType", (issueType) => {
            if (issueType?.value === 'task') {
                return yup.string().required("Must enter title");
            }
            if (issueType?.value === 'bug') {
                return yup.string();
            }
        }),
        description: yup.string().when("issueType", (issueType) => {
            if (issueType?.value === 'task') {
                return yup.string().required("Must enter description");
            }
            if (issueType?.value === 'bug') {
                return yup.string();
            }
        }),
    });

    const {register, control, handleSubmit, watch, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = data => {
        if (!shouldDisabled()) {
            row['ticket'] = {id: Math.floor(Math.random() * 9999), name: watch("service")};
            handleClose();
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const shouldDisabled = () => {
        return Object.getOwnPropertyNames(errors).length !== 0;
    };
    
    return (<Modal
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
                                        <input type="radio"  {...register('service')}
                                               defaultChecked={val === 'Jira'}
                                               value={val}/>
                                    </div>
                                    <div className='flex-none'>{ticketLogos[idx]}</div>
                                </div>
                            </label>)).reverse()}
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
                                            options={projectOptions}
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
                        {watch("issueType")?.value === 'task' &&
                            <div className='grid-container'>
                                <div className='text-1xl font-bold text-left grid-full'>Title</div>
                                <div className='grid-full'>
                                    <TextField fullWidth placeholder="Write a title"
                                               {...register('title')}
                                               id="fullWidth"/>
                                    {errors.title && <p className='alert'>{errors.title.message}</p>}
                                </div>
                                <div className='text-1xl font-bold text-left grid-full'>Description</div>
                                <div className='grid-full'>
                                    <TextField fullWidth multiline minRows='3' maxRows={6}
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
    </Modal>);
}