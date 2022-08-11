const express = require("express")
const router = express.Router()
const Note  = require("../models/Notes")
// const JWT_TOKEN = "VivekIsAGood$oy";
const fetchuser = require("../middleware/fetchuser")

const { body, validationResult } = require("express-validator");


//ROUTE 1: Get all notes usig :Get "/api/notes/fetchallnotes".login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        
   
    const notes = await Note.find({user:req.user.id})

    
    res.json(notes)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//ROUTE 2: Add a new note using post  :POST "/api/notes/addnote".login required
router.post('/addnote',fetchuser,[
    body("title", "title should be minimum 3 characters").isLength({ min: 3 }),
    body("description", "description should be minimum of lenght of 5 characters").isLength({ min: 5 })
   ],async (req,res)=>{
    try {
        
   
    const {title,description,tag} = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,description,tag,user:req.user.id,
        
    })
    const saveNote = await note.save()
    res.json(saveNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }

})

//ROUTE 3: Update a n existing note :Put "/api/notes/updatenote".login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{

  const {title,description,tag} = req.body;
  try {
    
  

  // Create a New Note Object
  const newNote = {};
    if (title){
      newNote.title = title
    }
    if (description){
      newNote.description = description
    }
    if (tag){
      newNote.tag = tag
    }

    // Find the note to be updated and  update it
    let note =await Note.findById(req.params.id)
    if(!note){
      res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")      
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
 })
//ROUTE 4: Delete an existing note :Delete "/api/notes/deletenote".login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
  try {
    
  
  
    // Find the note to be deleted and  delete it
    let note =await Note.findById(req.params.id)
    if(!note){
      res.status(404).send("Not Found")
    }
    // Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")      
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted"})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
 })



module.exports = router
