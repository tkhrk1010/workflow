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
    content: '↓';
    font-size: 20px;
  }
`;

const HoverArrow = styled(Arrow)`
  opacity: 0; // Initially invisible
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.5; // Visible and slightly transparent on hover
  }
`;

const AddColumnButton = styled.button`
  padding: 8px 16px;
  margin-left: auto; // Ensure it aligns to the right
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;


const Workflow = () => {
  // State to maintain the list of blocks in each column
  const [columns, setColumns] = useState([['Sales'], ['sale'], ['Customer Support']]);

  // Function to add a new block below the clicked block
  const addBlock = (columnIndex, blockIndex) => {
    const newColumns = [...columns];
    // Insert a new block just below the clicked one
    newColumns[columnIndex].splice(blockIndex + 1, 0, 'New Block');
    setColumns(newColumns);
  };
  

  // Function to handle drag start
  const handleDragStart = (e, columnIndex, blockIndex) => {
    e.dataTransfer.setData('columnIndex', columnIndex);
    e.dataTransfer.setData('blockIndex', blockIndex);
  };

  // Function to handle drop
  const handleDrop = (e, targetColumnIndex, targetBlockIndex) => {
    const sourceColumnIndex = e.dataTransfer.getData('columnIndex');
    const sourceBlockIndex = e.dataTransfer.getData('blockIndex');
    const newColumns = [...columns];
    const blockToMove = newColumns[sourceColumnIndex][sourceBlockIndex];
    newColumns[sourceColumnIndex].splice(sourceBlockIndex, 1);
    newColumns[targetColumnIndex].splice(targetBlockIndex + 1, 0, blockToMove);
    setColumns(newColumns);
  };

  // Function to handle double click on block
  const handleDoubleClick = (columnIndex, blockIndex) => {
    const newColumns = [...columns];
    const newBlockText = prompt('Enter new text for the block:');
    if (newBlockText !== null) {
      newColumns[columnIndex][blockIndex] = newBlockText;
      setColumns(newColumns);
    }
  };

  const addColumn = () => {
    setColumns([...columns, []]); // Add a new empty column
  };
  

  return (
    <Container>
      <WorkflowArea>
        {columns.map((blocks, columnIndex) => (
          <Column key={columnIndex}>
            {blocks.map((block, blockIndex) => (
              <React.Fragment key={blockIndex}>
                <Block
                  draggable
                  onDragStart={(e) => handleDragStart(e, columnIndex, blockIndex)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, columnIndex, blockIndex)}
                  onDoubleClick={() => handleDoubleClick(columnIndex, blockIndex)}
                >
                  {block}
                </Block>
                {/* Render an arrow below each block except the last one */}
                {blockIndex < blocks.length - 1 && <Arrow />}
              </React.Fragment>
            ))}
            {/* Add HoverArrow below the last block of each column */}
            <HoverArrow onClick={() => addBlock(columnIndex, blocks.length - 1)} />
          </Column>
        ))}
        <AddColumnButton onClick={addColumn}>Add Column</AddColumnButton>
      </WorkflowArea>
    </Container>
  );
};

export default Workflow;
