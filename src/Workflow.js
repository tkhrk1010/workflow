import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const WorkflowArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 80%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
`;

const Block = styled.div`
  background: white;
  border: 1px solid #ccc;
  padding: 8px;
  margin: 4px 0;
  width: 100%;
  text-align: center;
`;

const Workflow = () => {
  return (
    <Container>
      <WorkflowArea>
        <Column>
          <Block>開始</Block>
          <Block>メール作成画面</Block>
          {/* 他のブロックを追加 */}
        </Column>
        <Column>
          {/* 各ステップのブロックを追加 */}
        </Column>
        <Column>
          {/* 各ステップのブロックを追加 */}
        </Column>
      </WorkflowArea>
    </Container>
  );
};

export default Workflow;
