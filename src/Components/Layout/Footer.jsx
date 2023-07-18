import React from "react";
import colorScheme from '../Colors/Styles.js';


const Footer = () => {
  return (
    <>
      <footer
        className="main-footer"
        style={{
          background: colorScheme.card_bg_color,
          color: colorScheme.card_txt_color,
          border: "none",
          marginTop: "7rem",
        }}
      >
        {/* To the right */}
        <div className="float-right d-none d-sm-inline">
          {/* Anything you want */}
        </div>
        <strong>
          Copyright © 2022-onwards &nbsp;
          <a href="#w">Alphanites</a>. &nbsp;
        </strong>{" "}
        All rights reserved.
        {/* Default to the left */}
      </footer>
    </>
  );
};

export default Footer;
