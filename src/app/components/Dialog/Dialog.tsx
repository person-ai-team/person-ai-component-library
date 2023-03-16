import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useMemo } from 'react'
import { ImSpinner2 } from "react-icons/im";

const DialogVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const;
const DialogSize = ['mobile', 'small', 'medium', 'large'] as const;

type DialogProps = {
    isLoading?: boolean;
    isDarkBg?: boolean;
    variant?: typeof DialogVariant[number];
    size?: typeof DialogSize[number];
    label: string;
    children: React.ReactNode;
    openDialog: boolean;
}

const getVariantClasses = (variant: typeof DialogVariant[number]): string => {
    switch (variant) {
        case "primary": {
            return "text-gray-800 bg-gray-200 border-transparent";
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
            return "w-[600px] h-[500px] text-base";
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
    ...props
}: DialogProps) => {
    const darkBgClass = getDarkBgClasses(isDarkBg, variant);
    const dialogClasses = useMemo(() => {
        const sizeClass = getSizeClasses(size);
        const variantClass = getVariantClasses(variant);
        const darkBgClass = getDarkBgClasses(isDarkBg, variant);
        return `${sizeClass} ${variantClass} ${darkBgClass}`;
    }, [size, variant, isDarkBg]);
    const [open, setOpen] = useState(true);

    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog
            as="div"
            className={BASE_DIALOG_CLASSES}
            {...props}
            onClose={setOpen}
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
          <div className="fixed bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed z-10 lg:inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 shadow-xl transition-all ${dialogClasses}`}  >
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
                    <div className='flex justify-center text-center items-center'>
                    <Dialog.Title as="h3" className={`text-lg mx-auto leading-6 font-medium ${darkBgClass} `}>
                        {label}
                    </Dialog.Title>
                    </div>
                    <Dialog.Description className="mt-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa libero labore
                        nesciunt, quod voluptas, voluptates, voluptatibus quibusdam quia quae
                    </Dialog.Description>
                </div>
                    )
                }
                </Dialog.Panel>
            </Transition.Child>
            </div>
        </div>
        </Dialog>
        </Transition.Root>
    );
};
