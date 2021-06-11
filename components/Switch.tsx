import React from "react";
import ReactSwitch from "react-switch";

interface Props {
  checked: boolean;
  handleChange: (nextChecked: boolean) => void;
}

const Switch: React.FC<Props> = ({ checked, handleChange }) => {
  return (
    <label htmlFor="small-radius-switch">
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
        handleDiameter={28}
        offColor="#08f"
        onColor="#0ff"
        offHandleColor="#0ff"
        onHandleColor="#08f"
        height={40}
        width={70}
        borderRadius={15}
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
              color: "orange",
              paddingRight: 2,
            }}
          >
            Off
          </div>
        }
        checkedIcon={
          <svg viewBox="0 0 10 10" height="100%" width="100%" fill="yellow">
            <circle r={3} cx={5} cy={5} />
          </svg>
        }
        uncheckedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 20,
            }}
          >
            ☹
          </div>
        }
        checkedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "red",
              fontSize: 18,
            }}
          >
            ♥
          </div>
        }
      />
    </label>
  );
};

export default Switch;
