import React from 'react';
import styled from 'styled-components';

function Button({ name, icon, onClick, bgColor, bPad, color, bRad, width, hoverColor, hoverBgColor, height }) {
    return (
        <ButtonStyled
            onClick={onClick}
            $bgcol={bgColor}
            $bpad={bPad}
            $brad={bRad}
            $col={color}
            $width={width}
            $hoverbgcol={hoverBgColor}
            $hovercol={hoverColor}
            $height={height}
        >
            {icon}
            {name}
        </ButtonStyled>
    );
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: ${(props) => props.$bpad};
    background: ${(props) => props.$bgcol};
    border-radius: ${(props) => props.$brad};
    color: ${(props) => props.$col};
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${(props) => props.$hoverbgcol};
        color: ${(props) => props.$hovercol};
    }
`;

export default Button;
