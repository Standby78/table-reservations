import React from 'react';
import styled from 'styled-components';

import { AppContext } from '../../AppContext';
import { BookedTable } from '..';
import TableInfo from './TableInfo';
import Sharks from './Sharks';

const Rect = styled.rect`
    transform-box: fill-box;
    transform-origin: center;
`;

const Table = ({ table, user }) => {
    const { loggedUser, setModal } = React.useContext(AppContext);
    const isFreeForBooking = table.reservedEnd < new Date().getTime();
    const tableColor = isFreeForBooking ? 'green' : 'red';

    return (
        <>
            <Rect
                id={table?.ID}
                onClick={() => {
                    if (!table?.disabled) {
                        setModal({
                            isVisible: true,
                            message:
                                table.userId === loggedUser?.userId ? (
                                    <BookedTable table={table} user={user} />
                                ) : (
                                    <TableInfo table={table} user={user} free={isFreeForBooking} />
                                ),
                        });
                    }
                }}
                stroke={table?.disabled ? 'lightgrey' : 'black'}
                fill={table?.disabled ? 'lightgrey' : tableColor}
                x={table.position.x}
                y={table.position.y}
                width="30"
                height="20"
                style={{ transform: `rotateZ(${table.position.rotation}deg)` }}
            >
                {table?.userId === loggedUser.userId && (
                    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                )}
            </Rect>
            {table?.userId === process.env.AUTHOR && (
                <g
                    style={{
                        transform: `translate(${table.position.x + 25}px, ${
                            table.position.y + 5
                        }px) rotateZ(${table.position.rotation}deg)`,
                    }}
                >
                    <Sharks />
                </g>
            )}
        </>
    );
};

export { Table };
