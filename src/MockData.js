import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const a = axios.create()
const mockAdapter = new MockAdapter(a, {delayResponse: 700});
global.axios = a;

mockAdapter.onGet(new RegExp(`/findings/*`)).reply(200, GetFindingsData());
mockAdapter.onPost(new RegExp(`/ticket/open/*`)).reply(200, () => mockAdapter?.history?.post.pop());


export function GetFindingsData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
        let current = {
            id: i,
            title: "This is the title of the findings",
            description: "This is the description of the finding"
        };
        let hasTicket = Math.floor(Math.random() * 2);
        let ticketKind = ['Monday', 'ServiceNow', 'Jira'][Math.floor(Math.random() * 3)]

        if (hasTicket) {
            current = {...current, ticket: {id: Math.floor(Math.random() * 9999), name: ticketKind}}
        }
        data.push(current);
    }

    return data;
}

export const projectOptions = {
    Jira: [{value: 'seemplicity', label: 'seemplicity'},
        {value: 'project1', label: 'project 1'},
        {value: 'project2', label: 'project 2'},
        {value: 'project3', label: 'project 3'}],

    ServiceNow: [{value: 'project4', label: 'project 4'},
        {value: 'project5', label: 'project 5'}],
    Monday: [{value: 'project6', label: 'project 6'},
        {value: 'project7', label: 'project 7'}]
};

export const issueTypeOptions = [
    {value: 'task', label: 'Task'},
    {value: 'bug', label: 'Bug'},
    {value: 'story', label: 'Story'}
];

export const ticketKinds = ['Jira', 'ServiceNow', 'Monday'];
