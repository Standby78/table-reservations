import styled from 'styled-components';

export const AppWrapper = styled.div`
    width: 100vw;
    height: 92vh;
`;

export const SvgMap = styled.div`
    margin-top: -1px;
    border-top: 1px solid black;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const FlexWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

export const CloseButton = styled.button`
    line-height: 10px;
    border: 1px solid black;
    float: right;
    border-radius: 30px;
    width: 25px;
    height: 25px;
    background: radial-gradient(farthest-corner at 4px 4px, #ffb400 0%, #d51212 100%);
`;

export const modalCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        borderRadius: '8px',
        borderWidth: '2px',
        backgroundColor: '#b19b90',
        borderColor: 'black',
        padding: '5px',
        paddingTop: '25px',
        paddingBottom: '25px',
        overflow: 'visible',
        minHeight: '20px'
    },
};

export const PacmanWrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;
