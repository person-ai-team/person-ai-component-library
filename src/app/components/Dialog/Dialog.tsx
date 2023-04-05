import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useMemo, useEffect } from 'react'
import { ImSpinner2 } from "react-icons/im";
import Draggable from 'react-draggable';


const DialogVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const;
const DialogSize = ['mobile', 'small', 'medium', 'large'] as const;

type DialogProps = {
    isLoading?: boolean;
    isDarkBg?: boolean;
    variant?: typeof DialogVariant[number];
    size?: typeof DialogSize[number];
    label?: string;
    children: React.ReactNode;
    openDialog: boolean;
    handleClose: () => void;
}

const getVariantClasses = (variant: typeof DialogVariant[number]): string => {
    switch (variant) {
        case "primary": {
            return "text-gray-800 border-gray-700 border bg-gray-200 ";
        }
        case "outline" : {
            return "bg-transparent text-white border border-gray-300 hover:border-gray-400";
        }
        case "ghost": {
            return "bg-slate-100  text-gray-700";
        }
        case "light": {
            return "bg-white text-gray-700";
        }
        case "dark": {
            return "bg-gray-800 text-white";
        }
        default: {
            return "bg-gray-500 text-white";
        }
    }
};

const getDarkBgClasses = (isDarkBg: boolean, variant: typeof DialogVariant[number] ): string | undefined => {
    if (isDarkBg && variant === "dark") {
        return "text-white";
    }
};

const getSizeClasses = (size: typeof DialogSize[number]): string => {
    switch (size) {
        case "mobile": {
            return "w-72 h-52 text-xs";
        }
        case "small": {
            return "w-[380px] h-[250px] text-sm";
        }
        case "large": {
            return "w-[500px] h-auto text-base";
        }
        case "medium": {
            return "w-[500px] h-[400px] text-sm";
        }
        default: {
            return "px-4 py-2 text-sm";
        }
    }
};

const BASE_DIALOG_CLASSES = "fixed inset-0 z-10 overflow-y-auto";

export const PersonDialog = ({
    isLoading = false,
    isDarkBg = false,
    variant = "primary",
    size = "medium",
    label,
    children,
    openDialog,
    handleClose,
    ...props
}: DialogProps) => {
    const darkBgClass = getDarkBgClasses(isDarkBg, variant);
    const dialogClasses = useMemo(() => {
        const sizeClass = getSizeClasses(size);
        const variantClass = getVariantClasses(variant);
        const darkBgClass = getDarkBgClasses(isDarkBg, variant);
        return `${sizeClass} ${variantClass} ${darkBgClass}`;
    }, [size, variant, isDarkBg]);

    const [open, setOpen] = useState(openDialog);

    // close dialog
    useEffect(() => {
        setOpen(openDialog);
      }, [openDialog]);

    

    return (
        <Draggable handle='#draggable-dialog-title'>
            <Transition.Root show={open} as={Fragment}>
        <Dialog
            as="div"
            className={BASE_DIALOG_CLASSES}
            {...props}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
        >
            <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed bg-gray-500  bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 lg:inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`relative transform rounded-lg  shadow-xl pb-1.5 transition-all ${dialogClasses}`}  >
              <div className='mt-2 border-b border-gray-700'>
              <div className=' flex h-7 px-3 items-center cursor-pointer' id='draggable-dialog-title'>
                    <div style={{ marginTop: '-6px' }}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='h-6 w-6'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M3.75 9h16.5m-16.5 6.75h16.5'
                        />
                      </svg>
                    </div>

                    <button
                      type='button'
                      style={{ marginLeft: 'auto', marginTop: '-10px' }}
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <span className='sr-only'>Close</span>
                      <svg
                        className='h-6 w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
              </div>
              {isLoading && (
				<div>
                    <span className='justify-center'>
					<ImSpinner2 className="animate-spin ml-auto mr-auto mt-5 "  />
				</span>
                <div className='mt-4 ml-auto mr-auto'>
                    <Dialog.Title as="h2" className={`text-lg leading-6 font-medium ${darkBgClass} `}>
                        Loading
                    </Dialog.Title>
                </div>
                </div>
			)}
                {
                    !isLoading && (
                        <div>
                    
                    {
                        label && (
                            <div className='flex justify-center text-center border-gray-400 border-b  items-center'>
                    <Dialog.Title as="h2" className={`text-lg py-3 leading-6 font-medium ${darkBgClass} `}>
                                {label}
                            </Dialog.Title>
                    
                    </div>
                        )
                    }
                    <div className=''>
                        {children}
                        </div>
                </div>
                    )
                }
                </Dialog.Panel>
            </Transition.Child>
            </div>
        </div>
        </Dialog>
        </Transition.Root>
        </Draggable>
    );
};
