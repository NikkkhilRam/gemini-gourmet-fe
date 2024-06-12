import React from "react";
import { ImSpoonKnife } from "react-icons/im";
import { FaLeaf } from "react-icons/fa";
import { GiWeightScale } from "react-icons/gi";
import { LuAlarmClock } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";

function RecipeResult({
  recipe,
  cuisine,
  dietary,
  calories,
  cookingTime,
  servingSize,
  showVideo,
}) {
  const lines = recipe.split("\n");

  const sections = [];
  let currentSection = { title: "", content: [] };

  lines.forEach((line) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      if (currentSection.title) {
        sections.push(currentSection);
      }
      currentSection = { title: line.replace(/\*\*/g, ""), content: [] };
    } else if (line.trim()) {
      currentSection.content.push(line);
    }
  });

  if (currentSection.title) {
    sections.push(currentSection);
  }

  return (
    <div className="mt-6 sm:mx-0 mx-4 p-4 border rounded bg-gray-700">
      <div className="mb-2 flex gap-2">
        {cuisine !== "" && (
          <div className="flex rounded-full bg-white items-center text-gray-800 px-3 gap-2 ">
            <h2 className="text-md font-semibold  ">{cuisine}</h2>
            <ImSpoonKnife size={14} />
          </div>
        )}
        {dietary !== "" && (
          <div className="flex rounded-full bg-white items-center text-gray-800 px-3 gap-2 ">
            <h2 className="text-md font-semibold  ">{dietary}</h2>
            <FaLeaf />
          </div>
        )}
        {calories !== "" && (
          <div className="flex rounded-full bg-white items-center text-gray-800 px-3 gap-2 ">
            <h2 className="text-md font-semibold ">{`${calories} Kcal`}</h2>
            <GiWeightScale />
          </div>
        )}
        {cookingTime !== "" && (
          <div className="flex rounded-full bg-white items-center text-gray-800 px-3 gap-2 ">
            <h2 className="text-md font-semibold  ">{`${cookingTime} min`}</h2>
            <LuAlarmClock />
          </div>
        )}
        {servingSize !== "" && (
          <div className="flex rounded-full bg-white items-center text-gray-800 px-3 gap-2 ">
            <h2 className="text-md font-semibold ">{`${servingSize} Pax`}</h2>
            <FaPeopleGroup />
          </div>
        )}
      </div>
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-white">
            {section.title}
          </h2>
          {section.content.map((line, idx) => (
            <p key={idx} className="mb-1 text-white">
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default RecipeResult;
