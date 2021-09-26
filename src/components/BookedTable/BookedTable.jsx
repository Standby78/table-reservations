import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

import { AppContext } from '../../AppContext';
import { updateTable } from '../../actions/apiActions';
import { epochToString } from '../../helpers';
import { ContentWrapper, UserName, ImgWrapper, DateInfo, ModalButton } from './BookedTable.style';

const BookedTable = ({ table }) => {
    const { tablesDocument, loggedUser, setTablesDocument, setModal, tablesOfficesIndex } =
        React.useContext(AppContext);

    const cancelReservation = async (id, userId) => {
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
            const result = await updateTable(tablesDocument[tablesOfficesIndex], id, userId, 'cancel');

            if (result.status === 'cancelled') {
                setTablesDocument(result.tablesDocument);
                setModal({
                    isVisible: true,
                    message: <p>You cancelled your reservation.</p>,
                });
            }
        } catch (error) {
            setModal({
                isVisible: true,
                message: <p>Please try again. We have some issues.</p>,
            });
        }
    };

    const { reservedStart, reservedEnd } = table || {};
    const start = epochToString(reservedStart);
    const end = epochToString(reservedEnd);
    const isReservationActive = new Date().getTime() < new Date(reservedEnd).getTime();

    return (
        <ContentWrapper>
            {table && (
                <>
                    <ImgWrapper>
                        <img src={loggedUser.picture} />
                    </ImgWrapper>
                    <UserName>
                        {loggedUser.name}
                        {table.userId !== '' && (
                            <>
                                <DateInfo>
                                    Table reserved from
                                    <br />
                                    {start} to {end}
                                </DateInfo>
                                {isReservationActive && (
                                    <ModalButton
                                        cancel
                                        onClick={() => cancelReservation(table.ID, loggedUser.userId)}
                                    >
                                        Cancel Reservation
                                    </ModalButton>
                                )}
                            </>
                        )}
                    </UserName>
                </>
            )}
        </ContentWrapper>
    );
};

export { BookedTable };
