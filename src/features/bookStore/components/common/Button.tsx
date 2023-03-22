import styled from 'styled-components';

interface ButtonProps {
  margin?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  backgroundColor?: string;
  onClick: () => void;
  children: string;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '30px'};
  border-radius: ${(props) => props.borderRadius || '4px'};
  background-color: ${(props) => props.backgroundColor || 'white'};
  margin: ${(props) => props.margin || ''};
  cursor: pointer;
  opacity: 0.8;
`;

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...restPops } = props;
  return <StyledButton {...restPops}>{children}</StyledButton>;
};
