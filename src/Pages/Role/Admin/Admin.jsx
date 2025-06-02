
import AdminCom from '../../../Components/Role/Admin/AdminCom';
import Layout from "../../../Layout/Layout";

function Admin() {
    return(
         <Layout>
             <div className="min-h-[60vh] my-10 flex items-start justify-center">
            <div className="w-4/5">   
                <AdminCom /> 
                 

              </div>
         </div> 
         </Layout>
    )
} 


export default Admin;