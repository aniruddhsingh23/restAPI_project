const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Array database
let comments = [
  {
    id: uuid(),
    username: 'Todd',
    comment: "LOL that was hilarious!"
  },
  {
    id: uuid(),
    username: 'Skyler',
    comment: "Are you in danger?"
  },
  {
    id: uuid(),
    username: 'Heisenberg',
    comment: "I am the danger, Skyler!"
  },
  {
    id: uuid(),
    username: 'Mini',
    comment: "I like ice cream!"
  },
  {
    id: uuid(),
    username: 'Geeta',
    comment: "Studying is not that fun!"
  },
  {
    id: uuid(),
    username: 'thomathy',
    comment: "This is a REST API, fun!"
  }
];

// Create a GET request for listing all comments
app.get("/comments", (req, res) => {
  res.render('comments/index', { comments });
});

app.get("/comments/new", (req, res) => {
  res.render('comments/new');
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/show', { comment });
});

app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/edit', { comment });
});

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find(c => c.id === id);

  // Get new text from req.body
  const newCommentText = req.body.comment;
  foundComment.comment = newCommentText;

  res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.listen(3000, () => {
  console.log("SERVER STARTED ON PORT 3000.");
});
