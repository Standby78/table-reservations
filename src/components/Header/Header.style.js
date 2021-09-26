import styled from 'styled-components';

export const HeaderContainer = styled.div`
padding: 5px 0 0 2rem;
background-color: #ad8570;
`;

export const Title = styled.h1`
font-size: 2rem;
color: white;
display: inline;
float: right;
margin-block: auto;
padding-right: 1rem;
font-weight: 400;
`;

export const Button = styled.button`
margin: 0 5px;
color: black;
border: solid 1px black;
border-bottom: none;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
background: ${(props) => (props.selectedButton ? '#FFF' : '#b19b90')};
padding: 15px;
position: ${(props) => (props.selectedButton ? 'relative' : 'unset')};
`;
