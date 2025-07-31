// Members 
// Mern Daniel Rallos
// Juspher G. Deligero
// Ryan Christian Daro
// April Jhon De Atras
// Jefel Bayubay

const express = require("express");
const app = express();
const PORT = 5000;

const contact = require("./contacts.json");

app.use(express.json());


app.get("/api/contacts", (req, res) => {
  res.status(200).json(contact);
});

app.post("/api/contact", function (req, res) {
  const { profile, name, age } = req.body;

  if (!profile || !name || !age)
    return res.status(404).json({
      message: "Required all fields",
    });

  const newId =
    contact.length > 0
      ? Math.max(...contact.map((p) => parseInt(p.id))) + 1
      : "1";

  const newUser = { id: newId, name, age };

  contact.push(newUser);

  res.status(201).json({
    message: "User created sucessfully",
    newUser,
  });
});

app.delete("/api/contact/:id", function (req, res) {
  const { id } = req.params;
  const index = contact.findIndex((profile) => profile.id === parseInt(id));

  if (index === -1)
    return res.status(404).json({
      message: "No contact found",
    });

  const deleted = contact.splice(index, 1)[0];

  res.status(201).json({
    message: "You Deleted this contact",
    deleted,
  });
});

app.put("/api/update-contact/:id", (req, res) => {
  const { id } = req.params;
  const { profile, name, age } = req.body;

  const foundProfile = contact.find((profile) => profile.id === parseInt(id));

  let errors = [];

  if (!name) {
    errors.push({
      message: "Name is required.",
      field: "name",
    });
  }

  if (!age) {
    errors.push({
      message: "Age is required.",
      field: "age",
    });
  }

  if (errors.length > 0) {
    return res.status(422).json(errors);
  }

  if (profile) foundProfile.profile = profile;
  if (name) foundProfile.name = name;
  if (age) foundProfile.age = age;

  res.status(201).json({
    message: "Updated",
    foundProfile,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
});


