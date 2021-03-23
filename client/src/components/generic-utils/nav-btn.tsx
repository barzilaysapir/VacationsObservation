import React, { Component } from "react";
import { Link } from "react-router-dom";

interface GenericNavBtnProps {
    page: string,
    displayText: string,
    function?: any
}

export default class GenericNavBtn extends Component<GenericNavBtnProps> {

    public constructor(props: GenericNavBtnProps) {
        super(props);
    }

    public render() {
        let nav = this.props;

        return (
            <div className="nav-btn">
                <Link
                    to={`/${nav.page}`}>

                    <button onClick={nav.function}>
                        {nav.displayText}
                    </button>
                    
                </Link>
            </div>
        );
    }
}
