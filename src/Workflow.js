import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const WorkflowArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 80%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 8px;
`;

const Block = styled.div`
  background: white;
  border: 1px solid #ccc;
  padding: 8px;
  margin: 8px 0;
  min-width: 100px;
  text-align: center;
  cursor: pointer;
`;

const Arrow = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    content: '';
    display: block;
    margin: auto;
    width: 2px;
    height: 100%;
    background: #ccc;
  }
`;

const Workflow = () => {
  // State to maintain the list of blocks in each column
  const [columns, setColumns] = useState([['Sales'], ['sale'], ['Customer Support']]);

  // Function to add a new block below the clicked block
  const addBlock = (columnIndex) => {
    const newColumns = [...columns];
    newColumns[columnIndex].push('New Block');
    setColumns(newColumns);
  };

  return (
    <Container>
      <WorkflowArea>
        {columns.map((blocks, columnIndex) => (
          <Column key={columnIndex}>
            {blocks.map((block, blockIndex) => (
              <React.Fragment key={blockIndex}>
                <Block onClick={() => addBlock(columnIndex)}>{block}</Block>
                {/* Render an arrow below each block except the last one */}
                {blockIndex < blocks.length - 1 && <Arrow />}
              </React.Fragment>
            ))}
          </Column>
        ))}
      </WorkflowArea>
    </Container>
  );
};

export default Workflow;
