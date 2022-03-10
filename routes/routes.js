const fs = require('fs');
const path = require('path');

module.exports = app => {

  fs.readFile("db/db.json", "utf8", (err, data) => {

    if (err) throw err;

    // Store the contents of the db.json file in a variable for better performance
    var notes = JSON.parse(data);

    // API ROUTES //

    // Setup the /api/notes get route
    app.get("/api/notes", (req, res) => {
      // Read the db.json file and return all saved notes as JSON.
      res.json(notes);
    });

    app.post("/api/notes", (req, res) => {
      // Receives a new note, adds it to db.json, then returns the new note
      let newNote = req.body;
      notes.push(newNote);
      updateDb();
      return console.log("Added new note: "+newNote.title);
    });

    // Retrieves a note with specific id
    app.get("/api/notes/:id", (req, res) => {
      // display json for the notes array indices of the provided id
      res.json(notes[req.params.id]);
    });

    // Deletes a note with specific id
    app.delete("/api/notes/:id", (req, res) =>
    {
      notes.splice(req.params.id, 1);
      uodateDb();
      console.log("Deleted note with id "+req.params.id);
    });

    // VIEW ROUTES //

    app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, "/public/notes.html"));
    });

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    function updateDb() {
      fs.writeFile("db/db.json",JSON.stringify(notes, '\t'),err => {
        if(err) throw err;
        return true;
      });

    }

  });

}