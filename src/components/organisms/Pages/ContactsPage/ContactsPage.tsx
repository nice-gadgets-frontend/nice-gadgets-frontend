import { useState, useEffect } from 'react';
import { ContactUsForm } from '../../../Molecules/ContactUsForm/ContactUsForm';

export const ContactsPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    console.warn(
      "Need to file a complaint? We recommend starting with 'The dev team is too awesome!'",
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen px-4 sm:px-6 xl:px-0 xl:max-w-[1200px] mx-auto">
      <h1 className="text-5xl font-[Mont-Bold] text-center text-white mb-12 animate-fade-in-down">
        Contact Us
      </h1>
      <div className="grid grid-cols-4 sm:grid-cols-12 xl:grid-cols-24 gap-x-4 gap-y-4 bg-[#20233d] shadow-xl rounded-lg p-4 sm:p-6 xl:p-8">
        <div className="col-span-4 sm:col-span-6 xl:col-span-12 space-y-6">
          {loading ?
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-[#3a3f5a] w-2/3 rounded"></div>
              <div className="h-5 bg-[#3a3f5a] w-full rounded"></div>
              <div className="h-5 bg-[#3a3f5a] w-3/4 rounded"></div>
              <div className="h-5 bg-[#3a3f5a] w-1/2 rounded"></div>
              <div className="h-5 bg-[#3a3f5a] w-1/3 rounded"></div>
            </div>
          : <>
              <h2 className="text-3xl font-[Mont-SemiBold] text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-[#cdced2] leading-relaxed">
                We&apos;re here to help you find the perfect phone and
                accessories! Feel free to reach out to us with any questions,
                concerns, or feedback.
              </p>

              <div>
                <h3 className="text-xl font-[Mont-SemiBold] text-white mb-2">
                  Our Store Location:
                </h3>
                <p className="text-[#cdced2]">Nice Gadgets Store</p>
                <p className="text-[#cdced2]">Zhylianska St, 75</p>
                <p className="text-[#cdced2]">Kyiv, 02000</p>
              </div>

              <div>
                <h3 className="text-xl font-[Mont-SemiBold] text-white mb-2">
                  Contact Us:
                </h3>
                <p className="text-[#cdced2]">
                  <strong>Sales & General Inquiries:</strong> +1 (555) 123-4567
                </p>
                <p className="text-[#cdced2]">
                  <strong>Customer Support & Technical Help:</strong> +1 (555)
                  987-6543
                </p>
                <p className="text-[#cdced2]">
                  <strong>Business Partnerships:</strong> +1 (555) 234-5678
                </p>
              </div>
              <div>
                <p className="text-[#cdced2]">
                  <strong>General Inquiries:</strong> info@nicegadgets.com
                </p>
                <p className="text-[#cdced2]">
                  <strong>Sales Department:</strong> sales@nicegadgets.com
                </p>
                <p className="text-[#cdced2]">
                  <strong>Customer Support:</strong> support@nicegadgets.com
                </p>
              </div>

              <div>
                <h3 className="text-xl font-[Mont-SemiBold] text-white mb-2">
                  Operating Hours:
                </h3>
                <p className="text-[#cdced2]">
                  <strong>Monday - Friday:</strong> 9:00 AM - 7:00 PM EEST
                </p>
                <p className="text-[#cdced2]">
                  <strong>Saturday:</strong> 10:00 AM - 5:00 PM EEST
                </p>
                <p className="text-[#cdced2]">
                  <strong>Sunday:</strong> Closed
                </p>
              </div>
            </>
          }
        </div>

        <div className="col-span-4 sm:col-span-6 xl:col-span-12">
          {loading ?
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-[#3a3f5a] w-2/3 rounded"></div>
              <div className="h-12 bg-[#3a3f5a] w-full rounded"></div>
              <div className="h-12 bg-[#3a3f5a] w-full rounded"></div>
              <div className="h-24 bg-[#3a3f5a] w-full rounded"></div>
              <div className="h-10 bg-[#3a3f5a] w-1/2 rounded"></div>
            </div>
          : <ContactUsForm />}
        </div>
      </div>
      <div className="mt-12 bg-[#20233d] shadow-xl rounded-lg p-4 sm:p-6 xl:p-8 xl:max-w-[1200px] max-h-[600px] mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Find Us on the Map
        </h2>
        <div className="aspect-[16/9]">
          {loading ?
            <div className="w-full h-full bg-[#3a3f5a] rounded-lg animate-pulse"></div>
          : <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.1158959623394!2d30.496192577524035!3d50.4389418881911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cefaf1ebc81f%3A0xed482dcdab9f23ad!2sMate%20academy!5e0!3m2!1sen!2sua!4v1752409310185!5m2!1sen!2sua"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NiceGadgets Store Location"
              className="rounded-lg"
            ></iframe>
          }
        </div>
      </div>
    </div>
  );
};
