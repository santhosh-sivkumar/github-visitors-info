import React from "react";

const LoadingComponent = (props) => {
  return (
    <>
      <tbody style={{ height: "500px" }}>
        <tr>
          <td colSpan={props.columns.length}>
            <div className="flex justify-center items-center h-full">
              <div
                className="spinner-border text-primary text-black"
                role="status"
              >
                <span className="">{props.children}</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default LoadingComponent;
