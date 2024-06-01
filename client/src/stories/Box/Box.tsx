import React, {PropsWithChildren} from "react";
import "./Box.scss";

export const Box: React.FC<PropsWithChildren> = ({children}): React.ReactElement => {

    return (
        <div className="box-container">
            {children}
        </div>
    )
}