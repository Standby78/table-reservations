import React from 'react';
import DayPicker from 'react-day-picker';
import PacmanLoader from 'react-spinners/PacmanLoader';

import nouser from './nouser.jpg';
import { AppContext } from '../../AppContext';
import { updateTable } from '../../actions/apiActions';
import { epochToString } from '../../helpers';
import {
    ContentWrapper,
    UserName,
    ImgWrapper,
    DateInfo,
    ModalButton,
} from '../BookedTable/BookedTable.style';

const TableInfo = ({ table, user, free }) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const { reservationStart, reservationEnd } =
        day < 15
            ? {
                reservationStart: new Date(year, month, 16),
                reservationEnd: new Date(year, month + 1, 0),
            }
            : {
                reservationStart: new Date(year, month + 1, 1),
                reservationEnd: new Date(year, month + 1, 15),
            };

    const { tablesDocument, loggedUser, setTablesDocument, setModal, tablesOfficesIndex } =
        React.useContext(AppContext);

    const createReservation = async (id, userId) => {
        setModal({
            isVisible: true,
            pacman: true,
            message: (
                <ContentWrapper>
                    <PacmanLoader color="#053f52" size="16px" margin="4px" css={{ margin: '0 auto' }} />
                </ContentWrapper>
            ),
        });

        try {
            const result = await updateTable(
                tablesDocument[tablesOfficesIndex],
                id,
                userId,
                'update',
                reservationStart.getTime(),
                reservationEnd.getTime()
            );

            switch (result?.status) {
                case 'error':
                    setModal({
                        isVisible: true,
                        message: <p>Cannot create reservation, as you already have a table reserved.</p>,
                    });
                    break;
                case 'updated':
                    setTablesDocument(result.tablesDocument);
                    break;
                case 'reserved':
                    setModal({
                        isVisible: true,
                        message: <p>Someone already reserved this table.</p>,
                    });
            }
        } catch (error) {
            setModal({
                isVisible: true,
                message: <p>Please try again. We have some issues.</p>,
            });
        }
    };

    const { reservedStart, reservedEnd } = table;
    const startDate = epochToString(reservedStart);
    const endDate = epochToString(reservedEnd);

    const modifiers = { start: reservationStart, end: reservationEnd };
    const hasReservation =
        tablesDocument &&
        tablesDocument[loggedUser.office]?.tables.filter((table) => table.userId === loggedUser.userId)
            .length > 0;

    return (
        <>
            <ContentWrapper>
                <ImgWrapper>
                    <img src={free ? nouser : user?.picture} />
                </ImgWrapper>
                {!free ? (
                    <>
                        <UserName>{user?.name}</UserName>
                        <DateInfo>
                            Table reserved from
                            <br />
                            {startDate} to {endDate}
                        </DateInfo>
                    </>
                ) : (
                    <>
                        <UserName>Table free for reservation</UserName>
                        <DayPicker
                            id="start"
                            month={reservationStart}
                            selectedDays={[
                                reservationStart,
                                { after: reservationStart, before: reservationEnd },
                                reservationEnd,
                            ]}
                            firstDayOfWeek={1}
                            modifiers={modifiers}
                            disabledDays={[{ before: reservationStart }, { after: reservationEnd }]}
                        />
                    </>
                )}
                {(free && !hasReservation) ? (
                    <>
                        <ModalButton
                            create
                            id="create"
                            onClick={() => createReservation(table.ID, loggedUser?.userId, reservationEnd)}
                        >
                            Create new reservation
                        </ModalButton>
                    </>
                ) : <p>You already have a table reserved!</p>}
            </ContentWrapper>
        </>
    );
};

export default TableInfo;
