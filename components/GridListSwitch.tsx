import React from "react";
import ReactSwitch from "react-switch";
import { HiViewList, HiViewGrid } from "react-icons/hi";

interface Props {
  checked: boolean;
  handleChange: (nextChecked: boolean) => void;
}

const commonIconStyles = (fontSize: number) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  fontSize,
  color: "black",
});

const GridIcon = ({ fontSize }) => (
  <div style={commonIconStyles(fontSize)}>
    <HiViewGrid />
  </div>
);

const ListIcon = ({ fontSize }) => (
  <div style={commonIconStyles(fontSize)}>
    <HiViewList />
  </div>
);

const GridListSwitch: React.FC<Props> = ({ checked, handleChange }) => {
  return (
    <ReactSwitch
      checked={checked}
      onChange={handleChange}
      offColor="#86d3ff"
      onColor="#86d3ff"
      borderRadius={2}
      uncheckedIcon={<GridIcon fontSize={15} />}
      checkedIcon={<ListIcon fontSize={15} />}
      uncheckedHandleIcon={<ListIcon fontSize={20} />}
      checkedHandleIcon={<GridIcon fontSize={20} />}
      boxShadow="0 4px 12px 0px rgba(0,0,0,.25)"
      activeBoxShadow="0 4px 12px 0px rgba(0,0,0,.25)"
    />
  );
};

export default GridListSwitch;
