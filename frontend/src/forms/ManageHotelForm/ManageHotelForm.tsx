import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
export type HotelFormData={
    name:string;
    city:string;
    country:string;
    description:string;
    type:string[];
    pricePerNight:number;
    starRating:number;
    facilites:string[],
    imageFiles:FileList;
    adultCount:number;
    childcount:number;
}


const ManageHotelForm = () => {
    const formMethods=useForm<HotelFormData>();
    const{handleSubmit}=formMethods;

    /*const onSubmit=handleSubmit((formData:HotelFormData)=>{
      alert("aubmit Button Clicked");
      console.log(formData);
      
    })*/
    const onSubmit = (data: HotelFormData) => {
      alert("Form submitted!");
      console.log(data);
    };

  return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={formMethods.handleSubmit(onSubmit)}>
            <DetailsSection />
            <TypeSection />
            <FacilitesSection />
            <GuestsSection />
            <ImagesSection />
            <span className="flex justify-end">
              <button type="submit" className="bg-green-600 rounded-md text-white p-2 text-xl font-bold hover:bg-green-400">Save</button>

            </span>
        </form>
    </FormProvider>
  )

}
export default ManageHotelForm;
