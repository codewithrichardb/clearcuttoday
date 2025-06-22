import React from 'react'

function JournalForm() {
  return (
    <>
    <form action="">
        <div className="form-group">
            <label htmlFor="date" className="form-label">Date</label>
            <input type="date" name="date" className='form-control' />
        </div>
        <div className="form-group">
            <label htmlFor="mood" className="form-label">How are you feeling?</label>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name=""
                    id=""
                    value="{3:option1}"
                />
                <label className="form-check-label" htmlFor="">first</label>
            </div>  
        </div>
        </form></>
  )
}

export default JournalForm