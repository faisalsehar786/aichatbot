import React, { useState, useEffect, useRef } from "react";
import { getEngines } from "@/components/getEngines";
import { useUser } from "@/lib/store/user";
import { useTheme } from "@/context/ThemeContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";

const ModelDropDown = () => {
  const dropdownRef = useRef(null);
  const { setModel, ai_model } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useUser((state) => state.user);
  // Function to fetch data from backend API
  const fetchData = async () => {
    if (user) {
      const { data } = await getEngines(user?.ai_key);
      setOptions(data);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setModel(option);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    // You can implement filtering logic here if needed
  };

  return (
    <Popover>
      <PopoverTrigger>
        <button
          onClick={() => toggleDropdown()}
          type="button"
          className="btn btn-sm  btn-light btn-active-light-primary me-3"
        >
          <i className="ki-duotone ki-abstract-32 fs-2 text-primary ">
            <span className="path1" />
            <span className="path2" />
          </i>

          {ai_model ? ai_model : " Models"}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className={` ${
          isOpen ? "d-block" : "d-none"
        } space-y-3 divide-y p-2  border-0 menu menu-sub menu-sub-dropdown menu-column menu-rounded px-1 menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 `}
        side="bottom"
      >
        <div className=" ">
          <input
            type="text"
            className="search-input form-control form-control-solid ps-13 h-35px"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div
            style={{
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {options
              .filter((option) =>
                option?.id?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((option, index) => (
                <div
                  className=" menu-item px-5 my-4 cursor-pointer"
                  onClick={() => handleSelectOption(option?.id)}
                  key={index}
                >
                  <div className="d-flex align-items-center flex-wrap">
                    <i className="ki-duotone ki-abstract-32 fs-2 text-primary me-3">
                      <span className="path1" />
                      <span className="path2" />
                    </i>{" "}
                    <span className="text-gray-600">{option?.id}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ModelDropDown;
