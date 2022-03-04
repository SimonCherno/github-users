import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { useGlobalContext } from '../context/context';

const Navbar = () => {
  const {loginWithRedirect, isAuthenticated, logout, user, isLoading} = useAuth0();
  const isUser = isAuthenticated && user
  return <Wrapper>
    {isUser && <img src={user.picture} alt={user.name}></img>}
    {isUser && <h4>welcome, <strong>{user.name}</strong></h4>}
    {isUser
      ? <button onClick={() => logout({ returnTo: window.location.origin})}>logout</button>
      : <button onClick={loginWithRedirect}>login</button> 
    }
  </Wrapper>
};

// {
//   "sub": "facebook|10225182883497968",
//   "given_name": "Simon",
//   "family_name": "Chernoivanov",
//   "nickname": "Simon Chernoivanov",
//   "name": "Simon Chernoivanov",
//   "picture": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10225182883497968&height=50&width=50&ext=1645534134&hash=AeRVFp897vILWSUXMiI",
//   "updated_at": "2022-01-23T12:48:54.485Z"
// }

// {
//   "sub": "google-oauth2|107448126536227748777",
//   "given_name": "Simon",
//   "family_name": "Chernoivanov",
//   "nickname": "simon.cherno",
//   "name": "Simon Chernoivanov",
//   "picture": "https://lh3.googleusercontent.com/a/AATXAJxBtOMb4hHcKF1vIdsId7ITwrjEVMmTcXwcpd91=s96-c",
//   "locale": "en",
//   "updated_at": "2022-01-23T12:49:56.376Z"
// }

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
