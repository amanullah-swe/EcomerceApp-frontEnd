
import Footer from '../components/Footer'
import Navbar from '../features/navBar/NavBar'
import ProductList from '../features/products/components/ProductList.jsx'
function Home() {
    return (
        <>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
            <Footer></Footer>
        </>
    )
}

export default Home