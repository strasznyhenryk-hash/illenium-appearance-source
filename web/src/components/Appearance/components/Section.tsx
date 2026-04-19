import { ReactNode } from 'react';
import styled from 'styled-components';

interface SectionProps {
  title: string;
  deps?: any[];
  children?: ReactNode;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: rgba(${props => props.theme.fontColor || '255, 255, 255'}, 1);
  user-select: none;
`;

const Header = styled.div`
  width: 100%;
  padding: 2px 4px;
  color: #fff;

  span {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 1);
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Section: React.FC<SectionProps> = ({ children, title }) => {
  return (
    <Container>
      <Header>
        <span>{title}</span>
      </Header>
      <Items>{children}</Items>
    </Container>
  );
};

export default Section;
