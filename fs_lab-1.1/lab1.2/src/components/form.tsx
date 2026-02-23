import { useState } from "react";

export function EmployeeForm({ addEmployee }: { addEmployee: (name: string) => void }) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (name === "") {
      return;
    }

    addEmployee(name);
    setName("");
  }

  return (
  <form onSubmit={handleSubmit}>
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Employee Name"
    />
    <button type="submit">Add Employee</button>
  </form>
);

}
