import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Semester() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
    navigate(`/sem/${semester.value}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const semesters = [
    { value: "sem5", label: "Semester 5" },
    { value: "sem6", label: "Semester 6" },
    { value: "sem7", label: "Semester 7" },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <h1 className="m-5">Select Your Semester</h1>
      <div>
        <button
          type="button"
          className="bg-amber-50 w-full "
          id="semester-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {"Select Semester"}
          <svg
            className=" ml-[330px] h-10 w-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute mt-2 w-56 rounded-md ring-black"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="semester-menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {semesters.map((semester) => (
              <button
                key={semester.value}
                onClick={() => handleSemesterClick(semester)}
                className="block w-full text-center px-4 py-2 text-sm text-amber-50 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id={`semester-menu-item-${semester.value}`}
              >
                {semester.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Semester;
