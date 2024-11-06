import { useEffect } from "react";

export enum ResizerPosition {
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
    Left = 'left'
}

export type ResizerDirection = 'top' | 'right' | 'bottom' | 'left' | 'horizontal' | 'vertical';

export type IUseResize = (
    ref: React.RefObject<HTMLElement>,
    isEnabled?: boolean,
    directions?: ResizerDirection[],
    onResize?: (size: number) => void
) => void;

const handleResize = (element: HTMLElement, position: ResizerPosition, command?: (size: number) => void) => {
    const isHorizontal = position === ResizerPosition.Left || position === ResizerPosition.Right

    const handleMouseDown = (event: MouseEvent) => {
        event.preventDefault()
        const start = isHorizontal ? event.clientX : event.clientY
        const startSize = isHorizontal ? element.offsetWidth : element.offsetHeight
        let newSize = startSize

        const handleMouseMove = (e: MouseEvent) => {
            const delta = isHorizontal
                ? (position === ResizerPosition.Right ? e.clientX - start : start - e.clientX)
                : (position === ResizerPosition.Bottom ? e.clientY - start : start - e.clientY);

            newSize = startSize + delta

            if (isHorizontal) {
                element.style.width = `${newSize}px`;
                element.style.maxWidth = `${newSize}px`;
            } else {
                element.style.height = `${newSize}px`;
            }
        };

        const handleMouseUp = () => {
            if (command)
                command(newSize)
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return handleMouseDown;
};

const resizer = (position: ResizerPosition, element: HTMLElement, onResize?: (size: number) => void) => {
    const div = document.createElement('div')
    div.className = `resizer ${position}`
    switch (position) {
        case ResizerPosition.Top:
            div.style.top = '0';
            div.style.left = '0';
            div.style.right = '0';
            div.style.height = '5px';
            div.style.cursor = 'n-resize'
            break;
        case ResizerPosition.Right:
            div.style.top = '0';
            div.style.right = '0';
            div.style.bottom = '0';
            div.style.width = '5px';
            div.style.cursor = 'col-resize'
            break;
        case ResizerPosition.Bottom:
            div.style.left = '0';
            div.style.right = '0';
            div.style.bottom = '0';
            div.style.height = '5px';
            div.style.width = '20px';
            div.style.cursor = 's-resize'
            break;
        case ResizerPosition.Left:
            div.style.top = '0';
            div.style.left = '0';
            div.style.bottom = '0';
            div.style.width = '5px';
            div.style.cursor = 'col-resize'
            break;
    }

    div.style.position = 'absolute'
    div.onmousedown = handleResize(element, position, onResize)
    return div
};

const addResizer = (element: HTMLElement, position: ResizerPosition, onResize?: (size: number) => void) => {
    const resizerElement = resizer(position, element, onResize)
    element.appendChild(resizerElement)
    return resizerElement
};

export const useResize: IUseResize = (ref, isEnabled = false, directions, onResize) => {

    const top = directions ? directions.includes('top') : false
    const right = directions ? directions.includes('right') : false
    const bottom = directions ? directions.includes('bottom') : false
    const left = directions ? directions.includes('left') : false
    const horizontal = directions ? directions.includes('horizontal') : false
    const vertical = directions ? directions.includes('vertical') : false

    useEffect(() => {

        const refCurrent = ref.current

        if (refCurrent) {

            const resizeOn = (position: ResizerPosition) => {
                addResizer(refCurrent, position, onResize)
            }

            if (isEnabled) {

                if (horizontal || left) {
                    resizeOn(ResizerPosition.Left)
                }

                if (horizontal || right) {
                    resizeOn(ResizerPosition.Right)
                }

                if (vertical || top) {
                    resizeOn(ResizerPosition.Top)
                }

                if (vertical || bottom) {
                    resizeOn(ResizerPosition.Bottom)
                }

                if (!directions) {
                    resizeOn(ResizerPosition.Left)
                    resizeOn(ResizerPosition.Right)
                    resizeOn(ResizerPosition.Top)
                    resizeOn(ResizerPosition.Bottom)
                }
            }
        }
    }, [])
}