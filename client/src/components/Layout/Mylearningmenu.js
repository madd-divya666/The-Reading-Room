import React from "react";
import { NavLink } from "react-router-dom";
const Mylearningmenu = () => {
    return (
        <div className="pt-5">
            <div className="text-center dashboard-menu">
                <div className="list-group ">
                    <h4>JUST STUDY...</h4>
                    <NavLink
                        to="/dashboard/user/studymaterial"
                        className="list-group-item list-group-item-action"
                    >
                        Studymaterial
                    </NavLink>
                    <NavLink
                        to="/dashboard/user/courses"
                        className="list-group-item list-group-item-action"
                    >
                        Courses
                    </NavLink>

                </div>
            </div>
        </div>
    );
};

export default Mylearningmenu;
