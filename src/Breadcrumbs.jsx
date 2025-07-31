import { useLocation, Link } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <nav style={{ marginBottom: "1rem" , position: "absolute" , top: "10px" , left: "10px"}} >
      <span>
        <Link to="/">Main</Link>
      </span>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <span key={to}>
            {" / "}
            <Link to={to}>{decodeURIComponent(value)}</Link>
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;