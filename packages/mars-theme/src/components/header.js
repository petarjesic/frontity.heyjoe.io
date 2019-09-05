import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";

const Header = ({ state }) => (
  <>
    <header>
      <div className="navbar navbar-light bg-light shadow-sm fixed-top">
        <div className="container d-flex justify-content-between">
          <a href="#" className="navbar-brand d-flex align-items-center">
            <img width="95" src="https://heyjoe.io/wp-content/uploads/2019/06/cropped-heyjoe.png" />
          </a>
        </div>
      </div>
    </header>
  </>
);

export default connect(Header);

const Container = styled.div`
  width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 16px;
`;

const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
