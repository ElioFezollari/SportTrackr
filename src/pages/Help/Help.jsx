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
          Welcome to the SportTrackr web portal! This guide will walk you through the basics of using the portal, from setting up your account to tracking your progress.
          <br />
          <br />
          The portal is designed to be intuitive and easy to use. On the left-hand side, you'll find the main navigation menu. This will take you to the different sections of the portal, such as your dashboard, your profile, and your team.
          <br />
          <br />
          In the center of the screen, you'll see the main content area. This is where you'll view and manage your data. For example, on your dashboard, you'll see an overview of your recent activity and upcoming events.
          <br />
          <br />
          To get started, we recommend checking out the following sections:
          <ul>
            <li>
              <strong>Dashboard:</strong> This is your home page. It gives you a quick overview of your progress and upcoming events.
            </li>
            <li>
              <strong>Profile:</strong> This is where you can manage your account information, such as your name, email address, and password.
            </li>
            <li>
              <strong>Team:</strong> This is where you can view and manage your team members.
            </li>
            <li>
              <strong>League Oraganizer Onboarding:</strong>
            </li>
          </ul>
        </p>
        <h2>When to choose the portal over the app?</h2>
        <p>
          SportTrackr is available as both a web portal and a mobile app. So, when should you use the portal instead of the app?
          <br />
          <br />
          Here are a few scenarios where the portal might be a better choice:
          <ul>
            <li>
              <strong>You would like to become League Organizer:</strong>
            </li>
            <li>
              <strong>You want to Join or Create Team</strong>
            </li>
            <li>
              <strong>If you are an Employee of a league and want to manage the league</strong>
            </li>
          </ul>
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
        <p>
          We've created a short video to introduce you to SportTrackr. This video will walk you through the basics of using the portal and show you how to get started.
          <br />
          <br />
          You can watch the video here: [link to video]
        </p>
      </div>
    </div>
  );
}

export default Help;