import AdminProductList from '../features/admin/components/AdminProductList'
import Navbar from '../features/navBar/NavBar'
function AdminProductListPage() {
    return (
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
        </div>
    )
}

export default AdminProductListPage