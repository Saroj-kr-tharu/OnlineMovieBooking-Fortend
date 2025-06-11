
import AdminCom from '../../../Components/Role/Admin/AdminCom';
import Layout from "../../../Layout/Layout";

function Admin() {
    return(
         <Layout>
             <div className="min-h-[60vh]  flex items-start justify-center">
            
                <AdminCom /> 
                 

              
         </div> 
         </Layout>
    )
} 


export default Admin;