import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <ProgressContainer>
      <ProgressFiller style={{ width: `${progress}%` }} />
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 20px 0;
`;

const ProgressFiller = styled.div`
  height: 10px;
  background-color: #4BB543;
  width: 0;
  transition: width 0.3s ease-in-out;
`;

export default ProgressBar;
