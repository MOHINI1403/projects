/*import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
const TypeSection = () => {
  const { register,watch} = useFormContext();
  const typeWatch=watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3"> Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type)=>(
            <label className={
              typeWatch===type ? "cursor-pointer bg-green-300 text-sm rounded-full px-4 py-2 font-semibold" : "cursor pointer bg-gray-200 text-sm rounded-full px-4 py-2 font-semibold"
            }>
                <input type="radio" value={type} {...register("type",{
                    required:"This field is required",
                })} />
                <span>{type}</span>
            </label>
        ))}
      </div>
    </div>
  );
};
export default TypeSection;
*/
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection= () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else if (selectedTypes.length < 5) {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const isErrorVisible = selectedTypes.length === 0 && errors.type; // Check if error should be visible

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="mb-3">
        {selectedTypes.map((type) => (
          <span
            key={type}
            className="inline-block bg-green-300 text-sm rounded-full px-4 py-2 mr-2 mb-2"
          >
            {type}
            <button
              className="ml-2"
              onClick={() => setSelectedTypes(selectedTypes.filter((t) => t !== type))}
            >
              Remove
            </button>
          </span>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              selectedTypes.includes(type)
                ? "cursor-pointer hidden"
                : "cursor-pointer bg-gray-200 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
              value={type}
              style={{ display: "none" }}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      
      <input
        type="hidden"
        value={selectedTypes}
        {...register("type", {
          required: "This field is required",
        })}
      />
      {errors.type&&isErrorVisible && (
        <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;

