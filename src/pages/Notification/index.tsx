import React from 'react';
import './notification.css'
import ContentEditor from '../../components/ContentEditor';

const Notification: React.FC = () => {
  const handleSubmit = () => {
    console.log('hande form submit')
  }
  return (
    <div className="notification">
      <div className="notification--container">
        <form onSubmit={handleSubmit}>
          <h1>Learning Plan Completion Notification</h1>
          <h4>Here we will place the other components</h4>
          <ContentEditor />
          <button className="btn btn-submit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Notification;
