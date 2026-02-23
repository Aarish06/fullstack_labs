import { organisationData } from "../data/organisationData";

export function Organisation() {
  return (
    <>
      <h2>Organization</h2>

      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {organisationData.map((item, index) => (
            <tr key={index}>
              <td>{item.role}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
