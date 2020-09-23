import React, { Component } from 'react';
import users from './users.json';
import './App.css';
import linkedIn from './linkedin.png'

class App extends Component {

  state = {
    search: '',
    student: false,
    teacher: false

  }

  // filteredUsers = users.filter(user => {
  //   return user.firstName.includes(this.state.search);
  // })

  userList = () => {
  return users
  .filter(user => {
    return user.firstName.toLowerCase().includes(this.state.search) || user.lastName.toLowerCase().includes(this.state.search) 
    // this.state.student ? user.role === 'student' : '' && this.state.teacher ? user.role === 'teacher' : '' && 
  })
  .filter(user => {
    if(this.state.student && !this.state.teacher) {
      return user.role === 'student'
    }
    if(!this.state.student && this.state.teacher) {
      return user.role === 'teacher'
    }
    return user
    
  })
  .map(user => {
    return(
    <tr key={user}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.campus}</td>
      <td>{user.role}</td>
      <td>{user.linkedin ? <a href=''><img src={linkedIn} className='linkedInImg'></img></a> : ''}</td>
    </tr>
    )
  })}

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  render() {
  return (
    <div className='ironbookContainer'>
    <h1>IronBook</h1>
    <form action="">
      <input 
      type="text" 
      name="search"
      id="search"
      value={this.state.search}
      onChange={this.handleChange}
      />
      <br/>
      <label htmlFor="student">Student</label>
      <input type="checkbox"
      name="student"
      id="student"
      checked={this.state.student}
      onChange={this.handleChange}
      />
      <label htmlFor="teacher">Teacher</label>
      <input type="checkbox"
      name="teacher"
      id="teacher"
      checked={this.state.teacher}
      onChange={this.handleChange}
      />
    </form>
    <table>
      <thead>
        <tr>
          
          <th>First Name</th>
          <th>Last Name</th>
          <th>Campus</th>
          <th>Role</th>
          <th>Links</th>
        </tr>
      </thead>
      <tbody>
        {this.userList()}
      </tbody>
    </table>
    </div>
  )
};
}

export default App;
