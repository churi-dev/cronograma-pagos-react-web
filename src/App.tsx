import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PaymentForm } from './components/PaymentForm/PaymentForm';
import { PaymentScheduleView } from './components/PaymentSchedule/PaymentScheduleView';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaymentForm /> } />
        <Route  path="/cronograma" element={<PaymentScheduleView /> } />
      </Routes> 
    </BrowserRouter>
  )
}

export default App
