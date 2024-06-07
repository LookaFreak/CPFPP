import React from "react";

const Banner = ({ dark }) => {
  return (
    <section id="offers" class="py-5" href="https://pazzopalermo.printify.me/products">
      <div className="containers">
        <div className={`content-text ${dark ? "lightmood" : "darkmood"}`}>
        <button className="btn"><a className="shop" href="https://pazzopalermo.printify.me/products">CLICCA QUI</a> </button>
          {/* <h3>SUPPORTA LA COMMUNITY</h3> */}
          
        </div>
      </div>
    </section>
  );
};

export default Banner;
