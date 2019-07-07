const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Program = mongoose.model("programs");
const Course = mongoose.model("courses");

module.exports = app => {
  // GET request to receive a list of user's programs
  app.get("/api/programs", requireLogin, async (req, res) => {
    // Database query to get user's programs
    const programs = await Program.find({
      _user: req.user.uid
    });

    // Send back user's programs
    res.status(200).send(programs);
  });

  // POST request to create a program
  app.post("/api/programs", requireLogin, async (req, res) => {
    // Get information from request body
    const { name, shortname, institution } = req.body;

    // Create Program
    const program = new Program({
      name,
      shortname,
      institution,
      _user: req.user.uid,
      dateCreated: Date.now()
    });

    try {
      // Add program to database
      await program.save();

      res.send(program);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  // PUT request to update program information
  app.put("/api/programs/:programId/edit", requireLogin, (req, res) => {
    const { programId } = req.params;

    // Update program information and return updated program
    Program.findByIdAndUpdate(
      programId,
      {
        $set: req.body
      },
      {
        new: true
      },
      (error, program) => {
        if (error) {
          res.send(error);
        } else {
          res.send(program);
        }
      }
    );
  });

  // DELETE requires to delete a program
  app.delete("/api/programs/:programId", requireLogin, async (req, res) => {
    const { programId } = req.params;

    // Delete courses that belong to the program being deleted
    await Course.deleteMany(
      {
        programId: programId
      },
      error => {
        if (error) {
          res.send(error)
        }
      }
    )

    // Delete the program
    await Program.findByIdAndDelete(programId, (error, program) => {
      if (error) {
        res.send(error);
      } else {
        res.send(program);
      }
    });
  });
};
