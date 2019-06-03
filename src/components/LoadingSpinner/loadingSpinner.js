import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const StyledLoadingContainer = styled.div`
  display: flex;
  margin: auto;
  grid-area: content;
`;

const LoadingSpinner = () => (
  <StyledLoadingContainer>
    <FontAwesomeIcon icon={faSync} size="6x" spin />;
  </StyledLoadingContainer>
);

export default LoadingSpinner;
