<h1 align="center">Rfields03 Note Taker</h1>


## Description

An application called Note Taker that can be used to write and save notes. This application will use an Express.js back end and will save and retrieve note data from a JSON file.

## Prerequisites
* [NodeJS](https://nodejs.org/)

## Installation

Clone the repository to your local development environment.

[git clone Rfields03-note-taker](https://github.com/Rfields03/Rfields03-note-taker)


Open Terminal from code folder using the command prompt.

Run `npm install` for all dependencies.  To use the application locally, run `node server.js` in your CLI, and then open [Local Web](http://localhost:3000/) or live on [Heroku](https://still-ridge-23907.herokuapp.com/public/notes.html) from your preferred browser.

## Preview
![Application Preview - Replay at 720p for optimal viewing](Express.jsDemo.gif)

## Deployed Link:
[Note Taker App](https://still-ridge-23907.herokuapp.com/public/notes.html)

## Code Snippets

## Index.js
```
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

var deleteNote = function(id) {
  return $.ajax({
    url: "/api/notes/" + id,
    method: "DELETE"
  });
};
```
## Routes.js
```
fs.readFile("db/db.json", "utf8", (err, data) => {

    if (err) throw err;

    // Store the contents of the db.json file in a variable for better performance
    var notes = JSON.parse(data);

    // API ROUTES //

    // Setup the /api/notes get route
    app.get("/api/notes", function(req, res) {
      // Read the db.json file and return all saved notes as JSON.
      res.json(notes);
    });

    app.post("/api/notes", function(req, res) {
      // Receives a new note, adds it to db.json, then returns the new note
      let newNote = req.body;
      notes.push(newNote);
      updateDb();
      return console.log("Added new note: "+newNote.title);
    });

    // Retrieves a note with specific id
    app.get("/api/notes/:id", function(req, res) {
      // display json for the notes array indices of the provided id
      res.json(notes[req.params.id]);
    });

    // Deletes a note with specific id
    app.delete("/api/notes/:id", function(req, res)
    {
      notes.splice(req.params.id, 1);
      uodateDb();
      console.log("Deleted note with id "+req.params.id);
    });

    // VIEW ROUTES //

    app.get('/notes', function(req, res) {
      res.sendFile(path.join(__dirname, "/public/notes.html"));
    });

    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    function updateDb() {
      fs.writeFile("db/db.json",JSON.stringify(notes, '\t'),err => {
        if(err) throw err;
        return true;
      });

    }

  });
```

## Built With
* [JavaScript]
* [Node.js]
* [Express]

## License
This project is licensed under the ISC License

    

    