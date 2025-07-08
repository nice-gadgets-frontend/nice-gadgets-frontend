import { ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const backToTopHandle = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F1121] h-[96px] flex items-center">
      <div className="w-full px-6 max-w-full mx-auto sm:max-w-[928px] xl:max-w-[1136px]">
        <div className="grid grid-cols-12 xl:grid-cols-24 gap-x-4 items-center h-full">
          <div className="col-span-3 xl:col-span-4 justify-self-start grid items-center">
            <img
              src="/gadgets/img/nice-gadgets-logo.png"
              alt="Logo Text"
              width={89}
              height={32}
            />
          </div>
          <div
            className="
              col-span-6 xl:col-start-10 xl:col-span-8
              justify-self-center
              grid grid-flow-col items-center
              font-[Mont-SemiBold] text-[12px] leading-[11px] tracking-[0.04em] uppercase text-[#F1F2F9]
            "
            style={{ gap: 'clamp(48px, 8vw, 107px)' }}
          >
            <Link to={'/'}>github</Link>
            <Link to={'/'}>contacts</Link>
            <Link to={'/'}>rights</Link>
          </div>
          <div className="col-span-3 xl:col-start-20 xl:col-span-5 justify-self-end grid grid-flow-col items-center">
            <span className="font-[Mont-Regular] font-bold text-[12px] leading-tight text-right text-[#75767F] mr-4">
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
