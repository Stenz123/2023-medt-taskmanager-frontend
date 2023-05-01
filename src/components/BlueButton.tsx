import React from "react";

export type BlueButtonProps = {
    disabled?: boolean;
}

type LayoutProps = {
    children: React.ReactNode;
}

const BlueButton = (props:BlueButtonProps,{children}:LayoutProps) => {
    if (props.disabled === undefined) props.disabled = false;
    return (
        <button
            type="submit"
            name="submit"
            id="submit"
            className="w-full inline-flex justify-center rounded-md
                       border border-transparent shadow-sm px-4 py-2 bg-blue-500
                       text-base font-medium text-white hover:bg-blue-400 mb-4 mt-4
                       focus:outline-none focus:ring-2 focus:ring-offset-2
                       focus:ring-blue-500 sm:w-auto sm:text-sm
                       disabled:opacity-40 disabled:focus:ring-none disabled:cursor-not-allowed
                       disabled:hover:bg-blue-500" disabled={props.disabled}>
            {children}
        </button>
    );
};

export default BlueButton;