import { ColorSwatch } from 'react-aria-components';
import classNames from 'classnames';

type ColorSelectorType = {
  color: string;
  selected?: boolean;
};

// <ColorSelector color="#fff" selected?={true}/> only hex color
export const ColorSelector: React.FC<ColorSelectorType> = ({
  color,
  selected,
}) => {
  return (
    <div
      className={classNames(
        'border hover:border-[#75767F] rounded-[50%] flex justify-center items-center w-8 h-8',
        {
          'border-[#3B3E4A]': !selected,
          'border-white': selected,
        },
      )}
    >
      <ColorSwatch
        className="w-[30px] h-[30px] rounded-full border-2 border-transparent [background-clip:content-box]"
        color={color}
      />
    </div>
  );
};
