import { ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const backToTopHandle = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F1121] h-[96px] text-[#F1F2F9] flex items-center justify-center">
      <div className="w-full px-8 md:w-[calc(100%-64px)] xl:w-[1136px]">
        <div className="grid grid-cols-24 gap-x-4 items-center h-full">
          <div className="col-span-auto md:col-start-1 md:col-span-5 xl:col-start-1 xl:col-span-4 flex justify-start items-center">
            <div className="relative w-[89px] h-[32px]">
              <img
                src="/gadgets/img/logo-text.svg.svg"
                alt="Logo Text"
                width={89}
                height={32}
                className="absolute top-0 left-0"
              />
              <img
                src="/gadgets/img/logo-img.png"
                alt="Logo Icon"
                width={13}
                height={17}
                className="absolute bottom-[18px] left-[47px]"
              />
            </div>
          </div>
          <div className="col-span-auto md:col-start-8 md:col-span-8 xl:col-start-10 xl:col-span-8">
            <div className="grid grid-cols-3 gap-x-[107px] font-[Mont-SemiBold] text-[12px] leading-[11px] tracking-[0.04em] uppercase text-[#F1F2F9]">
              <Link to={'/'}>github</Link>
              <Link to={'/'}>contacts</Link>
              <Link to={'/'}>rights</Link>
            </div>
          </div>
          <div className="col-span-auto md:col-start-19 md:col-span-6 xl:col-start-20 xl:col-span-5 flex justify-end items-center">
            <div className="flex items-center gap-x-4">
              <span className="font-[Mont-Regular] font-bold text-[12px] leading-tight text-right text-[#75767F]">
                Back to top
              </span>
              <button
                className="bg-[#323542] hover:bg-[#4A4D58] w-8 h-8 flex justify-center items-center cursor-pointer"
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
      </div>
    </footer>
  );
};
