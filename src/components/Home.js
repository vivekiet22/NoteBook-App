import React from "react";
// import AddNote from "./AddNote";
import Notes from "./Notes";


const Home = (props) => {
  // const [alert, setAlert] = useState(null);

  const {showAlert} = props 
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};
export default Home;
