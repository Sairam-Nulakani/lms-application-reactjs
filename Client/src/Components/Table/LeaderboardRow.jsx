import React from "react";

const LeaderboardRow = ({ data }) => {
  return (
    <>
      {data.map((student, i) => (
        <tr key={i}>
          <td>{student.name}</td>
          <td>{student.email}</td>
          <td>{student.class}</td>
          <td>{student.quiz_attended}</td>
          <td>{student.points}</td>
        </tr>
      ))}
    </>
  );
};

export default LeaderboardRow;
