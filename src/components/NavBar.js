import React, {useEffect} from 'react';
import AppBar from "@mui/material/AppBar";
import {
    Box, IconButton,
    Toolbar,
} from "@mui/material";
import {DefaultUserIcon, SeemplicityLogo, SettingsIcon} from "./SvgData";
import {ThemeProvider, createTheme} from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#0E0522',
        },
    },
});

export function NavBar() {
    const navItems = ['Dashboard', 'Findings', 'Remediation', 'Rules'];
    useEffect(()=>{
        const items = document.querySelectorAll('.nav-item');
        items.forEach(function (item, index) {
            item.classList.contains('is-active') && handleIndicator(item);
        });
    });

    return(
        <ThemeProvider theme={darkTheme}>
            <AppBar>
                <Toolbar className='toolbar' >
                    <SeemplicityLogo/>
                    <nav className="nav">
                        {navItems.map((item) => (
                            <a href="#" key={item} className={"nav-item"+(item===navItems[1]?' is-active': '')} onChange={(e)=>console.log("dsdsdds")} active-color="#607AFF" onClick={e=>{
                                e.preventDefault();
                                handleIndicator(e.target);
                            }}>{item}</a>
                        ))}
                        <span className="nav-indicator"></span>

                    </nav>
                    <div className="grow" />
                    <IconButton style={{marginRight: '20px'}} edge="start" color="inherit">
                        <SettingsIcon/>
                    </IconButton>
<div>
                    <IconButton edge="start" color="inherit">
                        <DefaultUserIcon/>
                    </IconButton>
    <a href="#" className="hidden-mobile" onClick={e=>e.preventDefault()}>John@seemplicity.io</a></div>
                       </Toolbar>
            </AppBar>
            <Toolbar />
        </ThemeProvider>

    );

    function handleIndicator(el) {
        const indicator = document.querySelector('.nav-indicator');
        const items = document.querySelectorAll('.nav-item');
        items.forEach(function (item) {
            item.classList.remove('is-active');
            item.removeAttribute('style');
        });
        indicator.style.width = "".concat(el.offsetWidth, "px");
        indicator.style.left = "".concat(el.offsetLeft, "px");
        indicator.style.backgroundColor = el.getAttribute('active-color');
        el.classList.add('is-active');
        el.style.color = el.getAttribute('active-color');
    }


}

