import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="nav_bar">
        <h2 className="title">Agro-input</h2>
        <div className="nav_bar nav_link">
          {/* <h3>Fertilizers</h3>
          <h3>Seeds</h3> */}
          <Link to="/login">
            <div className="button">Login</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
