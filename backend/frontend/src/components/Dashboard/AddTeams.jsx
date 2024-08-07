import React from 'react'

const AddTeams = () => {
  return (
    <div>
      <h2>Add Teams</h2>
      <form>
        <label>
          Team Name:
          <input type="text" name="teamName" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button>Cancel</button>
    </div>
  )
}

export default AddTeams
