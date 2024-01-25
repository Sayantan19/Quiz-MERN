import React from 'react';
import { Footer, Header, Sidebar, TeacherDash } from '../../components/index.js';

export default function teacherDashboard() {
  return (
    <>
      <div className='d-flex w-100'>
        <Sidebar />
        <div id="dashboard" className='w-100'>
          <Header name="Teacher dashboard" />
          <TeacherDash />
          <Footer />
        </div>
      </div>
    </>
  );
}
