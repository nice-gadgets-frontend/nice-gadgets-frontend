import { useRef } from 'react';
import { useUserStore } from '../../../../services/useStore/useUserStore';

const randomPages = [
  'https://send.monobank.ua/jar/9sUDBwtQRL',
  'https://send.monobank.ua/jar/FkAqmGUWT',
  'https://send.monobank.ua/jar/2rNbLUsugH',
  'https://send.monobank.ua/jar/7xge81rhf6',
];

export const ThankYouPage = () => {
  const user = useUserStore((state) => state.user);
  const randomPathRef = useRef(
    randomPages[Math.floor(Math.random() * randomPages.length)],
  );

  const handleSupportClick = () => {
    window.open(randomPathRef.current, '_blank', 'noopener,noreferrer');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="shadow-2xl inset-shadow-sm bg-[var(--color-surface-1)] border-[var(--color-secondary)] shadow-xl rounded-lg p-10 max-w-2xl w-full">
        <svg
          className="mx-auto h-24 w-24 text-[var(--color-accent)] mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        {user ?
          <h1 className="text-4xl md:text-5xl font-[Mont-Bold] mb-4 text-[var(--color-primary)]">
            Thank You for Your Purchase, {user?.firstName}!
          </h1>
        : <h1 className="text-4xl md:text-5xl font-[Mont-Bold] mb-4 text-[var(--color-primary)]">
            Thank You for Your Purchase!
          </h1>
        }
        <p className="text-xl md:text-2xl text-[var(--color-primary)]/70 font-[Mont-regular] mb-8 leading-relaxed">
          We appreciate your order and will contact you shortly with
          confirmation and tracking details.
        </p>

        <div className="bg-[var(--color-accent)]/20 p-6 rounded-lg mb-8 border-[var(--color-primary)]">
          <h2 className="text-2xl font-[Mont-Bold] text-[var(--color-primary)] mb-3">
            A Special Note of Gratitude
          </h2>
          <p className="text-lg text-[var(--color-primary)]/75 font-[Mont-Regular] leading-relaxed mb-5">
            Right now, we take a moment to extend our deepest gratitude to the
            brave soldiers who protect our country every day on the frontlines.
            Their courage and sacrifice make it possible for us to live, work,
            and build a future.
          </p>
          <span className="text-2xl font-[Mont-Bold] text-[var(--color-accent)]">
            Thank you, defenders of Ukraine!
          </span>
        </div>

        <p className="text-xl text-[var(--color-primary)]/70 font-[Mont-Regular] mb-6">
          To support our army, please click the button below. A new tab will
          open with the fundraising page, and this tab will return to our
          homepage.
        </p>

        <button
          onClick={handleSupportClick}
          className="bg-[var(--color-accent)]/20 hover:bg-[var(--color-accent)] cursor-pointer shadow-sm inset-shadow-sm text-[var(--color-primary)] font-[Mont-Bold] py-3 px-6 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Support Our Army & Go to Homepage
        </button>

        <p className="text-md text-[var(--color-primary)]/55 font-[Mont-Regular] mt-4">
          Alternatively, you can click here:{' '}
          <a
            href={randomPathRef.current}
            className="text-blue-400 hover:underline font-[Mont-Regular]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fundraising Page
          </a>
        </p>
      </div>
    </div>
  );
};
