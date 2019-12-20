import React, { useState } from "react";
import axios from '../axios';

const initialColor = {
  color: "",
  code: { hex: "" }
};

// const ColorList = ({ colors, updateColors }) => {
  const ColorList = (props) => {
  
  const  { colors, updateColors } = props;
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState({
    color:'',
    hex: ''
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    
  };
  

  const saveEdit = e => {
    e.preventDefault();
    axios().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, {
    color:  colorToEdit.color,
    code: {
      hex: colorToEdit.code.hex
    },
    id: colorToEdit.id,

    })
    .then(res=>{
 
      updateColors(colors.map(color=> color.id===res.data.id ? res.data : color))
      setEditing(false);
    })
    .catch(er=>{
      alert(er.message)
    })

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axios().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res=>{
      updateColors(colors.filter(color=> color.id !== res.data));
    })
    .catch(er=>{
      alert(er.message);
    })
  };
  const handleChanges= e=>{
    e.preventDefault();
    setAddColor({
      ...addColor,
      [e.target.name] : e.target.value,   
  })
  }

  const addNewColor= (e)=>{
    e.preventDefault();
    axios().post('http://localhost:5000/api/colors',{
    color:  addColor.color,
    code: {
      hex: addColor.hex
    },
    id: addColor.id,
    })
    .then(res=>{
      updateColors([...colors,
        {color:  addColor.color,
        code: {
          hex: addColor.hex
        },
        id: addColor.id,
        } ])
    
    })
    .catch(er=>{
      debugger
    }

    )

  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
          <form onSubmit={addNewColor}>
            <label> Enter Color:
              <span>
                <input type='text' name='color' value={addColor.color} onChange={handleChanges}/>
              </span>
            </label>
            <label>
              <span> Hex Code:
                <input type='text' name='hex' value={addColor.hex} onChange={handleChanges}/>
              </span>
            </label>
            <br/>
            <button type='submit'>Add color</button>
          </form>
    </div>
  );
};

export default ColorList;
