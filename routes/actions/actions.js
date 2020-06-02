const express = require("express");
const router = express.Router({mergeParams: true});

// Database helpers
const {
  get,
  insert,
  update,
  remove,
} =  require("./../../data/helpers/actionModel");

const { get:getProject, getProjectActions } = require("./../../data/helpers/projectModel");

// Get all actions on the project with that project_id
router.get("/", validateProjectId, async (req, res) => {
  try {
    const project = await getProjectActions(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not get the project" });
  }
});

// Add a new action to the project with the project_id (req.params.id)
router.post("/", validateProjectId, async (req, res, next) => {
  try {
    const id = Number(req.params.id) // from the parent route
    const action = await insert({...req.body, project_id: id});
    res.status(200).json(action);
  } catch (err) {
    console.log(err)
    next(err);
  }
});

// Delete the action with the id of actionId
router.delete("/:actionId", validateProjectId, validateActionId, async (req, res) => {
  try {
    await remove(req.params.actionId);
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not delete the action" });
  }
});

// Update the action with the id of actionId
router.put("/:actionId", validateActionId, validateAction, async (req, res) => {
  try {
    await update(req.params.actionId, req.body);
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not update the action" });
  }
});

// custom middleware

// Validates the action id exists
// Returns error message response objects if it fails to find that project_id
async function validateActionId(req, res, next) {
  try {
    const action = await get(Number(req.params.actionId));
    if (action) {
      req.action = action;
    } else {
      return res.status(400).json({ message: "Invalid action id" });
    }
    next();
  } catch {
    return res.status(500).json({ message: "Could not validate action id" });
  }
}

// Validates that req.body contains the required fields
// Returns error message response objects if it fails to find the require data on req.body
function validateAction(req, res, next) {
  if (req.body) {
    if (!req.body.description) {
      return res.status(400).json({ message: "Missing required description field" });
    }
  } else {
    return res.status(400).json({ message: "Missing action data" });
  }
  next();
}

// Validates the project id exists
// Returns error message response objects if it fails to find that project_id
async function validateProjectId(req, res, next) {
  try {
    const project = await getProject(Number(req.params.id));
    console.log("project", project)
    if (project) {
      req.project = project;
    } else {
      return res.status(400).json({ message: "Invalid project id" });
    }
    next();
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Could not validate project id" });
  }
}

module.exports = router;
