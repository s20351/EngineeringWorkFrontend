import styled from '@emotion/styled'

const H1 = styled.h1(
  {
    fontSize: 17
  },
  props => ({ color: props.color })
)

function Indos(){
    return (
          <H1>"hello from indos"</H1>
    );
  };
  
  export { Indos };