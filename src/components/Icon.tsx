import { Props } from "@headlessui/react/dist/types";

//TODO: When database, image not a string but an image
export default (src: any) => {
  return <div className='m-0 pr-2'>
      <span className="sr-only">Open user menu</span>
      <img
        className="h-8 w-8 rounded-full"
        src={src.src}/>
  </div>;
}
