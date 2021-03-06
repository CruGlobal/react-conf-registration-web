import React, { useState } from "react";
import styled from "@emotion/styled";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../../../actions";
import LoginModal from "./Subcomponents/LoginModal";
import DropDownButton from "./Subcomponents/DropdownButton";

const Navbar = ({ profile, loginState, userLogout }) => {
  const DashboardButton = styled.button`
    width: ${loginState ? "auto" : "180px"};
    height: 35px;
    font-size: 14px;
    color: #3494c6;
    padding: 6px 12px;
    border-radius: ${loginState ? "0px" : "5px"};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    text-transform: uppercase;
    border: 1px solid transparent;
    border-color: #ccc;
    background: #ffffff;
    :hover {
      cursor: pointer;
      background-color: #e6e5e5;
    }
  `;

  const [show, changeShow] = useState(false);

  return (
    <NavBarContainer>
      <NavBar>
        <MainHeadingContainer to="/">
          <FontAwesomeIcon icon={faUsers} size="3x" />
          <NavBarTitle>Event Registration Tool</NavBarTitle>
        </MainHeadingContainer>
        <ButtonContainer>
          {loginState ? (
            <>
              <DashboardButton data-testid="signed-in-title">
                Hello <strong>{profile.firstName}</strong>
              </DashboardButton>
              <StyledDropDownButton userLogout={userLogout} />
            </>
          ) : (
            <>
              <DashboardButton
                data-testid="unsigned-in-title"
                onClick={() => changeShow(true)}
              >
                EVENT DASHBOARD
              </DashboardButton>
              <LoginModal show={show} changeShow={changeShow} />
            </>
          )}
        </ButtonContainer>
      </NavBar>
    </NavBarContainer>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.authenticationReducer.profile,
    loginState: state.authenticationReducer.loginState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => {
      dispatch(userLogout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

const NavBarContainer = styled.header`
  width: 100%;
  background: #3494c6;
  color: #ffffff;
  display: flex;
  justify-content: center;
  border-bottom: 7px solid #2b86b7;
`;

const NavBar = styled.nav`
  width: 1170px;
  height: 75px;
  background: #3494c7;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const StyledDropDownButton = styled(DropDownButton)`
  border: 1px solid transparent;
  border-color: #2f84cd;
  :hover {
    border-color: #2969a0;
  }
`;

const MainHeadingContainer = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ffffff;
  :hover {
    color: #ffffff;
    text-decoration: none;
  }
`;

const NavBarTitle = styled.h3`
  font-size: 36px;
  text-decoration: none;
  margin: 0 10px;
`;
