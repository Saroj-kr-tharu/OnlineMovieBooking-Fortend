import { useParams } from "react-router-dom";
import VerifyPass from "../../../Components/Auth/ForgetpassCom/VerifyPass";
import Layout from "../../../Layout/Layout";


function ForgetPassword_verify() {
    const {token} = useParams();

  return (
    <>
      <Layout>
       
      <div className=" flex justify-center  ">
        <VerifyPass  token={token} />
      </div>
      
      </Layout>
    </>
  );
}

export default ForgetPassword_verify;
