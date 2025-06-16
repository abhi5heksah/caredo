// components/Clinic.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Plus, ArrowLeft } from "lucide-react"; // Import ArrowLeft
import React, { useState, useRef, ChangeEvent } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Clinic(): React.JSX.Element {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // State for Address fields
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [hospitalLocationSearch, setHospitalLocationSearch] =
    useState<string>("");
  const [isLocationOn, setIsLocationOn] = useState<boolean>(false);

  // State for Image Uploads
  const [doctorImage, setDoctorImage] = useState<File | null>(null);
  const [insideClinicImages, setInsideClinicImages] = useState<File[]>([]);
  const [outsideClinicImages, setOutsideClinicImages] = useState<File | null>(
    null
  );

  // Refs for file inputs to programmatically click them
  const doctorImageInputRef = useRef<HTMLInputElement>(null);
  const insideClinicImageInputRef1 = useRef<HTMLInputElement>(null);
  const insideClinicImageInputRef2 = useRef<HTMLInputElement>(null);
  const insideClinicImageAddRef = useRef<HTMLInputElement>(null);
  const outsideClinicImageInputRef = useRef<HTMLInputElement>(null);

  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(1, prevStep - 1)); // Go back, but not below step 1
  };

  const handleSubmit = () => {
    // Show a success notification
    toast.success("Registration Successful!", {
      description: "Your clinic details and images have been submitted.",
      duration: 3000, // Show for 3 seconds
    });

    // You might want to navigate or show a success message here
    // router.push('/success-page');
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const progressSteps = [
    { id: 1, name: "About", active: currentStep === 1 },
    { id: 2, name: "Address", active: currentStep === 2 },
    { id: 3, name: "Images", active: currentStep === 3 },
  ];

  type FormField = {
    name: string;
    type: string;
    options?: string[];
    optional?: boolean;
    highlight?: boolean;
    maxLength?: number;
    pattern?: string;
    inputMode?: string;
    placeholder?: string;
  };

  const aboutFormSections: {
    title: string;
    fields: FormField[];
  }[] = [
    {
      title: "Personal Details of doctor",
      fields: [
        { name: "Name of doctor", type: "text" },
        {
          name: "Personal Mobile Number",
          type: "text",
          maxLength: 10,
          pattern: "[0-9]{10}",
          inputMode: "numeric",
        },
        {
          name: "Gender",
          type: "select",
          options: ["Male", "Female", "Other"],
        },
        {
          name: "Speciality",
          type: "select",
          options: ["Cardiology", "Dermatology", "Pediatrics", "Orthopedics"],
        },
        { name: "Education Qualification", type: "text" },
        { name: "Enter Doctor Registration Number", type: "text" },
        { name: "Year of experience", type: "number" },
      ],
    },
    {
      title: "Clinic Details",
      fields: [
        { name: "Name of Hospital/clinic", type: "text" },
        { name: "Hospital Phone Number for patient", type: "text" },
        { name: "Fees in Rs", type: "number" },
        { name: "Major Services for patient", type: "text", optional: true },
        {
          name: "Average time for one patient (in minute)",
          type: "text",
        },
      ],
    },
    {
      title: "Login details",
      fields: [
        { name: "Doctor Mobile Number", type: "text" },
        { name: "Password", type: "password" },
      ],
    },
  ];

  // Data for State and City dropdowns
  const states = ["Delhi", "Maharashtra", "Karnataka"];
  const citiesByState: { [key: string]: string[] } = {
    Delhi: ["New Delhi", "Ghaziabad", "Noida", "Faridabad"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  };

  // Handlers for image file selection
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleMultipleFilesChange = (
    event: ChangeEvent<HTMLInputElement>,
    setImages: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setImages((prevImages) => {
        // Prevent adding exact duplicate files (by name and size, simple check)
        const filteredNewFiles = newFiles.filter(
          (newFile) =>
            !prevImages.some(
              (existingFile) =>
                existingFile.name === newFile.name &&
                existingFile.size === newFile.size
            )
        );
        return [...prevImages, ...filteredNewFiles];
      });
    }
  };

  // Placeholder component for photo upload - now handles displaying selected file
  const PhotoPlaceholder = ({
    file,
    onClick,
  }: {
    file: File | null;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center w-28 h-28 border border-gray-300 border-dashed rounded-md text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
    >
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-sm">Add Photo</span>
      )}
    </div>
  );

  const AddMorePhotoPlaceholder = ({ onClick }: { onClick: () => void }) => (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center w-28 h-28 border border-gray-300 border-dashed rounded-md text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <Plus className="h-6 w-6" />
    </div>
  );

  return (
    <div className="w-full">
      <main className="w-full max-w-full md:max-w-3xl lg:max-w-full mx-auto px-4 md:px-2 lg:px-8 border">
        <div className="pt-4 pb-6 md:pt-8 lg:pt-2">
          <div className="flex items-center space-x-3">
            {/* Back button visible only from Step 2 onwards */}
            {currentStep > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <span className="text-[#2ec4b6] text-sm md:text-base lg:text-lg font-medium">
              CLINIC
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center md:my-2 lg:my-1">
          <div className="relative flex items-center w-full sm:max-w-md md:max-w-md lg:max-w-lg justify-between">
            {progressSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  className={`w-4 h-4 rounded-full ${
                    step.active ? "bg-[#ffbb00]" : "bg-[#d9d9d9]"
                  } md:w-5 md:h-5 lg:w-6 lg:h-6 focus:outline-none focus:ring-2 focus:ring-[#ffbb00] focus:ring-offset-2 transition-colors duration-200`}
                  aria-current={step.active ? "step" : undefined}
                  aria-label={`Go to ${step.name} section`}
                />
                {index < progressSteps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${
                      step.active || currentStep > step.id
                        ? "bg-[#ffbb00]"
                        : "bg-[#d9d9d9]"
                    } mx-1 md:mx-2`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between w-full sm:max-w-md md:max-w-md lg:max-w-lg mt-2">
            {progressSteps.map((step) => (
              <span
                key={step.id}
                className="text-[#6e6e6e] text-sm md:text-base lg:text-lg"
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>

        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            {currentStep === 1 && (
              // About Section
              <>
                {aboutFormSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-8 md:mb-10 lg:mb-12">
                    <h3 className="text-[#646464] text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 font-medium">
                      {section.title}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {section.fields.map((field, fieldIndex) => (
                        <div
                          key={fieldIndex}
                          className={`relative ${
                            field.highlight
                              ? "bg-yellow-50 rounded-md p-2 -m-2"
                              : ""
                          }`}
                        >
                          {field.type === "select" ? (
                            <Select>
                              <SelectTrigger className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base">
                                <SelectValue placeholder={field.name} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option, idx) => (
                                  <SelectItem
                                    key={idx}
                                    value={option
                                      .toLowerCase()
                                      .replace(/\s/g, "-")}
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : field.type === "password" ? (
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder={field.name}
                                className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base pl-3 pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                                ) : (
                                  <Eye className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <Input
                              type={field.type}
                              placeholder={field.name}
                              className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base pl-3"
                              maxLength={field.maxLength}
                              pattern={field.pattern}
                              inputMode={
                                field.inputMode as React.HTMLAttributes<HTMLInputElement>["inputMode"]
                              }
                            />
                          )}

                          {field.optional && (
                            <span className="absolute top-2 right-3 italic text-[#646464] text-xs md:text-sm">
                              *optional
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {sectionIndex < aboutFormSections.length - 1 && (
                      <Separator className="my-6 md:my-8 bg-gray-200" />
                    )}
                  </div>
                ))}
              </>
            )}

            {currentStep === 2 && (
              // Address Section
              <div className="mb-8 md:mb-10 lg:mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {/* State Dropdown */}
                  <div className="relative">
                    <Select
                      value={selectedState}
                      onValueChange={(value) => {
                        setSelectedState(value);
                        setSelectedCity(""); // Reset city when state changes
                      }}
                    >
                      <SelectTrigger className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state, idx) => (
                          <SelectItem key={idx} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City Dropdown */}
                  <div className="relative">
                    <Select
                      value={selectedCity}
                      onValueChange={setSelectedCity}
                      disabled={!selectedState}
                    >
                      <SelectTrigger className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedState &&
                          citiesByState[selectedState]?.map((city, idx) => (
                            <SelectItem key={idx} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area Input */}
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Area (e.g., Tiwari Mahal)"
                      className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base pl-3"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                </div>

                <Separator className="my-6 md:my-8 bg-gray-200" />

                {/* Location related elements with Shadcn UI Switch */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-base md:text-lg">
                      Turn ON location
                    </span>
                    <Switch
                      checked={isLocationOn}
                      onCheckedChange={setIsLocationOn}
                      aria-label="Toggle location"
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search your hospital location"
                    className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base pl-3"
                    value={hospitalLocationSearch}
                    onChange={(e) => setHospitalLocationSearch(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              // Images Section
              <div className="mb-8 md:mb-10 lg:mb-12">
                {/* Doctor Image Section */}
                <div className="mb-8">
                  <h2 className="text-lg my-3 font-semibold text-gray-800 mb-2">
                    • Doctor Image:
                  </h2>
                  <div className="flex items-center space-x-4">
                    <PhotoPlaceholder
                      file={doctorImage}
                      onClick={() => doctorImageInputRef.current?.click()}
                    />
                    <input
                      type="file"
                      ref={doctorImageInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setDoctorImage)}
                    />
                    <p className="text-red-500 text-sm italic">
                      *Only for clinic
                    </p>
                  </div>
                </div>

                {/* Clinic/Hospital Building Images Section */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    • Images of clinic/hospital building:
                  </h2>
                  <div className="mb-6">
                    <h3 className="text-base font-medium text-gray-700 mb-3">
                      Inside of clinic/hospital
                    </h3>
                    <div className="flex items-center space-x-4 flex-wrap gap-y-4">
                      {/* Dynamically render placeholders for inside images */}
                      {[...Array(1)].map((_, index) => (
                        <React.Fragment key={index}>
                          <PhotoPlaceholder
                            file={insideClinicImages[index] || null}
                            onClick={() => {
                              if (index === 0)
                                insideClinicImageInputRef1.current?.click();
                              if (index === 1)
                                insideClinicImageInputRef2.current?.click();
                            }}
                          />
                          <input
                            type="file"
                            ref={
                              index === 0
                                ? insideClinicImageInputRef1
                                : insideClinicImageInputRef2
                            }
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                setInsideClinicImages((prevImages) => {
                                  const newImages = [...prevImages];
                                  newImages[index] = files[0]; // Replace specific image
                                  return newImages;
                                });
                              }
                            }}
                          />
                        </React.Fragment>
                      ))}

                      {/* Add more photo button */}
                      {insideClinicImages.length < 5 && ( // Limit to 5 images for example
                        <AddMorePhotoPlaceholder
                          onClick={() =>
                            insideClinicImageAddRef.current?.click()
                          }
                        />
                      )}
                      <input
                        type="file"
                        ref={insideClinicImageAddRef}
                        className="hidden"
                        accept="image/*"
                        multiple // Allow multiple file selection for the '+' button
                        onChange={(e) =>
                          handleMultipleFilesChange(e, setInsideClinicImages)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-700 mb-3">
                      Outside of clinic/hospital
                    </h3>
                    <PhotoPlaceholder
                      file={outsideClinicImages}
                      onClick={() =>
                        outsideClinicImageInputRef.current?.click()
                      }
                    />
                    <input
                      type="file"
                      ref={outsideClinicImageInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(e, setOutsideClinicImages)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-8 pb-10 md:mt-10 lg:mt-12">
              <Button
                className="w-32 h-10 md:w-40 md:h-12 bg-[#ffbb00] rounded-full text-white text-base font-extrabold hover:bg-[#e6a800]"
                onClick={
                  currentStep < progressSteps.length
                    ? handleContinue
                    : handleSubmit
                }
                disabled={false}
              >
                {currentStep < progressSteps.length ? "Continue" : "Submit"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
