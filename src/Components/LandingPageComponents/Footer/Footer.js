import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FootContent>
        <PrivacyContainer>
          <LinkContent href="https://www.cru.org/us/en/about/privacy.html">
            Privacy Policy
          </LinkContent>
          <LinkComponentRoute to="/help">Help</LinkComponentRoute>
        </PrivacyContainer>
        <span data-testid="copyright-title">
          &copy; {currentYear} |{" "}
          <LinkContent href="http://www.cru.org">Cru</LinkContent>
        </span>
      </FootContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  padding: 22px;
  border-top: 1px solid #c7ecff;
`;

const FootContent = styled.div`
  width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PrivacyContainer = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

const LinkContent = styled.a`
  color: #337ab7;
`;

const LinkComponentRoute = styled(Link)`
  color: #337ab7;
`;
