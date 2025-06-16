"use client";

import React, { useEffect, useState } from 'react';
import { Phone, MapPin, Edit3 } from 'lucide-react';

const App = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Wait until mounted to avoid hydration mismatch

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center py-4 px-4 sm:px-6 lg:px-8">
      {/* Doctor Profile Card */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 flex flex-row items-start space-x-4 border border-gray-300">
        {/* Doctor Image */}
        <div className="flex-shrink-0 pt-0.5">
          <img
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-15/WnCED3vne4.png"
            alt="Dr. Sanket Gidmare"
            className="w-24 h-28 sm:w-32 sm:h-36 rounded-md object-cover shadow-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/98x107/CCCCCC/000000?text=Image";
            }}
          />
        </div>

        {/* Doctor Details */}
        <div className="flex flex-col justify-between flex-grow">
          <div className="text-left">
            <h2 className="text-lg sm:text-xl font-medium text-gray-900 leading-5">Dr. Sanket Gidmare</h2>
            <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-3">
              Dentist, Cosmetic/Aesthetic Dentist, Dental Surgeon
            </p>
            <p className="text-xs sm:text-sm text-gray-700 mt-0.5">MBBS, M.D.</p>
          </div>
          <div className="flex flex-row items-end justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <p className="text-xs sm:text-sm text-gray-600 sm:mr-2">10 years experience</p>
              <span className="text-xs sm:text-sm font-semibold text-gray-800">Rs 100 fees</span>
            </div>
            <button className="bg-gray-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center space-x-1 hover:bg-gray-800 transition-colors shadow-sm">
              <Edit3 size={14} />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-2 sm:p-6">
        <a href="#" className="text-blue-600 font-semibold hover:underline text-sm sm:text-base pl-1">
          Change Password / Forget password
        </a>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 pl-1">Contact</h3>
        <div className="flex items-center space-x-2 mb-2 pl-1">
          <Phone size={16} className="text-gray-600" />
          <span className="text-sm sm:text-base text-gray-700">9876543210</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 pl-1">
          <div className="flex items-start space-x-2 flex-grow mb-2 sm:mb-0">
            <MapPin size={16} className="text-gray-600 mt-0.5 sm:mt-0" />
            <p className="text-sm sm:text-base text-gray-700">Ayodhya nagar, Sakkardhara, Nagpur</p>
          </div>
          <a href="#" className="text-blue-600 font-semibold hover:underline flex items-center text-xs sm:text-sm whitespace-nowrap ml-0 sm:ml-4">
            <MapPin size={14} className="mr-1" />
            View in map
          </a>
        </div>
      </div>

      {/* Images Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 pl-1">Images</h3>
        <div className="flex items-center space-x-2 pl-1">
          {["image1", "image2"].map((img, idx) => (
            <img
              key={idx}
              src="https://media.designcafe.com/wp-content/uploads/2021/04/28110853/middle-class-indian-bedroom-design-images-with-wooden-tv-unit.jpg"
              alt={`Clinic Image ${idx + 1}`}
              className="w-11 h-7 rounded-sm object-cover shadow-sm"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://placehold.co/44x28/CCCCCC/000000?text=Err";
              }}
            />
          ))}
          <span className="text-xs sm:text-sm text-gray-600 ml-2">+8 More Photos</span>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 pl-1">Services</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-0.5 ml-4 text-xs sm:text-sm">
          <li>Root Canal Treatment.</li>
          <li>Dental Veneers.</li>
          <li>Dental crowns.</li>
          <li>Cleaning.</li>
          <li>Impacted Tooth Extraction</li>
        </ul>
      </div>

      {/* Patient Stories */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 pl-1">
          Patient Stories <span className="text-amber-500 text-xs font-semibold">(22)</span>
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 pl-1">
          These stories represent patient personal opinion and experiences. They do not directly reflect the doctor’s medical capabilities.
        </p>

        {/* Patient 1 */}
        <div className="border-t border-gray-200 pt-3 mt-3 pl-1">
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex-shrink-0 w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-xs">
              A
            </div>
            <div>
              <p className="font-medium text-gray-800 text-xs sm:text-sm">Anonymous</p>
              <p className="text-xs text-gray-500 -mt-0.5">3 years ago</p>
            </div>
          </div>
          <p className="font-medium text-gray-800 text-xs mb-1 pl-7">Visited for Stomach pain</p>
          <p className="text-xs text-gray-700 leading-snug pl-7">
            I was having severe stomach ache on Sunday 14 th Feb 21 since 4 PM. I
            consulted in Emergency clinic of the hospital at 2 AM on night of
            14th/15th. There was not much relief. Next day on 15th Feb pain ....{" "}
            <a href="#" className="text-blue-600 hover:underline">Read more</a>
          </p>
        </div>

        {/* Patient 2 */}
        <div className="border-t border-gray-200 pt-3 mt-3 pl-1">
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex-shrink-0 w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-xs">
              T
            </div>
            <div>
              <p className="font-medium text-gray-800 text-xs sm:text-sm">Tejas Bonde</p>
              <p className="text-xs text-gray-500 -mt-0.5">1.5 years ago</p>
            </div>
          </div>
          <p className="font-medium text-gray-800 text-xs mb-1 pl-7">Visited for Stomach pain</p>
          <p className="text-xs text-gray-700 leading-snug pl-7">
            I was having severe stomach ache on Sunday 14 th Feb 21 since 4 PM. I
            consulted in Emergency clinic of the hospital at 2 AM on night of
            14th/15th. There was not much relief. Next day on 15th Feb pain ....{" "}
            <a href="#" className="text-blue-600 hover:underline">Read more</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
