
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {API} from "../services/api"
import { useDispatch } from "react-redux";
import { addApartment } from "../slice/apartmentSlice";

// ------------------ ZOD SCHEMA ------------------
const apartmentSchema = z.object({
  title: z.string().min(2),

  price: z.number().min(1, "Price is required"),

  city: z.string().min(2),
  area: z.string().min(2),

   noOfFlats: z.number().optional(),
  description: z.string().optional(),

  ownerName: z.string().min(2),
  contactNumber: z.string().min(10),
  email: z.string().email(),

  image: z.any().refine((files) => files?.length > 0, "Image is required"),
});

type ApartmentForm = z.infer<typeof apartmentSchema>;

const CreateApartment: React.FC = () => {
const dispatch = useDispatch();

 const { register, handleSubmit, reset, formState: { errors } } =
  useForm<ApartmentForm>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: {
      title: "",
      price: 0,
      city: "",
      area: "",
      noOfFlats: 0,
      description: "",
      ownerName: "",
      contactNumber: "",
      email: "",
    },
  });


   const onSubmit = async (data: ApartmentForm) => {
    
  console.log("FORM DATA:", data);

  try {
    
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", String(data.price));
    formData.append("city", data.city);
    formData.append("area", data.area);
    formData.append("noOfFlats", String(data.noOfFlats ?? ""));
    formData.append("description", data.description || "");
    formData.append("ownerName", data.ownerName);
    formData.append("contactNumber", data.contactNumber);
    formData.append("email", data.email);
  formData.append("image", data.image[0]);  



    const res = await API.post("/apartments/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
   
      },
        withCredentials: true, 
    });
    
    dispatch(addApartment(res.data.data));
  

    alert("Apartment Created Successfully!");
    reset();
  } catch (error) {
    console.log("Error:", error);
    alert("Failed to create apartment");
  }
};
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">Create New Apartment</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Apartment Name */}
        <input
          type="text"
          placeholder="Apartment Name"
          {...register("title")}
          className="border px-4 py-2 rounded w-full mt-1"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title?.message}</p>}

        {/* Price */}
        <div>
       <input
  type="number"
  placeholder="Price"
  {...register("price",{ valueAsNumber: true })}
  className="border px-4 py-2 rounded w-full mt-1"
/>
         {errors.price && (
  <p className="text-red-500 text-sm">
    {errors.price?.message}
  </p>
)}
          
        </div>

        {/* City & area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="City"
            {...register("city")}
            className="border px-4 py-2 rounded w-full mt-1"
          />

          <input
            type="text"
            placeholder="area"
            {...register("area")}
            className="border px-4 py-2 rounded w-full mt-1"
          />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        {errors.area && (
          <p className="text-red-500 text-sm">{errors.area.message}</p>
        )}
        </div>
      
       
        {/* No of Flats */}
        <input
          type="number"
          placeholder="No of Flats"
          {...register("noOfFlats", { valueAsNumber: true })}
          className="border px-4 py-2 rounded w-full mt-1"
        />
          {errors.noOfFlats && (
          <p className="text-red-500 text-sm">{errors.noOfFlats.message}</p>
        )}

        {/* Main Image */}
   <div className="flex flex-col gap-2">
          <label className="font-medium">Main Image:</label>
          <input type="file" {...register("image")}  className="mt-2"/>
          {errors.image && (
            <p className="text-red-500 text-sm">{typeof errors.image?.message === "string" ? errors.image.message : ""}</p>
          )}
        </div> 

        {/* Description */}
        <textarea
          placeholder="Description"
          {...register("description")}
          className="border px-4 py-2 rounded w-full mt-1"
          rows={3}
        />
 {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
       {/* Owner Details */}
<div className="flex gap-2 w-full">

  {/* Owner Name */}
  <div className="flex-1">
    <input
      type="text"
      placeholder="Owner Name"
      {...register("ownerName")}
      className="border px-4 py-2 rounded w-full mt-1"
    />
    {errors.ownerName && (
      <p className="text-red-500 text-sm">{errors.ownerName.message}</p>
    )}
  </div>

  {/* Contact Number */}
  <div className="flex-1">
    <input
      type="text"
      placeholder="Contact Number"
      {...register("contactNumber")}
      className="border px-4 py-2 rounded w-full mt-1"
    />
    {errors.contactNumber && (
      <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>
    )}
  </div>

  {/* Email */}
  <div className="flex-1">
    <input
      type="email"
      placeholder="Email"
      {...register("email")}
      className="border px-4 py-2 rounded w-full mt-1"
    />
    {errors.email && (
      <p className="text-red-500 text-sm">{errors.email.message}</p>
    )}
  </div>

</div>
   
         
        {/* Submit Button */}
       
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Apartment
          </button>
     
      </form>
    </div>
  );
};

export default CreateApartment;