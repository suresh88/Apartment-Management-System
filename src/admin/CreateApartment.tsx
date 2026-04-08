import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addApartment } from "../slice/apartmentSlice";

// ------------------ ZOD SCHEMA ------------------
const apartmentSchema = z.object({
  title: z.string().min(2, "Apartment Name is required"),

  bhkPrices: z.object({
    "1 BHK": z.string().nonempty("1 BHK price is required"),
  }),

  city: z.string().min(2, "City is required"),
  town: z.string().min(2, "Town is required"),

  noOfFlats: z.string().optional(),
  description: z.string().optional(),

  ownerName: z.string().min(2, "Owner name is required"),
  ownerMobile: z.string().min(10, "Invalid mobile number"),
  ownerEmail: z.string().email("Invalid email"),

  mainImage: z
    .any()
    .refine((file) => file?.length > 0, "Main image is required"),
});

// ------------------ COMPONENT ------------------
const CreateApartment = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(apartmentSchema),
    defaultValues: {
      title: "",
      bhkPrices: { "1 BHK": "" },
      city: "",
      town: "",
      noOfFlats: "",
      description: "",
      ownerName: "",
      ownerMobile: "",
      ownerEmail: "",
      mainImage: null,
    },
  });

  const onSubmit = (data) => {
    const apartmentData = {
      ...data,
      mainImage: data.mainImage[0], // File convert
    };

    dispatch(addApartment(apartmentData));
    alert("Apartment Created Successfully!");
    reset();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Apartment</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Apartment Name */}
        <input
          type="text"
          placeholder="Apartment Name"
          {...register("title")}
          className="border px-4 py-2 rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        {/* 1 BHK Price */}
        <div>
          <input
            type="text"
            placeholder="1 BHK Price"
            {...register("bhkPrices.1 BHK")}
            className="border px-4 py-2 rounded w-full"
          />
          {errors.bhkPrices?.["1 BHK"] && (
            <p className="text-red-500">
              {errors.bhkPrices["1 BHK"].message}
            </p>
          )}
        </div>

        {/* City & Town */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="City"
            {...register("city")}
            className="border px-4 py-2 rounded flex-1"
          />

          <input
            type="text"
            placeholder="Town"
            {...register("town")}
            className="border px-4 py-2 rounded flex-1"
          />
        </div>
        {errors.city && (
          <p className="text-red-500">{errors.city.message}</p>
        )}
        {errors.town && (
          <p className="text-red-500">{errors.town.message}</p>
        )}

        {/* No of Flats */}
        <input
          type="number"
          placeholder="No of Flats"
          {...register("noOfFlats")}
          className="border px-4 py-2 rounded w-full"
        />

        {/* Main Image */}
        <div className="flex flex-col gap-2">
          <label>Main Image:</label>
          <input type="file" {...register("mainImage")} />
          {errors.mainImage && (
            <p className="text-red-500">{errors.mainImage.message}</p>
          )}
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          {...register("description")}
          className="border px-4 py-2 rounded"
          rows={3}
        />

        {/* Owner Details */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Owner Name"
            {...register("ownerName")}
            className="border px-4 py-2 rounded flex-1"
          />

          <input
            type="text"
            placeholder="Owner Mobile"
            {...register("ownerMobile")}
            className="border px-4 py-2 rounded flex-1"
          />

          <input
            type="email"
            placeholder="Owner Email"
            {...register("ownerEmail")}
            className="border px-4 py-2 rounded flex-1"
          />
        </div>

        {errors.ownerName && (
          <p className="text-red-500">{errors.ownerName.message}</p>
        )}
        {errors.ownerMobile && (
          <p className="text-red-500">{errors.ownerMobile.message}</p>
        )}
        {errors.ownerEmail && (
          <p className="text-red-500">{errors.ownerEmail.message}</p>
        )}

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Add Apartment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateApartment;