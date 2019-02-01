const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Program = mongoose.model("programs");
const Course = mongoose.model("courses");

module.exports = app => {
  // GET request to receive a list of courses for given program
  app.get("/api/programs/:programId", requireLogin, async (req, res) => {
    const { programId } = req.params;

    // Get array of courses ids from Program
    const { courses } = await Program.findById(programId).select({
      courses: true
    });

    // Get indiv. course information from Courses collection based on array of
    // course ids.
    Course.find(
      {
        _id: {
          $in: courses
        }
      },
      (error, courseList) => {
        if (error) {
          res.send(error);
        } else {
          res.send(courseList);
        }
      }
    );
  });

  // GET request to receive all courses for all programs
  // (Using POST is considered hacky -- GET requests can't have a request body
  // but the other solution seems too complex at them moment)
  // See: https://evertpot.com/dropbox-post-api/)
  app.post("/api/programs/courses/all", requireLogin, async (req, res) => {
    const { programIds } = req.body;

    Course.find(
      {
        programId: {
          $in: programIds
        }
      },
      (error, courseList) => {
        if (error) {
          res.send(error);
        } else {
          res.send(courseList);
        }
      }
    );
  });

  // POST request to create a course
  app.post(
    "/api/programs/:programId/course",
    requireLogin,
    async (req, res) => {
      const { programId } = req.params;

      // Get information from request body
      const { name, shortname } = req.body;

      // Create Course object
      const course = new Course({
        name,
        shortname,
        programId,
        dateCreated: Date.now()
      });

      try {
        // Save course to Courses collection
        await course.save();

        // Find Program and add course Id to the courses array
        Program.findByIdAndUpdate(
          programId,
          {
            $push: {
              courses: course._id
            }
          },
          (error, program) => {
            if (error) {
              res.send(error);
            }
          }
        );

        // Send the course that was created
        res.send(course);
      } catch (err) {
        res.status(422).send(error);
      }
    }
  );

  // PUT request to edit information about a course in a program
  app.put("/api/courses/:courseId/edit", requireLogin, async (req, res) => {
    const { courseId } = req.params;

    // Find course and update information
    Course.findByIdAndUpdate(
      courseId,
      {
        $set: req.body
      },
      {
        new: true
      },
      (error, course) => {
        if (error) {
          res.send(error);
        } else {
          res.send(course);
        }
      }
    );
  });

  // DELETE request to delete course from a program
  app.delete(
    "/api/programs/:programId/courses/:courseId/delete",
    requireLogin,
    (req, res) => {
      const { programId, courseId } = req.params;

      // Delete course from Courses collection
      Course.findByIdAndDelete(courseId, (error, course) => {
        if (error) {
          res.send(error);
        }
      });

      // Remove course id from courses array in its program
      Program.findByIdAndUpdate(
        programId,
        {
          $pull: {
            courses: courseId
          }
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
    }
  );
};
