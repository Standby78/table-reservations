import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import PacmanLoader from 'react-spinners/PacmanLoader';

import { Header, Table, BookedTable, Map } from './components';
import { minMax } from './helpers';
import { updateDocument, getAllUsers, getAllTables, getLoggedUser } from './actions/apiActions';
import { updateAllUsersEndpoint, defaultUser } from './config/index';
import { AppProvider } from './AppContext';
import { AppWrapper, SvgMap, FlexWrapper, CloseButton, modalCustomStyles, PacmanWrapper } from './App.style';

import 'react-day-picker/lib/style.css';

const App = () => {
    const isDev = process.env.REACT_APP_ENV === 'development';
    const [tablesDocument, setTablesDocument] = useState(undefined);
    const [usersDocument, setUsersDocument] = useState(undefined);
    const [loggedUser, setLoggedUser] = useState(defaultUser);
    const [modal, setModal] = useState({
        isVisible: false,
        handler: null,
        message: null,
    });
    const [tablesOfficesIndex, setTablesOfficesIndex] = useState(0);
    const [mouseWheelScrolled, setMouseWheelScrolled] = useState(0);
    const [svgTransform, setSvgTransform] = useState({ zoom: 1, x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState({ x: 0, y: 0 });

    const updateScroll = (e) => {
        setMouseWheelScrolled(Math.min(2500, Math.max(-1000, mouseWheelScrolled - e.deltaY)));
    };

    useEffect(async () => {
        if (!isDev) setLoggedUser(await getLoggedUser());
        setTablesDocument(await getAllTables());
        setUsersDocument(await getAllUsers());
    }, []);

    useEffect(() => {
        setSvgTransform({
            ...svgTransform,
            zoom: mouseWheelScrolled / 1000 / 2 + 1,
        });
    }, [mouseWheelScrolled]);

    useEffect(() => {
        const userDocCopy = usersDocument?.users.filter((user) => user.userId === loggedUser?.userId);
        if (userDocCopy?.length === 0) {
            const usersClone = [...usersDocument?.users];
            const newUsers = usersClone.concat(loggedUser);
            setUsersDocument({ _id: usersDocument?._id, users: newUsers });
            updateDocument(updateAllUsersEndpoint, usersDocument?._id, newUsers, 'users');
        }
    }, [usersDocument, loggedUser]);

    useEffect(() => {
        const tableUsedByLoggedUser = [];
        tablesDocument?.forEach((office, index) => {
            const reservedTable = office.tables?.filter((table) => table.userId === loggedUser?.userId);
            if (reservedTable?.length > 0) {
                tableUsedByLoggedUser.push(reservedTable[0]);
                loggedUser.office = index;
            }
        });

        if (tableUsedByLoggedUser?.length > 0) {
            setTablesOfficesIndex(loggedUser.office);
            setModal({
                isVisible: true,
                handler: null,
                message: <BookedTable table={tableUsedByLoggedUser[0]} />,
            });
        }
    }, [usersDocument, tablesDocument]);

    const setModalParams = (params = { isVisible: false }) => {
        setModal(params);
    };

    const mouseDrag = (e) => {
        const x = minMax(svgTransform.x - (mouseDown.x - e.pageX) / svgTransform.zoom, 300);
        const y = minMax(svgTransform.y - (mouseDown.y - e.pageY) / svgTransform.zoom, 300);
        setSvgTransform({ ...svgTransform, x, y });
    };

    const tables =
        tablesDocument &&
        tablesDocument[tablesOfficesIndex]?.tables?.map((table) => (
            <Table
                key={table.ID}
                table={table}
                user={usersDocument?.users.filter((user) => user.userId === table.userId)[0]}
            />
        ));

    return (
        <AppProvider
            value={{
                loggedUser,
                tablesDocument,
                setTablesDocument,
                setModal,
                tablesOfficesIndex,
                setTablesOfficesIndex,
            }}
        >
            {loggedUser && tablesDocument && usersDocument ? (
                <AppWrapper>
                    <Header />
                    <FlexWrapper>
                        {modal.isVisible && (
                            <Modal
                                ariaHideApp={false}
                                isOpen={modal.isVisible}
                                onRequestClose={setModalParams}
                                style={modalCustomStyles}
                            >
                                {!modal.pacman && (
                                    <CloseButton onClick={() => setModalParams({ isVisible: false })}>
                                        <svg height="12" width="12">
                                            <line
                                                x1="0"
                                                y1="0"
                                                x2="12"
                                                y2="12"
                                                style={{ stroke: '#000', strokeWidth: '2' }}
                                            />
                                            <line
                                                x1="0"
                                                y1="12"
                                                x2="12"
                                                y2="0"
                                                style={{ stroke: '#000', strokeWidth: '2' }}
                                            />
                                        </svg>
                                    </CloseButton>
                                )}
                                {modal.message}
                            </Modal>
                        )}
                        <SvgMap
                            onWheel={(e) => updateScroll(e)}
                            onMouseDown={(e) => setMouseDown({ x: e.pageX, y: e.pageY })}
                            onMouseUp={(e) => mouseDrag(e)}
                        >
                            <Map svgTransform={svgTransform} tables={tables} />
                        </SvgMap>
                    </FlexWrapper>
                </AppWrapper>
            ) : (
                <PacmanWrapper>
                    <PacmanLoader color="#053f52" size="80px" css={{ top: '38%', left: '40%' }} />
                </PacmanWrapper>
            )}
        </AppProvider>
    );
};

export default App;
