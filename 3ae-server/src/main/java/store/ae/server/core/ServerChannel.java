package store.ae.server.core;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.socket.SocketChannel;

/**
 * 初始化连接时候的各个组件
 * @author sidtadpole
 *
 */
public class ServerChannel extends ChannelInitializer<SocketChannel> {

	@Override
	protected void initChannel(SocketChannel e) throws Exception {
		
		//e.pipeline().addLast("http-codec", new HttpServerCodec());
		
		//e.pipeline().addLast("aggregator", new HttpObjectAggregator(65536));
		
		//e.pipeline().addLast("http-chunked", new ChunkedWriteHandler());
		
	    // e.pipeline().addLast("handler", new WebSocketServer());
		e.pipeline().addLast("handler", new TcpServer());
		// e.pipeline().addLast(new BufferOutServer());
	}

}
