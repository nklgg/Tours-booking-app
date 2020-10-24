import React from 'react'
import styled from 'styled-components';

const SpinnerWrapper = ({props}) => {
  return (
<SpinnerWrapper>
  {...props}
</SpinnerWrapper>
  )
}

const SpinnerWrapper = styled.div `
	/* display: ${state => state.clicked ? 'inline-block' : 'none'}; */
	position: absolute;
	left: 40%;
	left: ${state => state.clicked && '20%'};
	transition: all .2s ease-in-out;
	opacity: ${state => state.clicked ? '1' : '0'};


`

export default SpinnerWrapper
