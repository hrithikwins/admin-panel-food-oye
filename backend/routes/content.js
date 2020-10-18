const router = require("express").Router();
let Content = require("../models/content.model");

router.route("/").get((req, res) => {
  Content.find()
    .then((contents) => res.json(contents))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const userData = req.body.userData;


  const newContent = new Content({
    username,
    userData
  });

  newContent
    .save()
    .then(() => res.json("Content added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route('/:id').get((req,res)=> {
  Content.findById(req.params.id)
  .then(content => res.json(content))
  .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req,res) => {
  Content.findByIdAndDelete(req.params.id)
  .then(() => res.json('Content Deleted'))
  .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update/:id').post((req,res) => {
  Content.findById(req.params.id)
  .then(content => {
    content.username = req.body.username;
    content.userData = req.body.userData;

    content.save()
    .then(() => res.json('Content updated'))
    .catch(err => res.status(400).json('Error:' + err));
  })
  .catch(err => res.status(400).json('Error:' + err));
});

router.route('/find/:username').get((req,res) => {
  Content.find({username: req.params.username})
  .then(content => res.json(content))
  .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;
