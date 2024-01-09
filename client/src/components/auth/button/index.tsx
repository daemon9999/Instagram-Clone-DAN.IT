import { createElement } from "react"
import classNames from "classnames"

interface ButtonProps {
    as?: string,
    children: string,
    type?: string,
    disabled?: boolean
}
export default function Button({as='button',children, ...props}:ButtonProps) {

    const element = createElement(as,{

        className: classNames("bg-open-blue  py-[6px] rounded-lg w-full font-semibold text-sm text-white transition-all duration-300 ", {
             'opacity-70': props.disabled,
             'hover:bg-blue-600 ': !props.disabled           
        }),

        ...props
    }, children)
    return element
}