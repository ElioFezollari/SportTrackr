import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import LeaguesFilter from "../../components/LeaguesFIlter";
import TeamsFilter from "./TeamsFilter";
import Table from "../../components/Table";
import useAuth from "../../hooks/useAuth";
import { getFilteredUsers } from "../../services/users";

function Users() {
  const {auth} = useAuth()
  const [selectedTeam, setSelectedTeam] = useState("Pick a team");
  const [userLeagues, setUserLeagues] = useState();
  const [optionPicked, setOptionPicked] = useState("Pick a league");
  const [name,setName] = useState("")
  const [users,setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getFilteredUsers(
          auth.accessToken,
          optionPicked,
          selectedTeam,
          name
        );

        setUsers(userData.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    if (auth.accessToken) {
      fetchUsers();
    }
  }, [
    optionPicked,
    auth.accessToken,
    selectedTeam,
    name,
  ]);

  return (
    <div className="listings-wrapper">
      <h1>Registered Users</h1>
      <div className="listings-filter">
        <div className="selection-filter">
          <Search placeholder="Search User..." text={name} setText={setName} />
        </div>
        <TeamsFilter
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
        />
        <LeaguesFilter
          selectedLeague={userLeagues}
          setSelectedLeague={setUserLeagues}
          optionPicked={optionPicked}
          setOptionPicked={setOptionPicked}
        />
      </div>
      <Table headers={["Player","Player's Name","League","Team","Position","Matches Played"]} rows={["fullName","league","teamName","position","matches"]} data={users}/>
    </div>
  );
}

export default Users;
