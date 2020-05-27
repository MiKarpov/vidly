import React from "react";

const GroupList = (props) => {
  const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item clickable active" : "list-group-item clickable"
          }>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
};

export default GroupList;
