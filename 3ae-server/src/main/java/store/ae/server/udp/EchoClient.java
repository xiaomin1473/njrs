package store.ae.server.udp;

public class EchoClient
{
        public static void main(String[] args) throws Exception
        {
                // 初始化本地UDP的Socket
                LocalUDPSocketProvider.getInstance().initSocket();
                // 启动本地UDP监听（接收数据用的）
                LocalUDPDataReciever.getInstance().startup();
                 
                // 循环发送数据给服务端
                while(true)
                {
                        // 要发送的数据
                        // String toServer = "Hi，我是客户端，我的时间戳"+System.currentTimeMillis();
                        // byte[] soServerBytes = toServer.getBytes("UTF-8");
                         
                        // 开始发送
                        // boolean ok = UDPUtils.send(soServerBytes, soServerBytes.length);
                         
                        // 3000秒后进入下一次循环
                        Thread.sleep(3000);
                }
        }
}
