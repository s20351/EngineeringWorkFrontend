import styled from '@emotion/styled'

const H1 = styled.h1(
  {
    fontSize: 17
  },
  props => ({ color: props.color })
)

function Pasza(){
    return (
          <H1>"hello from pasza"</H1>
    );
  };
  
  export { Pasza };