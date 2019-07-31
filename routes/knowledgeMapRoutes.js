const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

// Shared model
const KnowledgeSubject = mongoose.model("knowledgeSubjects");

module.exports = app => {
  // GET request to get knowledge subject by id
  app.get(
    "/api/knowledge-subject/:knowledgeSubjectId",
    requireLogin,
    (req, res) => {
      const { knowledgeSubjectId } = req.params;

      KnowledgeSubject.findById(knowledgeSubjectId, (error, subject) => {
        if (error) {
          res.send(error);
        } else {
          res.send(subject);
        }
      });
    }
  );
};
