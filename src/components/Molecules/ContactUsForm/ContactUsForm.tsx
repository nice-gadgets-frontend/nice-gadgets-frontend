import { useState } from 'react';

export const ContactUsForm = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const onChangeInputHandle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccess(false);
  };

  const onSubmitHandle = (e: React.FormEvent) => {
    setSuccess(false);

    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.subject) newErrors.subject = 'Subject is required';
    if (!form.message) newErrors.message = 'Message is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSuccess(true);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-[Mont-SemiBold] text-white mb-4">
        Send Us a Message
      </h2>
      <form
        className="space-y-6"
        onSubmit={onSubmitHandle}
      >
        <div>
          <label className="block text-sm font-[Mont-Regular] text-[#cdced2] mb-1">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
            placeholder="John Smith"
            onChange={onChangeInputHandle}
          />
          {errors.name && (
            <span className="text-red-500 text-xs font-[Mont-Regular]">
              {errors.name}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-[Mont-Regular] text-[#cdced2] mb-1">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
            placeholder="you@example.com"
            onChange={onChangeInputHandle}
          />
          {errors.email && (
            <span className="text-red-500 text-xs font-[Mont-Regular]">
              {errors.email}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-[Mont-Regular] text-[#cdced2] mb-1">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
            placeholder="Inquiry about a product"
            onChange={onChangeInputHandle}
          />
          {errors.subject && (
            <span className="text-red-500 text-xs font-[Mont-Regular]">
              {errors.subject}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-[Mont-Regular] text-[#cdced2] mb-1"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            rows={6}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
            placeholder="Type your message here..."
            onChange={onChangeInputHandle}
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-xs font-[Mont-Regular]">
              {errors.message}
            </span>
          )}
        </div>
        {success && (
          <div className="text-accent text-sm font-[Mont-SemiBold] mb-2">
            Your message was sent successfully!
          </div>
        )}
        <button
          type="submit"
          className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-accent hover:bg-[#a378ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6A0DAD] transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
