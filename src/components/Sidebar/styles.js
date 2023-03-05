import styled from 'styled-components';

export const Area = styled.div`
    width: 190px;
    height: auto;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


export const AreaLogo = styled.div`
    width: 70%;
    height: auto;
    margin: 5px; 

  @media(max-width: 600px) {
    width: auto;
    height: auto;
    margin: 5px; 
    margin-bottom: 10px;
  }
`;


export const Area2 = styled.div`
  width: auto;
  height: auto;
  flex-direction: column;
  display: flex;
  align-items: center;
`;


export const AreaLogo2 = styled.div`
  width: 100px;
  height: auto;
  margin-top: 200px;
  
  @media(max-width: 1370px) {
    margin-top: 10px;
  }

  @media(max-width: 600px) {
    width: 150px;
    height: auto;
    margin-top: 10px;
  }
`;