import { authMeEndpoint, getAllTablesEndpoint, getAllUsersEndpoint, updateTableEndpoint } from '../config';

const dayjs = require('dayjs');

// don't need this?
export const updateDocument = async (endpoint, id, array, key) => {
    const body = {};
    body._id = id;
    body[`${key}`] = JSON.stringify(array);
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
};

export const getLoggedUser = async () => {
    return fetch(authMeEndpoint, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.length === 0) return undefined;
            return {
                userId: response[0].user_id,
                name: `${response[0].user_claims[10].val} ${response[0].user_claims[11].val}`,
                picture: response[0].user_claims[9].val,
            };
        });
};
export const getAllTables = async () => {
    return fetch(getAllTablesEndpoint, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.length === 0) return {};
            const { tables } = JSON.parse(JSON.stringify(response[0]));
            tables.forEach((table) => {
                if (table.reserved_end - dayjs().valueOf() < 0 && table.userId !== '') {
                    table.reserved_end = 0;
                    table.userId = '';
                }
            });
            return response;
        });
};

export const getAllUsers = async () => {
    return fetch(getAllUsersEndpoint, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.length === 0) return {};
            return response[0];
        });
};

export const updateTable = async (office, id, userId, action, reservationStart, reservationEnd) => {
    if (userId === undefined) return { status: 'Wrong user ID' };
    const body = {};
    body.userId = userId;
    body.action = action;
    body.reservationStart = reservationStart;
    body.reservationEnd = reservationEnd;
    return fetch(`${updateTableEndpoint}/${office._id}/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};
