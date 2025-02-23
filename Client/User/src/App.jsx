import Header from "./components/Header"
import Footer from "./components/Footer"
import Layout from "./Layouts/Layout"


const App = () => {
  return (
    <main className="w-full h-[100vh]">
      <Header />
      <Layout />
      <Footer />
    </main>
  )
}

export default App