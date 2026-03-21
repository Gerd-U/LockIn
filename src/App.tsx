import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <h1 className="text-3xl font-bold text-blue-500">
            Auth System funcionando ✅
          </h1>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App