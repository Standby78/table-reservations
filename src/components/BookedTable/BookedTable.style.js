import styled from 'styled-components';

export const ContentWrapper = styled.div`
    text-align: center;
`;

export const ImgWrapper = styled.div`
    position: relative;
    transform: translate(-40%, -30%);
    border: 1px solid black;
    border-radius: 100px;
    width: 156px;
    height: 156px;

    img {
        width: 150px;
        height: 150px;
        border-radius: 100px;
        border: 3px solid white;
    }
`;

export const UserName = styled.div`
    margin: 0;
    font-size: 1.5rem;
    margin-top: -2rem;
`;

export const DateInfo = styled.div`
    padding: 1rem 0;
    font-size: 1rem;
`;

export const ModalButton = styled.button`
    border: 1px solid black;
    background: radial-gradient(
        farthest-corner at 4px 4px,
        ${(props) => (props.cancel ? '#ffb400' : '#abdf26')} 0%,
        ${(props) => (props.cancel ? '#d51212' : '#007d00')} 100%
    );
    padding: 0.75rem;
    border-radius: 5px;
    font-weight: bold;
`;
