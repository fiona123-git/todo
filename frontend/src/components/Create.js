import React,{useState, useEffect} from 'react';
import axios from 'axios'


const Create = () => {
    //set state
    const[data, setData]= useState({task:''})
    const[todoList, settodoList]= useState([])
    const[update,setUpdate] = useState({task:''})
    

    //create function to handle change in input
     function handleChange(e) {
         setData((data) => ({
             ...data,
             [e.target.name]: e.target.value
         }));
     }
   function handleSubmit(e){
      //this stop the submit button from clearing information sent
    e.preventDefault();
      // calling api to create todo
      axios
          .post("http://localhost:8000/api/todo", data)
          .then((res) => {
              setData({
                  task: "",
                  
              });
              console.log(res.data.message);
              window.location.reload();
          })
          .catch((err) => {
              console.log("Error couldn't create TODO");
              console.log(err.message);
          });
  }
  //calling the list of items from backend using axios get
  useEffect(() => {
    axios
        .get("http://localhost:8000/api/todo")
        .then((res) => {
            console.log(res.data);
            settodoList(res.data);
        })
        .catch((err) => {
            console.log(err.message);
        });
   },[]);

 function deletelist(e){

  e.preventDefault()
  let id= e.target.id
     axios.delete(`http://localhost:8000/api/todo/${id}`);

    
 }
//update function
 function  updateList(e){
     //stops button from clearing once submitted
     
    
     e.preventDefault();
      let id = e.target.id
     console.log({
         
      
         update
     }); 
    // use axios to update request to the database
     axios
         .put(`http://localhost:8000/api/todo/${id}`,update, )
         // it recieves the responce of the promise then it accepts
         .then((res) => {

             setUpdate({
                 task: ""
                
             });
             console.log(res.data.message);
             alert('Updated')
         })
         .catch((err) => {
             console.log("Failed to update todo");
             console.log(err.message);
         });
 }



    return (
        <div>
           <div>
            <h1>Todo List</h1>
             
            

                <form
            
                    className="form-container"
                
                >
                    <table>
                 <tbody>
                     <tr>
                     <th>Todo</th>
                     </tr>
                  <tr>
            {todoList.map(list => {
              return (
                  <tr>
                <td key={list._id} >
                <input type="text"
                name="task"
                defaultValue= {list.task} 
                onChange={(evt)=>setUpdate({task:evt.target.value})}
        />
                </td>
                <td><input type="button" value="update" onClick={updateList} id={list._id}/></td> 
            <td><input type="button" value="delete" onClick={deletelist} id={list._id}/></td> 
                </tr>
              );
            })}
            
          </tr>

                    </tbody>
                     </table>
             
             
             <label className="label">
                    Task
                    </label>
                    <input
                        type="text"
                        name="task"
                        value={data.task}
                        onChange={handleChange}
                        className="input"
                    />
                    
                    <button type="submit" className="button" onClick={handleSubmit}>
                        Add
                    </button>
                </form>
                 
           </div>
        </div>
    );
        }

export default Create;
