import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
`;

export const Header = styled.div`
  position: absolute;
  top: 32px;
  left: 40px;
  z-index: 5;
  color: #fff;
  user-select: none;
  max-width: 260px;

  h1 {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 2px;
    line-height: 1.05;
  }

  h1 .accent {
    color: rgb(${props => props.theme.accentColor || '227, 32, 59'});
    display: block;
  }

  p {
    margin-top: 8px;
    font-size: 11px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.65);
    max-width: 200px;
    letter-spacing: 0.3px;
    line-height: 1.35;
  }
`;

export const LeftNav = styled.nav`
  position: absolute;
  left: 40px;
  top: 210px;
  bottom: 110px;
  width: 220px;
  z-index: 5;

  display: flex;
  flex-direction: column;
  gap: 6px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

interface NavItemProps {
  active: boolean;
}

export const NavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: center;
  gap: 14px;
  height: 50px;
  padding: 0 14px;
  border: 0;
  background: transparent;
  color: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.55)')};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 600 : 500)};
  letter-spacing: 0.4px;
  transition: all 0.2s ease;
  border-radius: ${props => props.theme.borderRadius || '6px'};
  text-align: left;

  .icon {
    position: relative;
    width: 46px;
    height: 52px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.12);
    color: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.75)')};
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    transition: color 0.2s ease;
  }

  .icon::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: rgba(28, 28, 30, 0.92);
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    z-index: 0;
  }

  .icon > * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    color: #fff;
    .icon {
      color: #fff;
    }
  }
`;

export const RightPanel = styled.aside`
  position: absolute;
  right: 40px;
  top: 40px;
  bottom: 100px;
  width: 420px;
  z-index: 4;

  display: flex;
  flex-direction: column;

  padding: 4px 4px 4px 18px;
  background: transparent;

  color: #fff;
`;

export const PanelHeader = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 0 4px 12px 4px;
  text-transform: capitalize;
`;

export const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.35);
    border-radius: 2px;
  }
`;

export const IconRail = styled.div`
  position: absolute;
  right: 480px;
  top: 40px;
  z-index: 4;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Footer = styled.div`
  position: absolute;
  left: 40px;
  right: 40px;
  bottom: 24px;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  pointer-events: none;
  user-select: none;

  .help {
    display: flex;
    align-items: center;
    gap: 18px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
  }

  .help-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.35);
  }

  .kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 26px;
    height: 22px;
    padding: 0 6px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 11px;
    font-weight: 600;
    color: #fff;
  }

  .brand {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.5px;
  }

  .brand .accent {
    color: rgb(${props => props.theme.accentColor || '227, 32, 59'});
    font-weight: 700;
  }
`;

export const FlexWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  > div {
    width: 100%;
  }
`;

export const Container = styled.div``;
