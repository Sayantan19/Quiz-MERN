import React from 'react';
import { Footer, Header, Sidebar, TeacherDash } from '../../components/index.js';

export default function teacherDashboard() {
  return (
    <>
        <Header name="Welcome to the Portal" />
        <Sidebar />
        <TeacherDash />
        <Footer />
    </>
  );
}
