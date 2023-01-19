import React from 'react';

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