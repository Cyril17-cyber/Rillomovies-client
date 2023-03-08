import React from 'react';
import {Link} from 'react-router-dom';

export default function Terms() {
    return (
        <div className="terms">
            <p>
            The Rillo Movies website was designed and developed/built only as a project, and thus <strong>should not</strong> be taken seriously as an official movie streaming site as the developer has no rights,  whatsoever, to show any of the movies displayed here.
    By agreeing to terms and conditions of this website, you have agreed not to sue or take legal actions on what is displayed in this website.
        </p>
        <Link to={"/register"}>Continue to register</Link>
        </div>
    )
}
