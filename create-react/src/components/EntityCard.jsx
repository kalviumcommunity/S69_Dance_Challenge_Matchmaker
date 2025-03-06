import React from "react";

const EntityCard = ({ name, description }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default EntityCard;
