import { ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const backToTopHandle = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F1121] py-8 sm:py-0 h-auto sm:h-[96px] flex items-center">
      <div className="w-full px-4 sm:px-6 max-w-full mx-auto sm:max-w-[928px] xl:max-w-[1136px]">
        <div
          className="
            grid grid-cols-4 gap-y-8 gap-x-4
            items-start
            sm:grid-cols-12
            sm:gap-y-0
            sm:gap-x-4
            sm:items-center
            xl:grid-cols-24
            h-full
          "
        >
          <div className="col-span-4 justify-self-start grid items-center sm:col-span-3 xl:col-span-4">
            <img
              src="/gadgets/img/nice-gadgets-logo.png"
              alt="Logo Text"
              width={89}
              height={32}
            />
          </div>
          <div
            className="
              col-span-4 justify-self-start
              grid grid-flow-row gap-4
              font-[Mont-SemiBold] text-[12px] leading-[11px] tracking-[0.04em] uppercase text-[#F1F2F9]
              sm:col-span-6 sm:justify-self-center sm:grid-flow-col sm:gap-[48px]
              xl:col-start-10 xl:col-span-8 xl:gap-[107px]
            "
          >
            <Link to={'/'}>github</Link>
            <Link to={'/'}>contacts</Link>
            <Link to={'/'}>rights</Link>
          </div>
          <div className="col-span-4 justify-self-start grid grid-flow-col items-center gap-2 sm:col-span-3 sm:justify-self-end xl:col-start-20 xl:col-span-5">
            <span className="font-[Mont-Regular] font-bold text-[12px] leading-tight text-right text-[#75767F] mr-4 sm:mr-0">
              Back to top
            </span>
            <button
              className="bg-[#323542] hover:bg-[#4A4D58] w-8 h-8 grid place-items-center cursor-pointer"
              onClick={backToTopHandle}
            >
              <ChevronUp
                size={20}
                color="#ffffff"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
