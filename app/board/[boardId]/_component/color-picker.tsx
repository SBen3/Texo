import { colorToCss } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Color } from "@/app/types/canvas";

interface colorPickerProp {
  onChange: (color: Color) => void;
}
export const ColorPicker = ({ onChange }: colorPickerProp) => {
  return (
    <>
      <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
        <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
        <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={onChange} />
        <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
        <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
        <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
        <ColorButton color={{ r: 6, g: 182, b: 212  }} onClick={onChange} />
        <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
        <ColorButton color={{ r: 20,  g: 184, b: 166 }} onClick={onChange} />
        <ColorButton color={{ r: 156, g: 163, b: 175 }} onClick={onChange} />
        <ColorButton color={{ r: 239, g: 68,  b: 68}} onClick={onChange} />
      </div>
    </>
  );
};

interface colorButtonProp {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: colorButtonProp) => {
  return (
    <>
      <Button
        className="flex justify-center items-center h-6 w-6 p-0 rounded-2xl hover:opacity-75 "
        onClick={() => onClick(color)}
      >
        <div
          className="rounded-md w-6 h-6"
          style={{ background: colorToCss(color) }}
        ></div>
      </Button>
    </>
  );
};
