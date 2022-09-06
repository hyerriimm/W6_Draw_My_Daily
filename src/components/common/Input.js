import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  font-size: 15px;
  padding: 5px;
  margin: 15px;
  width: ${(props) => props.width};
  background: white;
  border: solid #e9ecef;
  border-radius: 5px;
`;


const Input= props => <StyledInput {...props} />
export default Input