import styled from '@emotion/styled'

const H1 = styled.h1(
  {
    fontSize: 17
  },
  props => ({ color: props.color })
)

function Hodowla(){
  return (
        <H1>"hello from hodowla"</H1>
  );
};

export { Hodowla };
