import React from "react";

const Header = () => {
  var year = ['2020']
  return (
    <div>
      <label id="years">Select a year</label>
      <select >
        <option value={year}>{year}</option>
      </select>
    </div>
  );
}
export default Header;