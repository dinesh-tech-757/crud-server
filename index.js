import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userModel from "./models/UserModel.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://dineshmoorthi757:1234567890@cluster0.y5tnm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/create", (req, res) => {
  userModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, email: req.body.email, age: req.body.age }
    )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  userModel
    .find(res.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});


app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.delete('/deleteUser/:id', (req,res)=> {
  const id = req.params.id;
  userModel.findByIdAndDelete({_id:id})
  .then((res) => res.json(res))
  .catch((err) => res.json(err));
})

app.listen(9090, () => {
  console.log("Server is running");
});
