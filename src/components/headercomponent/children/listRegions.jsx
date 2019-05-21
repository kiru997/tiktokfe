import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../../context/GlobalContext";
import { setCurrentRegion } from "../../../actions/region";
const ListRegions = props => {
  const context = useContext(GlobalContext);
  const { actChangeRegion } = context;
  return props.regions.map((region, index) => {
    return (
      <Link
        onClick={() => {
          props.onChangeRegion(region.region);
          setCurrentRegion(region.code);
          actChangeRegion(region.code);
        }}
        to={`/${region.code}`}
        key={index}
        className="region-item"
      >
        {region.region}
      </Link>
    );
  });
};
export default ListRegions;
