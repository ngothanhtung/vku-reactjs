import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"


const DashboardPage = async() => {
  const session = await getServerSession(authOptions)
  console.log('<<=== 🚀 session DashboardPage ===>>',session);
  //có thể lấy accesstoken từ session.user.accessToken
  //có thể lấy refreshToken từ session.user.refreshToken
  //Sau đó gọi api để lấy thông tin người dùng
  return (
    <div>
      <h1>DashboardPage</h1>
    </div>
  )
}

export default DashboardPage