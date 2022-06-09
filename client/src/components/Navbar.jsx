import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined, LogoutIcon } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobil, mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/userSlice';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: felx;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  aligh-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-right: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>English</Language>
          <SearchContainer>
            <Input placeholder='search' />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>PrimeTechLogo</Logo>
        </Center>
        <Right>
          {currentUser ? (
            <>
              <MenuItem>
                welcome {currentUser.user.firstname.toUpperCase()}
              </MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </>
          ) : (
            <>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to='/register'
              >
                <MenuItem>Register</MenuItem>
              </Link>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to='/login'
              >
                <MenuItem>Sign In</MenuItem>
              </Link>
            </>
          )}
          <Link to='/cart'>
            <MenuItem>
              <Badge badgeContent={quantity} color='primary'>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
