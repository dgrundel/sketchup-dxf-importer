import * as React from "react";

export interface SVGProps {
    html: string;
    className?: string;
    style?: React.CSSProperties;
}

export const SVG = (props: SVGProps) => {
    return <div dangerouslySetInnerHTML={({ __html: props.html })} {...props} />;
};