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

const ArrowColumn = styled.div`
  width: 50px; // または適切な幅
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
`;

const ArrowIcon = styled.div`
  font-size: 24px; // 矢印のサイズ
  color: #ccc; // 矢印の色
`;


const Workflow = () => {
  // State to maintain the list of blocks in each column
  const [columns, setColumns] = useState([
    { type: 'block', blocks: ['Sales'] },
    { type: 'arrow' }, 
    { type: 'block', blocks: ['Sale'] },
    { type: 'arrow' },
    { type: 'block', blocks: ['Customer Support'] },
  ]);
  

  // Function to add a new block below the clicked block
  const addBlock = (columnIndex, blockIndex) => {
    const newColumns = [...columns];
    // Ensure the column is of type 'block' before attempting to add a block
    if (newColumns[columnIndex].type === 'block') {
      // Correctly access the blocks array within the column object
      let newBlocks = [...newColumns[columnIndex].blocks];
      newBlocks.splice(blockIndex + 1, 0, 'New Block');
      newColumns[columnIndex].blocks = newBlocks;
      setColumns(newColumns);
    }
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
  
    // Ensure both source and target columns are of type 'block'
    if (columns[sourceColumnIndex].type === 'block' && columns[targetColumnIndex].type === 'block') {
      const newColumns = [...columns];
      // Use a temporary variable to hold the block being moved
      const blockToMove = newColumns[sourceColumnIndex].blocks[sourceBlockIndex];
      // Remove the block from the source column
      newColumns[sourceColumnIndex].blocks.splice(sourceBlockIndex, 1);
      // Insert the block into the target column
      newColumns[targetColumnIndex].blocks.splice(targetBlockIndex + 1, 0, blockToMove);
      setColumns(newColumns);
    }
  };
  

  // Function to handle double click on block
  const handleDoubleClick = (columnIndex, blockIndex) => {
    const newColumns = [...columns];
    // ダブルクリックされたColumnがblockタイプであることを確認
    if (newColumns[columnIndex].type === 'block') {
      const newBlockText = prompt('Enter new text for the block:');
      if (newBlockText !== null) {
        // blocks配列内の特定のブロックテキストを更新
        newColumns[columnIndex].blocks[blockIndex] = newBlockText;
        setColumns(newColumns);
      }
    }
  };
  

  const addColumn = () => {
    setColumns([...columns, { type: 'arrow' }, { type: 'block', blocks: [] }]);
  };
  

  return (
    <Container>
      <WorkflowArea>
        {columns.map((column, index) => {
          if (column.type === 'block') {
            return (
              <Column key={`block-${index}`}>
                {column.blocks.map((block, blockIndex) => (
                  <React.Fragment key={blockIndex}>
                    <Block
                      draggable
                      onDragStart={(e) => handleDragStart(e, index, blockIndex)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, index, blockIndex)}
                      onDoubleClick={() => handleDoubleClick(index, blockIndex)}
                    >
                      {block}
                    </Block>
                    {blockIndex < column.blocks.length - 1 && <Arrow />}
                  </React.Fragment>
                ))}
                <HoverArrow onClick={() => addBlock(index, column.blocks.length - 1)} />
              </Column>
            );
          } else if (column.type === 'arrow') {
            return (
              <ArrowColumn key={`arrow-${index}`}>
                <ArrowIcon>→</ArrowIcon> {/* 今後変更可能 */}
              </ArrowColumn>
            );
          }
        })}
        <AddColumnButton onClick={addColumn}>Add Column</AddColumnButton>
      </WorkflowArea>
    </Container>
  );
};

export default Workflow;
