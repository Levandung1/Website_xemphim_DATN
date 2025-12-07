import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url('https://assets.nflxext.com/ffe/siteui/vlv3/...jpg') no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  width: 400px;
  padding: 40px;
  background-color: rgba(0,0,0,0.75);
  border-radius: 8px;
`;

export const Title = styled.h2`
  color: #fff;
  margin-bottom: 25px;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  border: none;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #e50914;
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background: #f6121d;
  }
`;

export const Link = styled.p`
  color: #737373;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
