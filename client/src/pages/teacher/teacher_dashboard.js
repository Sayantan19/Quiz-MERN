import React from 'react';
import { Footer, Header, Sidebar, TeacherDash } from '../../components/index.js';

export default function teacherDashboard() {
  return (
    <>
      <Header name="Welcome to the Portal" />
      <Sidebar />
      <div id="dashboard" sx={{marginLeft: '240px', display: 'flex'}}>
        <TeacherDash />
      </div>
        <Footer />
    </>
  );
}
