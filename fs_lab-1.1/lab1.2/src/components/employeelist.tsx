type Employees = {
  employees: string[];
};

export function EmployeeList({ employees }: Employees) {
  return (
    <>
      <h2>Employees</h2>

      <ul>
        {employees.map((emp, index) => (
          <li key={index}>{emp}</li>
        ))}
      </ul>

    </>
  );
}
