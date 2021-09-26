import React from 'react';

import { AppContext } from '../../AppContext';
import { HeaderContainer, Button, Title } from './Header.style';

const Header = () => {
    const { tablesDocument, tablesOfficesIndex, setTablesOfficesIndex } = React.useContext(AppContext);

    return (
        <HeaderContainer>
            {tablesDocument &&
                tablesDocument.map((office, index) => (
                    <Button
                        key={`button${index}`}
                        selectedButton={tablesOfficesIndex === index}
                        onClick={() => setTablesOfficesIndex(index)}
                    >
                        {office.office}
                    </Button>
                ))}
            <Title>Table Reservations App</Title>
        </HeaderContainer>
    );
};

export { Header };
