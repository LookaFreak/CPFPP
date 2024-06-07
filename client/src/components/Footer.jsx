import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { social_media } from "../data/data";

const Footer = ({ dark }) => {
  return (
    <footer className={`${dark ? "bg-dark" : "bg-light"} footer`}>
      <div className="footer-container">
        <div className="detail text-white">
          <img src={logo} alt="" style={{ width: "13rem", height: "10rem" }} />
          <div className="text-content">
            <span className="title">Pazzo Palermo</span>
            <p>
              Codice fiscale e partita IVA 05535750870{" "}
              <span className="underline">Privacy Policy</span>-
              <span className="underline">Cookie Policy</span>
            </p>
            <p>
              Creato, concepito e gestito da Alessandro Camarda
            </p>
            <p className="copyRight text-white">
              Copyright 2025 Pazzo Palermo Tutti i diritti riservati
            </p>
          </div>
        </div>
        <div className="main">
          <div className="socials">
            {social_media.map((social) => (
              <a
                key={social.link}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icons text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-end text-white fw-bold"></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

