import React, { useState } from "react";

type Employee = {
  firstName: string;
  lastName: string;
};

type Department = {
  name: string;
  employees: Employee[];
};

const initialDepartments: Department[] = [
  {
    name: "Administration",
    employees: [
      { firstName: "Zoë", lastName: "Robins" },
      { firstName: "Madeleine", lastName: "Madden" }
    ]
  },
  {
    name: "Audit",
    employees: [
      { firstName: "Josha", lastName: "Sadowski" },
      { firstName: "Kate", lastName: "Fleetwood" }
    ]
  },
  {
    name: "Banking Operations",
    employees: [
      { firstName: "Priyanka", lastName: "Bose" },
      { firstName: "Hammed", lastName: "Animashaun" },
      { firstName: "Álvaro", lastName: "Morte" },
      { firstName: "Taylor", lastName: "Napier" },
      { firstName: "Alan", lastName: "Simmonds" }
    ]
  },
  {
    name: "Communications",
    employees: [
      { firstName: "Gil", lastName: "Cardinal" },
      { firstName: "Richard J.", lastName: "Lewis" }
    ]
  },
  {
    name: "Corporate Services",
    employees: [
      { firstName: "Randy", lastName: "Bradshaw" },
      { firstName: "Tracey", lastName: "Cook" },
      { firstName: "Lubomir", lastName: "Mykytiuk" }
    ]
  },
  {
    name: "Facilities",
    employees: [
      { firstName: "Dakota", lastName: "House" },
      { firstName: "Lori Lea", lastName: "Okemah" },
      { firstName: "Renae", lastName: "Morrisseau" },
      { firstName: "Rick", lastName: "Belcourt" },
      { firstName: "Selina", lastName: "Hanusa" }
    ]
  },
  {
    name: "Financial Services",
    employees: [
      { firstName: "Buffy", lastName: "Gaudry" },
      { firstName: "Shaneen Ann", lastName: "Fox" },
      { firstName: "Allan", lastName: "Little" },
      { firstName: "Danny", lastName: "Rabbit" }
    ]
  },
  {
    name: "Human Resources",
    employees: [
      { firstName: "Jesse Ed", lastName: "Azure" },
      { firstName: "Stacy", lastName: "Da Silva" },
      { firstName: "Vladimír", lastName: "Valenta" },
      { firstName: "Samone", lastName: "Sayeses-Whitney" },
      { firstName: "Paul", lastName: "Coeur" }
    ]
  },
  {
    name: "Information Technology",
    employees: [
      { firstName: "Graham", lastName: "Greene" },
      { firstName: "Sandika", lastName: "Evergreen" },
      { firstName: "Jennifer", lastName: "Rodriguez" }
    ]
  },
  {
    name: "IT Technician",
    employees: [
      { firstName: "Aiyana", lastName: "Littlebear" },
      { firstName: "Inara", lastName: "Thunderbird" },
      { firstName: "Kaya", lastName: "Runningbrook" },
      { firstName: "Elara", lastName: "Firehawk" },
      { firstName: "Siona", lastName: "Moonflower" },
      { firstName: "Kaiyu", lastName: "Greywolf" },
      { firstName: "Ayawamat", lastName: "Nightwind" },
      { firstName: "Tala", lastName: "Braveheart" },
      { firstName: "Iniko", lastName: "Stonebear" },
      { firstName: "Onatah", lastName: "Redhawk" }
    ]
  }
];

export const Body: React.FC = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState(initialDepartments[0].name);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (firstName.trim().length < 3) {
      setError("First name must be at least 3 characters.");
      return;
    }

    setDepartments(prev =>
      prev.map(d =>
        d.name === department
          ? { ...d, employees: [...d.employees, { firstName, lastName }] }
          : d
      )
    );

    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      {departments.map(department => (
        <section key={department.name} style={{ marginBottom: "1.5rem" }}>
          <h2>{department.name}</h2>
          <ul>
            {department.employees.map((employee, index) => (
              <li key={index}>
                {employee.firstName} {employee.lastName}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* FORM AT BOTTOM */}
      <form onSubmit={handleSubmit}>
        <h3>Add New Employee</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />

        <input
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />

        <select value={department} onChange={e => setDepartment(e.target.value)}>
          {departments.map(d => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default Body;