import styled from 'styled-components';
import { ReactNode } from 'react';

interface ItemProps {
  title?: string;
  children?: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 14px;
  border-radius: ${props => props.theme.borderRadius || '6px'};

  background: rgba(18, 18, 20, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(6px);

  > .item-title {
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }
`;

const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item: React.FC<ItemProps> = ({ children, title }) => {
  return (
    <Container>
      {title && <span className="item-title">{title}</span>}
      <Inputs>{children}</Inputs>
    </Container>
  );
};

export default Item;
