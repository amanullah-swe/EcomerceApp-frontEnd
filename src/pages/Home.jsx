import Navbar from '../features/navBar/NavBar'
import ProductList from '../features/products/components/ProductList.jsx'
function Home() {
    return (
        <div>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
        </div>
    )
}

export default Home