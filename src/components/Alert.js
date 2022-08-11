import React from "react";

function Alerts(props) {
//   const capitalize = (word) => {
//     const lower = word.toLowerCase();
//     return lower.charAt(0).upperCase() + lower.slice(1);
//   };
  return (
    <div style={{ height: "50px" }}>

      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.type}</strong>:{props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alerts;