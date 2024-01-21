import menuImg from "../../images/menu-img.jpg";
import styles from "../styles.css";

import Navigation from "./Navigation";

function Menu() {
  return (
    <div className="menu-container">
      <img className="menu-img" src={menuImg} alt="Man with a bike"></img>
      <Navigation />
    </div>
  );
}
export default Menu;
