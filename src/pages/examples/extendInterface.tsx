/*
interface FlexProps {
    bg?: string;
    border?: string;
    color?: string;
    children?: React.ReactNode;
    fontSize?: string;
    fontWeight?: string;
    height?: string;
    link?: string;
    marginLeft?: string;
    p?: string;
    position?: string;
    radius?: string
    width?: string;
    top?: number;
    zIndex?: number;
  
//color: `rgb(228,234,242)`,
const defaultProps: FlexOptionalProps = {
  // color: `rgb(237,242,247)`, //"#eee",
  bg: 'none',
  fontWeight: '600',
  fontSize: '16px',
  height: '40px',
  p: '0px', //padding
  radius: '6px'
};

const Flex: React.FC<FlexProps> = ({ 
  bg,
  border,
  // color,
  children,
  fontSize,
  fontWeight,
  height,
  marginLeft,
  p,
  width
}) => {

  let content: JSX.Element | null = null;

  content = 
        <div 
          className = "myFlex"
          style={{
            // backgroundColor: color,
            // "&:hover": {
            //     background: "#efefef"
            //   },
            backgroundColor: bg,
            border,
            fontSize,
            fontWeight,
            height,
            marginLeft, 
            minWidth: '40px',
            padding: p,
            width
          }}
        >
          {children}
        </div>
  ;

  return (
    content
  );
};

Flex.defaultProps = defaultProps;

export {Flex};
*/

export {};
