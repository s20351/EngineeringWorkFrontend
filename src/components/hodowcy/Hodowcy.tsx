import styled from '@emotion/styled'

const H1 = styled.h1(
  {
    fontSize: 17
  },
  props => ({ color: props.color })
)

function Hodowcy(){
  return (
        <H1>"hello from hodowcy"</H1>
  );
};

export { Hodowcy };
