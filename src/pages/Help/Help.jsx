import React from "react";
import "../../styles/help.css";
import useAuth from "../../hooks/useAuth";
function Help() {
  const { auth } = useAuth();
  return (
    <div className="help-wrapper">
      <h1>SportTrackr Guide</h1>
      <hr />
      <div>
      <h2>Navigating the SportTrackr web portal</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        feugiat sem. Fusce pharetra, tellus eu rutrum sollicitudin, libero enim
        viverra ex, et fringilla lorem est non leo. Mauris justo nibh, hendrerit
        ac arcu et, rhoncus molestie mauris. Phasellus tincidunt nisl sed orci
        volutpat mattis. Pellentesque viverra lobortis dignissim. Nunc egestas
        quam rhoncus interdum vulputate. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Pellentesque id
        lacus vel augue condimentum aliquet in vel dui.
      </p>
      <h2>When to choose the portal over the app?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        feugiat sem. Fusce pharetra, tellus eu rutrum sollicitudin, libero enim
        viverra ex, et fringilla lorem est non leo. Mauris justo nibh, hendrerit
        ac arcu et, rhoncus molestie mauris. Phasellus tincidunt nisl sed orci
        volutpat mattis. Pellentesque viverra lobortis dignissim. Nunc egestas
        quam rhoncus interdum vulputate. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Pellentesque id
        lacus vel augue condimentum aliquet in vel dui.
      </p>
      <h2>
        SportTrackr for{" "}
        {auth.roles &&
          (auth.roles.includes("owner")
            ? "owners"
            : auth.roles.length > 1
            ? "employees"
            : "athletes")} - introduction video
      </h2>
      </div>
    </div>
  );
}

export default Help;
