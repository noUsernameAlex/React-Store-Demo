import styled from 'styled-components';

export const ButtonContainer = styled.button`
  text-transform:capitalize;
  font-size: 1.4rem;
  background: transparent;
  border:0.05rem solid var(--lightBlue);
  color: ${props => props.cart ? 'var(--mainYellow)' : 'var(--lightBlue)'};
  border-color: ${props => props.cart ? 'var(--mainYellow)' : 'var(--lightBlue)'};
  &:hover {
    background-color: ${props => props.cart ? 'var(--mainBlue)' : 'var(--mainBlue)'};
    transition : all 0.3s linear;
  }
  border-radius: 0.5rem;
`;
