/**
 * Author: Andoni ALONSO TORT
 */

import { Tooltip } from "@heroui/tooltip";
import * as _heroui_aria_utils from "@heroui/aria-utils";

interface TooltipProps extends React.AllHTMLAttributes<TooltipProps> {
    content: string;
    children: React.ReactNode;
    position?: _heroui_aria_utils.OverlayPlacement;
    offset?: number;
    crossOffset?: number;
}

export default function MyTooltip( {
    content,
    position = "top",
    offset,
    crossOffset, children, className
    /*...rest */
}: Readonly<TooltipProps> ) {
    const offs = offset ?? -7;
    const crossOffs = crossOffset ?? 0;

    return (
        <Tooltip placement={position} closeDelay={100}
            className={`p-2 rounded-lg
            border border-2 border-white
            bg-black text-white
            ${className}
            `}
            offset={offs}
            content={content}
            showArrow={true}
            crossOffset={crossOffs}
        >
            <div className="flex flex-inline">
                { children }
            </div>
        </Tooltip>
    );
}